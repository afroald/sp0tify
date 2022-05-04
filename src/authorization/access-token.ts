export class AccessToken {
  readonly token: string;
  readonly scope: string;
  readonly expiresAt: number; // unix timestamp in milliseconds
  readonly refreshToken?: string;

  constructor({
    token,
    scope,
    expiresAt,
    refreshToken,
  }: {
    token: string;
    scope: string;
    expiresAt: number;
    refreshToken?: string;
  }) {
    this.token = token;
    this.scope = scope;
    this.expiresAt = expiresAt;
    this.refreshToken = refreshToken;
  }

  get isExpired() {
    const now = Date.now();
    return now >= this.expiresAt;
  }

  get authorizationHeader() {
    return `Bearer ${this.token}`;
  }

  toString() {
    return this.authorizationHeader;
  }

  static create({
    token,
    scope,
    expiresIn,
    refreshToken,
  }: {
    token: string;
    scope: string;
    expiresIn: number; // in seconds
    refreshToken?: string;
  }) {
    const now = Date.now();
    const expiresAt = now + expiresIn * 1000;
    return new AccessToken({
      token,
      scope,
      expiresAt,
      refreshToken,
    });
  }

  toJSON() {
    return {
      token: this.token,
      scope: this.scope,
      expiresAt: this.expiresAt,
      refreshToken: this.refreshToken,
    };
  }

  static fromJSON(obj: Record<string, unknown>) {
    const { token, scope, expiresAt, refreshToken } = obj;

    if (typeof token !== 'string') {
      throw new Error('Invalid json object: token invalid');
    }

    if (typeof scope !== 'string') {
      throw new Error('Invalid json object: scope invalid');
    }

    if (typeof expiresAt !== 'number') {
      throw new Error('Invalid json object: expiresAt invalid');
    }

    if (refreshToken !== undefined && typeof refreshToken !== 'string') {
      throw new Error('Invalid json object: refreshToken invalid');
    }

    return new AccessToken({
      token,
      scope,
      expiresAt,
      refreshToken,
    });
  }
}
