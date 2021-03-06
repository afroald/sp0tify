import { Deferred } from '../deferred';
import { AccessToken } from './access-token';
import { AuthorizationRequest } from './authorization-request';

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

class TaskRunner {
  #tasks = new Map<string, Deferred<any>>(); // eslint-disable-line @typescript-eslint/no-explicit-any

  run<T>(taskId: string, promiseFn: () => Promise<T>): Promise<T> {
    if (this.#tasks.has(taskId)) {
      return (this.#tasks.get(taskId) as Deferred<T>).promise;
    }

    const deferred = new Deferred<T>();
    this.#tasks.set(taskId, deferred);

    promiseFn()
      .then((result: T) => {
        deferred.resolve(result);
      })
      .catch((error) => {
        deferred.reject(error);
      })
      .finally(() => {
        this.#tasks.delete(taskId);
      });

    return deferred.promise;
  }
}

export class AuthorizationManager {
  static STORAGE_KEY = 'sp0tify-authorization';

  #clientId: string;
  #storage: Storage;
  #request: AuthorizationRequest | null = null;
  #accessToken: AccessToken | null = null;

  #taskRunner = new TaskRunner();

  constructor(clientId: string, storage: Storage) {
    this.#clientId = clientId;
    this.#storage = storage;

    try {
      this.#load();
    } catch (error) {
      console.log('Failed to load authorization from storage');
      console.error(error);
    }
  }

  get isAuthorized() {
    return this.#accessToken && !this.#accessToken.isExpired;
  }

  /**
   * Redirects to spotify for an authorization request
   */
  async request() {
    const request = AuthorizationRequest.create();

    this.#request = request;
    this.#accessToken = null;
    this.#persist();

    window.location.href = String(
      await request.getAuthorizationUrl({
        clientId: this.#clientId,
        redirectUrl: this.#redirectUrl,
      }),
    );
  }

  isProcessingAuthCode = false;

  /**
   * Checks the received authorization code after returning from an authorization request
   */
  processAuthCode() {
    return this.#taskRunner.run('process-auth-code', async () => {
      // Extract code and nonce from url
      const location = new URL(String(window.location));
      const authCode = location.searchParams.get('code');
      const error = location.searchParams.get('error');
      const nonce = location.searchParams.get('state');

      if (!nonce) {
        throw new Error('No nonce received');
      }

      // Check if nonce matches known auth request, return error if not

      if (!this.#request) {
        throw new Error('No authorization request in progress');
      }

      if (nonce !== this.#request.nonce.toBase64()) {
        throw new Error('Received nonce does not match known nonce');
      }

      // Nonce is correct, continue
      if (error) {
        throw new Error(`Authorization failed: ${error}`);
      }

      if (!authCode) {
        throw new Error('No authorization code received');
      }

      // Get token
      const accessToken = await this.#requestAccessToken(authCode);
      this.#accessToken = accessToken;
      this.#persist();
    });
  }

  /**
   * Makes sure we have a valid access token and returns it
   */
  getAccessToken() {
    return this.#taskRunner.run('get-access-token', async () => {
      const accessToken = this.#accessToken;

      if (!accessToken) {
        throw new Error(
          'No access token available, restart authorization process',
        );
      }

      if (!accessToken.isExpired) {
        return accessToken;
      }

      if (!accessToken.refreshToken) {
        throw new Error('Access token expired and no refresh token available');
      }

      const newToken = await this.#refreshAccessToken(accessToken.refreshToken);
      this.#accessToken = newToken;
      this.#persist();

      return newToken;
    });
  }

  get #redirectUrl() {
    const location = new URL(window.location.toString());
    return new URL('/login/callback', location.origin);
  }

  async #requestAccessToken(authorizationCode: string) {
    if (!this.#request) {
      throw new Error(
        'Cannot request access token without valid authorization request',
      );
    }

    const request = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: String(this.#redirectUrl),
        client_id: this.#clientId,
        code_verifier: String(this.#request.codeVerifier),
      }),
    });
    const response = await request.json();

    if (response.error) {
      throw new Error(
        `Failed to request access token: ${response.error}: ${response.error_description}`,
      );
    }

    return AccessToken.create({
      token: response.access_token,
      scope: response.scope,
      expiresIn: response.expires_in,
      refreshToken: response.refresh_token,
    });
  }

  async #refreshAccessToken(refreshToken: string) {
    const request = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: this.#clientId,
      }),
    });
    const response = await request.json();

    if (response.error) {
      throw new Error(
        `Failed to request access token: ${response.error}: ${response.error_description}`,
      );
    }

    return AccessToken.create({
      token: response.access_token,
      scope: response.scope,
      expiresIn: response.expires_in,
      refreshToken: response.refresh_token,
    });
  }

  #persist() {
    this.#storage.setItem(
      AuthorizationManager.STORAGE_KEY,
      JSON.stringify({
        request: this.#request,
        accessToken: this.#accessToken,
      }),
    );
  }

  #load() {
    const json = this.#storage.getItem(AuthorizationManager.STORAGE_KEY);

    if (!json) {
      return;
    }

    const { request, accessToken } = JSON.parse(json);

    if (request) {
      this.#request = AuthorizationRequest.fromJSON(request);
    }

    if (accessToken) {
      this.#accessToken = AccessToken.fromJSON(accessToken);
    }
  }
}
