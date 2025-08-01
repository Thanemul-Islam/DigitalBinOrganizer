// utils/hash.js
import SHA256 from "crypto-js/sha256";

/**
 * Hash a phone number using SHA-256
 * @param {string} phone - Raw phone number
 * @returns {string} - Hashed phone number
 */
export const hashPhone = (phone) => {
  return SHA256(phone.trim()).toString();
};
