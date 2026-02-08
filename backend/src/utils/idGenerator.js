import crypto from "crypto";

const generateId = (name) =>  `${name}_${crypto.randomUUID()}`;

export default generateId;