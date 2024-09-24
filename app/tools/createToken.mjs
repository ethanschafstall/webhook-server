import jwt from "jsonwebtoken";
import { privateKey } from "../privateKey.mjs"; // Importing private key for JWT

export function generateToken(user) {
    const payload = {
        username: user.useUsername,
        id: user.userId,
        role: user.useRole
    };
    const options = {
        expiresIn: '24h',
    };
    const token = jwt.sign(payload, privateKey, options);
    return token;
}