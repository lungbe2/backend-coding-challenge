const crypto = require("crypto");

function generateKey(userId) {
    return crypto.createHash("sha256").update(userId).digest("base64").slice(0, 32);
}

function encryptMessage(message, userId) {
    const key = generateKey(userId);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(message, "utf8", "base64");
    encrypted += cipher.final("base64");
    return Buffer.concat([iv, Buffer.from(encrypted, "base64")]).toString("base64");
}

function decryptMessage(encryptedMessage, userId) {
    const key = generateKey(userId);
    const decoded = Buffer.from(encryptedMessage, "base64");
    const iv = decoded.slice(0, 16);
    const encryptedPayload = decoded.slice(16);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedPayload, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = { encryptMessage, decryptMessage };
