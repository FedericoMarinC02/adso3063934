"use client";

import { Sha256 } from "@aws-crypto/sha256-browser";

function getCryptoTarget() {
  const globalCrypto =
    typeof globalThis.crypto === "object" && globalThis.crypto
      ? globalThis.crypto
      : undefined;

  if (globalCrypto) {
    return globalCrypto as Crypto & {
      subtle?: SubtleCrypto;
    };
  }

  const fallback = {} as Crypto & {
    subtle?: SubtleCrypto;
  };

  Object.defineProperty(globalThis, "crypto", {
    value: fallback,
    configurable: true,
  });

  return fallback;
}

function fillRandomValues(bytes: Uint8Array) {
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = Math.floor(Math.random() * 256);
  }

  return bytes;
}

function installCryptoPolyfill() {
  if (typeof window === "undefined") {
    return;
  }

  const cryptoTarget = getCryptoTarget();

  if (typeof cryptoTarget.getRandomValues !== "function") {
    cryptoTarget.getRandomValues = ((array: Uint8Array) =>
      fillRandomValues(array)) as Crypto["getRandomValues"];
  }

  if (typeof cryptoTarget.randomUUID !== "function") {
    cryptoTarget.randomUUID = () => {
      const bytes = cryptoTarget.getRandomValues(new Uint8Array(16));

      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;

      const hex = Array.from(bytes, (byte) =>
        byte.toString(16).padStart(2, "0"),
      );

      return [
        hex.slice(0, 4).join(""),
        hex.slice(4, 6).join(""),
        hex.slice(6, 8).join(""),
        hex.slice(8, 10).join(""),
        hex.slice(10, 16).join(""),
      ].join("-") as `${string}-${string}-${string}-${string}-${string}`;
    };
  }

  if (!cryptoTarget.subtle) {
    cryptoTarget.subtle = {
      digest: async (
        algorithm: AlgorithmIdentifier,
        data: BufferSource,
      ): Promise<ArrayBuffer> => {
        const name =
          typeof algorithm === "string" ? algorithm : algorithm.name;

        if (name.toUpperCase() !== "SHA-256") {
          throw new Error(`Unsupported digest algorithm: ${name}`);
        }

        const input =
          data instanceof ArrayBuffer
            ? new Uint8Array(data)
            : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);

        const hash = new Sha256();
        hash.update(input);

        const result = await hash.digest();
        return result.buffer.slice(
          result.byteOffset,
          result.byteOffset + result.byteLength,
        ) as ArrayBuffer;
      },
    } as SubtleCrypto;
  }
}

installCryptoPolyfill();

export function CryptoPolyfill() {
  return null;
}
