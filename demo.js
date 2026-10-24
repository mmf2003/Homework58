import { randomBytes } from "node:crypto";

import { generateHash, generatePasswordHash, verifyPassword } from "./main.js";

const password = "superSecret123";
const salt = randomBytes(16).toString("hex");

const sha256Hash = generateHash("Hello, World!");
const passwordHash = generatePasswordHash(password, salt);

console.log("\nSHA-256:", sha256Hash);
console.log("Salt:", salt);
console.log("Password Hash:", passwordHash);

console.log("Correct password:", verifyPassword(password, passwordHash, salt));

console.log(
    "Wrong password:",
    verifyPassword("wrongPassword", passwordHash, salt),
);
