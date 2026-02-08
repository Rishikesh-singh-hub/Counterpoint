// models/message.js

/**
 * Allowed message roles
 * @readonly
 * @enum {string}
 */
const MessageRole = {
  USER: "user",
  ASSISTANT: "assistant",
};

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} debateId
 * @property {"user" | "assistant"} role
 * @property {string} content
 * @property {Date} createdAt
 */

module.exports ={
  MessageRole
};