# Node.js Cryptography — Homework58

A Node.js project demonstrating cryptographic hashing, secure password hashing, and password verification using the built-in `node:crypto` module.

The project implements SHA-256, PBKDF2, and timing-safe hash comparison without external dependencies.

## Features

- SHA-256 hashing of text strings
- Password hashing using PBKDF2 with salt
- Password verification
- Timing-safe hash comparison
- Customizable hashing parameters
- Input validation and error handling
- Automated tests using the built-in Node.js test runner
- Demonstration of cryptographic operations

## Technologies

- Node.js
- JavaScript (ES Modules)
- `node:crypto`
- `node:test`
- `node:assert/strict`

No external dependencies are required.

## Project Structure

```text
Homework58/
├── main.js          # Cryptographic functions
├── test.js          # Automated tests
├── demo.js          # Usage demonstration
├── package.json     # Project configuration
└── README.md        # Documentation
```

## Installation and Running

### 1. Clone the repository

```bash
git clone https://github.com/mmf2003/Homework58.git
```

### 2. Open the project directory

```bash
cd Homework58
```

### 3. Run the application

```bash
npm start
```

### 4. Run the demonstration

```bash
npm run demo
```

### 5. Run automated tests

```bash
npm test
```

No `npm install` is required because the project uses only built-in Node.js modules.

## Implemented Functions

### 1. generateHash(input)

Generates a SHA-256 hash of the provided string.

**Parameters:**

- `input` — string to hash.

**Returns:** A 64-character hexadecimal hash.

**Example:**

```javascript
generateHash("Hello, World!");
```

### 2. generatePasswordHash(password, salt, iterations, keylen, digest)

Generates a password hash using PBKDF2.

**Parameters:**

| Parameter  | Default  | Description                 |
| ---------- | -------- | --------------------------- |
| password   | Required | Password to hash            |
| salt       | Required | Salt used for hashing       |
| iterations | 10000    | Number of iterations        |
| keylen     | 64       | Derived key length in bytes |
| digest     | sha512   | Hash algorithm              |

**Example:**

```javascript
import { randomBytes } from "node:crypto";
import { generatePasswordHash } from "./main.js";

const salt = randomBytes(16).toString("hex");
const hash = generatePasswordHash("superSecret123", salt);

console.log(hash);
```

### 3. verifyPassword(inputPassword, storedHash, salt, iterations, keylen, digest)

Verifies a password against a stored PBKDF2 hash.

**Returns:**

- `true` — password matches.
- `false` — password does not match or the stored hash format is invalid.

**Example:**

```javascript
const isCorrect = verifyPassword("superSecret123", hash, salt);

console.log(isCorrect);
```

## Automated Testing

The project contains 16 automated tests covering:

- SHA
