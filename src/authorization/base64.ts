import base64 from 'base64-js';

export function encodeBase64(data: Uint8Array) {
  return base64.fromByteArray(data);
}

export function urlSafeEncodeBase64(data: Uint8Array) {
  const encoded = encodeBase64(data);
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeBase64(str: string) {
  return base64.toByteArray(str);
}

export function urlSafeDecodeBase64(str: string) {
  let decoded = str.replace(/\-/g, '+').replace(/\_/g, '/');
  const paddingLength = 4 - (decoded.length % 4);
  for (let i = 0; i < paddingLength; i++) {
    decoded += '=';
  }
  return decodeBase64(decoded);
}
