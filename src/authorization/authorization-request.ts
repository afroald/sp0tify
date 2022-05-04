import { CodeVerifier } from './code-verifier';
import { Nonce } from './nonce';

const DEFAULT_SCOPE = 'user-read-private user-read-email user-follow-read';

export class AuthorizationRequest {
  readonly scope: string;
  readonly nonce: Nonce;
  readonly codeVerifier: CodeVerifier;

  constructor({
    scope = DEFAULT_SCOPE,
    nonce,
    codeVerifier,
  }: {
    scope?: string;
    nonce: Nonce;
    codeVerifier: CodeVerifier;
  }) {
    this.scope = scope;
    this.nonce = nonce;
    this.codeVerifier = codeVerifier;
  }

  async getAuthorizationUrl({
    clientId,
    redirectUrl,
  }: {
    clientId: string;
    redirectUrl: URL;
  }) {
    const authorizationUrl = new URL('https://accounts.spotify.com/authorize');

    authorizationUrl.searchParams.append('response_type', 'code');
    authorizationUrl.searchParams.append('client_id', clientId);
    authorizationUrl.searchParams.append('scope', this.scope);
    authorizationUrl.searchParams.append('redirect_uri', String(redirectUrl));
    authorizationUrl.searchParams.append('state', this.nonce.toBase64());
    authorizationUrl.searchParams.append('code_challenge_method', 'S256');
    authorizationUrl.searchParams.append(
      'code_challenge',
      await this.codeVerifier.getChallenge(),
    );

    return authorizationUrl;
  }

  toJSON() {
    return {
      scope: this.scope,
      nonce: this.nonce,
      codeVerifier: this.codeVerifier,
    };
  }

  static create(scope: string = DEFAULT_SCOPE) {
    const nonce = Nonce.create();
    const codeVerifier = CodeVerifier.create();
    return new AuthorizationRequest({
      scope,
      nonce,
      codeVerifier,
    });
  }

  static fromJSON(obj: Record<string, unknown>) {
    const { scope, nonce, codeVerifier } = obj;

    if (typeof scope !== 'string') {
      throw new Error('Invalid json object: scope invalid');
    }

    if (typeof nonce !== 'string') {
      throw new Error('Invalid json object: nonce invalid');
    }

    if (typeof codeVerifier !== 'string') {
      throw new Error('Invalid json object: codeVerifier invalid');
    }

    return new AuthorizationRequest({
      scope,
      nonce: Nonce.fromJSON(nonce),
      codeVerifier: CodeVerifier.fromJSON(codeVerifier),
    });
  }
}
