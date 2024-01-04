import env from "../config/env.config.js"
import pkg from 'jsonwebtoken';
const { verify } = pkg;

function roleGuard(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const {id, role} = verify(token, env.ACCESS_TOKEN)
        if (role === "admin") {
            return next()
        }
        const error = new Error("you are not an administrator")
        error.status = 403
        throw error
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

export default roleGuard
