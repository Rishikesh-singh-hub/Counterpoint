// models/debate.js

/**
 * @readonly
 * @enum {string}
 */
const DebateStatus = {
  ACTIVE: "active",
  ENDED: "ended",
};

/**
 * @typedef {Object} Debate
 * @property {string} id
 * @property {string} userId
 * @property {string} topic
 * @property {string} persona
 * @property {"active" | "ended"} status
 * @property {Date} createdAt
 */

module.exports = {
  DebateStatus,
};

