import generateId from "../utils/idGenerator.js"


/** 
*@returns {import("./DebateModel").Debate}
*/
export const getDebate= (uid,top,person)=>{
    return {
    id: generateId("deb"),
    userId: uid,
    topic: top,
    persona: person,
    status: "active",
    createdAt: new Date(),
  };
}

/**
 * @returns {import("./MessageModel").Message}
 */
export function getMessage(debId,rol,cont) {
  return {
    id: generateId("msg"),
    debateId: debId,
    role: rol,
    content: cont,
    createdAt: new Date(),
  };
}