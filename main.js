console.log("#57. JavaScript homework example file");

import { createHash, pbkdf2Sync, timingSafeEqual } from "node:crypto";

// ========================================
// #1. Generate SHA-256 Hash
// ========================================

/**
 * Generates a SHA-256 hash for a string.
 * @param {string} input - Text to hash.
 * @returns {string} Hexadecimal SHA-256 hash.
 */
function generateHash(input) {
    if (typeof input !== "string") {
        throw new TypeError("Input must be a string");
    }

    return createHash("sha256").update(input, "utf8").digest("hex");
}

// ========================================
// #2. Generate Password Hash (PBKDF2)
// ========================================

/**
 * Generates a password hash using PBKDF2.
 * @param {string} password - Password to hash.
 * @param {string} salt - Salt used for hashing.
 * @param {number} iterations - Number of iterations.
 * @param {number} keylen - Key length in bytes.
 * @param {string} digest - Hash algorithm.
 * @returns {string} Hexadecimal password hash.
 */
function generatePasswordHash(
    password,
    salt,
    iterations = 10000,
    keylen = 64,
    digest = "sha512",
) {
    if (typeof password !== "string") {
        throw new TypeError("Password must be a string");
    }

    if (typeof salt !== "string" || !salt) {
        throw new TypeError("Salt must be a non-empty string");
    }

    return pbkdf2Sync(password, salt, iterations, keylen, digest).toString(
        "hex",
    );
}

// ========================================
// #3. Verify Password
// ========================================

/**
 * Verifies a password against a stored PBKDF2 hash.
 * @param {string} inputPassword - Password to verify.
 * @param {string} storedHash - Stored hexadecimal hash.
 * @param {string} salt - Original salt.
 * @param {number} iterations - PBKDF2 iterations.
 * @param {number} keylen - Key length in bytes.
 * @param {string} digest - Hash algorithm.
 * @returns {boolean} True if password matches.
 */
function verifyPassword(
    inputPassword,
    storedHash,
    salt,
    iterations = 10000,
    keylen = 64,
    digest = "sha512",
) {
    if (
        typeof storedHash !== "string" ||
        storedHash.length !== keylen * 2 ||
        !/^[0-9a-f]+$/i.test(storedHash)
    ) {
        return false;
    }

    const inputHash = generatePasswordHash(
        inputPassword,
        salt,
        iterations,
        keylen,
        digest,
    );

    const inputBuffer = Buffer.from(inputHash, "hex");
    const storedBuffer = Buffer.from(storedHash, "hex");

    // Compare hashes using a timing-safe operation.
    return timingSafeEqual(inputBuffer, storedBuffer);
}

export { generateHash, generatePasswordHash, verifyPassword };
