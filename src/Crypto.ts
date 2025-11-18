import { createCipheriv, createDecipheriv } from 'crypto';


export type CryptoConfig = {
  algorithm: string;
  key: string;
  iv: string;
};

export function encryptCrypto(data: string, CryptoConfig: CryptoConfig) {
  const cipher = createCipheriv(CryptoConfig.algorithm, CryptoConfig.key, CryptoConfig.iv);

  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
  ).toString();
}

export function decryptCrypto(data: string, CryptoConfig: CryptoConfig) {
  const buff = Buffer.from(data);
  const decipher = createDecipheriv(CryptoConfig.algorithm, CryptoConfig.key, CryptoConfig.iv);

  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  );
}
