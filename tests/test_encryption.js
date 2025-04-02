const { encryptMessage, decryptMessage } = require("../src/encryption");

test("Encryption and Decryption", () => {
    const userId = "user1";
    const message = "Hello, World!";
    const encryptedMessage = encryptMessage(message, userId);
    const decryptedMessage = decryptMessage(encryptedMessage, userId);
    expect(decryptedMessage).toBe(message);
});
