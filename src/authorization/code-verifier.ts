import { urlSafeDecodeBase64, urlSafeEncodeBase64 } from './base64';

export class CodeVerifier {
  readonly codeVerifier: Uint8Array;

  constructor(codeVerifier: Uint8Array) {
    this.codeVerifier = codeVerifier;
  }

  async getChallenge() {
    const hash = await crypto.subtle.digest('SHA-256', this.codeVerifier);
    return urlSafeEncodeBase64(new Uint8Array(hash));
  }

  toString() {
    const decoder = new TextDecoder();
    return decoder.decode(this.codeVerifier);
  }

  toBase64() {
    return urlSafeEncodeBase64(this.codeVerifier);
  }

  toJSON() {
    return this.toBase64();
  }

  static create() {
    // First generate random bytes
    const buffer = new Uint8Array(64);
    crypto.getRandomValues(buffer);

    // Then convert the bytes to hexadecimal to make sure we have a workable string
    const hexString = Array.from(buffer, (v) =>
      v.toString(16).padStart(2, '0'),
    ).join('');

    // Convert the hex string back to a buffer for further use
    const encoder = new TextEncoder();
    const codeVerifier = encoder.encode(hexString);

    return new CodeVerifier(codeVerifier);
  }

  static fromJSON(str: string) {
    const codeVerifier = urlSafeDecodeBase64(str);
    return new CodeVerifier(codeVerifier);
  }
}
