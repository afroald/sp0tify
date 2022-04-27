import { urlSafeDecodeBase64, urlSafeEncodeBase64 } from './base64';

export class Nonce {
  readonly #nonce: Uint8Array;

  constructor(nonce: Uint8Array) {
    this.#nonce = nonce;
  }

  toString() {
    const decoder = new TextDecoder();
    return decoder.decode(this.#nonce);
  }

  toBase64() {
    return urlSafeEncodeBase64(this.#nonce);
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
    const nonce = encoder.encode(hexString);

    return new Nonce(nonce);
  }

  static fromJSON(str: string) {
    const nonce = urlSafeDecodeBase64(str);
    return new Nonce(nonce);
  }
}
