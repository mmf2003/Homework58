import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";

import { generateHash, generatePasswordHash, verifyPassword } from "./main.js";

// ========================================
// #1. SHA-256 TESTS
// ========================================

test("SHA-256 generates correct hash", () => {
    const result = generateHash("abc");

    assert.equal(
        result,
        "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
});

test("SHA-256 returns 64 hexadecimal characters", () => {
    const hash = generateHash("Hello, World!");

    assert.match(hash, /^[0-9a-f]{64}$/);
});

test("SHA-256 returns the same hash for the same input", () => {
    assert.equal(generateHash("Hello"), generateHash("Hello"));
});

test("SHA-256 returns different hashes for different inputs", () => {
    assert.notEqual(generateHash("Hello"), generateHash("World"));
});

test("SHA-256 rejects non-string input", () => {
    assert.throws(() => generateHash(123), TypeError);
});

// ========================================
// #2. PASSWORD HASH TESTS
// ========================================

test("PBKDF2 generates a hexadecimal hash", () => {
    const hash = generatePasswordHash("superSecret123", "testSalt");

    assert.match(hash, /^[0-9a-f]{128}$/);
});

test("PBKDF2 generates consistent hashes", () => {
    const hash1 = generatePasswordHash("password123", "sameSalt");

    const hash2 = generatePasswordHash("password123", "sameSalt");

    assert.equal(hash1, hash2);
});

test("Different salts produce different hashes", () => {
    const hash1 = generatePasswordHash("password123", "saltOne");

    const hash2 = generatePasswordHash("password123", "saltTwo");

    assert.notEqual(hash1, hash2);
});

test("Different passwords produce different hashes", () => {
    const hash1 = generatePasswordHash("password123", "sameSalt");

    const hash2 = generatePasswordHash("password456", "sameSalt");

    assert.notEqual(hash1, hash2);
});

test("PBKDF2 supports custom parameters", () => {
    const hash = generatePasswordHash(
        "password123",
        "testSalt",
        20000,
        32,
        "sha256",
    );

    assert.match(hash, /^[0-9a-f]{64}$/);
});

test("PBKDF2 rejects invalid salt", () => {
    assert.throws(() => generatePasswordHash("password123", ""), TypeError);
});

// ========================================
// #3. PASSWORD VERIFICATION TESTS
// ========================================

test("Correct password returns true", () => {
    const salt = randomBytes(16).toString("hex");
    const hash = generatePasswordHash("superSecret123", salt);

    assert.equal(verifyPassword("superSecret123", hash, salt), true);
});

test("Incorrect password returns false", () => {
    const salt = randomBytes(16).toString("hex");
    const hash = generatePasswordHash("superSecret123", salt);

    assert.equal(verifyPassword("wrongPassword", hash, salt), false);
});

test("Incorrect salt returns false", () => {
    const hash = generatePasswordHash("superSecret123", "correctSalt");

    assert.equal(verifyPassword("superSecret123", hash, "wrongSalt"), false);
});

test("Invalid stored hash returns false", () => {
    assert.equal(
        verifyPassword("superSecret123", "invalid-hash", "testSalt"),
        false,
    );
});

test("Password verification supports custom parameters", () => {
    const hash = generatePasswordHash(
        "password123",
        "testSalt",
        20000,
        32,
        "sha256",
    );

    assert.equal(
        verifyPassword("password123", hash, "testSalt", 20000, 32, "sha256"),
        true,
    );
});
