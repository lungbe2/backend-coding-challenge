const request = require("supertest");
const app = require("../src/index");

describe("Secure Messaging API Endpoints", () => {
  const testUserID = "user1";
  const messageContent = "Hello, World!";

  // Test POST /messages to store a message
  it("should store an encrypted message via POST /messages", async () => {
    const response = await request(app)
      .post("/messages")
      .send({ userId: testUserID, message: messageContent })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toEqual("Message encrypted and stored");
  });

  // Test GET /messages/:userId to retrieve stored message(s)
  it("should retrieve decrypted messages via GET /messages/:userId", async () => {
    // First, ensure the message is stored via previous test run.
    const response = await request(app)
      .get(`/messages/${testUserID}`)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    // Since our encryption/decryption are inverse functions, the decrypted content should match the original.
    expect(response.body.messages).toContain(messageContent);
  });

  // Test POST /debug/decrypt to simulate debugging the decryption logic
  it("should return a fixed message via POST /debug/decrypt", async () => {
    // For testing purpose, we pass a dummy encrypted string.
    // Our fixDecrypt function (in src/debug.js) should be implemented to return "Fixed message content".
    const dummyEncrypted = "dummyEncryptedString";

    const response = await request(app)
      .post("/debug/decrypt")
      .send({ encryptedMessage: dummyEncrypted })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body.decryptedMessage).toEqual("Fixed message content");
  });
});
