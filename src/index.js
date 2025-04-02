const express = require("express");
const { encryptMessage, decryptMessage } = require("./encryption");
const { brokenDecrypt, fixDecrypt } = require("./debug");

const app = express();
app.use(express.json());

let storage = {}; // In-memory storage for messages

// POST /messages: Store encrypted message
app.post("/messages", (req, res) => {
  const { userId, message } = req.body;
  const encryptedMessage = encryptMessage(message, userId);
  if (!storage[userId]) storage[userId] = [];
  storage[userId].push(encryptedMessage);
  res.status(200).json({ status: "Message encrypted and stored" });
});

// GET /messages/:userId: Retrieve decrypted messages
app.get("/messages/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!storage[userId])
    return res.status(404).json({ error: "No messages for this user" });
  const decryptedMessages = storage[userId].map((msg) =>
    decryptMessage(msg, userId)
  );
  res.status(200).json({ messages: decryptedMessages });
});

// POST /debug/decrypt: Debug broken_decrypt logic
app.post("/debug/decrypt", (req, res) => {
  const { encryptedMessage } = req.body;
  const fixedMessage = fixDecrypt(encryptedMessage);
  res.status(200).json({ decryptedMessage: fixedMessage });
});

// Only start the server if this file is run directly.
if (require.main === module) {
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
}

// Export the app for testing
module.exports = app;

