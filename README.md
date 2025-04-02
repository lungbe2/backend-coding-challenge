# Secure Messaging API - Backend Coding Challenge

## Overview
This project is a secure messaging API built with Node.js using Express. The API encrypts messages using AES-256 in CBC mode before storing them, and only the intended user can decrypt and access their messages. The project also includes debugging functionality to fix a broken decryption function. This solution was developed as part of a backend coding challenge.

## Challenge Instructions and Requirements

### Objective
- Build a secure messaging backend with three main features:
  1. Store encrypted messages per user using secure encryption.
  2. Allow only the original user to decrypt and retrieve messages.
  3. Debug a broken decryption function and explain your fix.

### Required Endpoints
- **POST /messages**: Store a message for a user. Encrypt it using AES before storage.
- **GET /messages/:userId**: Retrieve all messages for the specified user (after decryption).
- **POST /debug/decrypt**: Debug and fix the broken decryption logic contained in `debug_code.py` or `debug_code.js`.

### Encryption Rules
- Use **AES (AES-256)** encryption (using libraries like `pycryptodome` or `crypto-js`).
- Use only: the `crypto` module in Node.js or `cryptography`/`hashlib + hmac` in Python.
- The Initialization Vector (IV) must be random for each message and embedded in the encrypted payload so that it can be extracted for decryption.
- Return encrypted values in `base64` format.

### Required Design Write-Up
Include answers to the following in your documentation or code comments:
1. Which encryption method and mode did you choose, and why?
2. How will you ensure that only the original user can access their messages?
3. How do you plan to store and later extract the IV?
4. How would you prevent user ID spoofing to access other users' messages?

### Debug Task
- Identify and fix the issue in the provided `broken_decrypt()` function.
- Write a test case that reproduces the problem.
- Provide comments explaining what was wrong and how your fix resolves the issue.

## Project Structure

### Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Design Decisions & Assumptions](#design-decisions--assumptions)
- [Testing](#testing)
- [Additional Notes](#additional-notes)

### Installation
1. **Clone this repository:**
   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   cd backend-coding-challenge
   npm install

