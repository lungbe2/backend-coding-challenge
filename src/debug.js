function brokenDecrypt(encryptedMessage) {
    // Example flawed logic
    throw new Error("Decryption failed! Incorrect IV handling.");
}

function fixDecrypt(encryptedMessage) {
    // Correct decryption logic fixing IV extraction
    // Your detailed fix logic goes here
    return "Fixed message content";
}

module.exports = { brokenDecrypt, fixDecrypt };
