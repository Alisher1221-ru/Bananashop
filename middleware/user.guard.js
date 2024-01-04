import env from "../config/env.config.js";
import pkg from "jsonwebtoken"
const {sign, verify} = pkg;

function authGuard(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const {id, role} = verify(token, env.ACCESS_TOKEN)
        if (!id || !role) {
            const error = new Error("You are not registred")
            error.status = 403
            throw error
        }
        req.id = id
        req.role = role
        next()
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

export default authGuard
