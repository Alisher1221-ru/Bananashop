import db from "../config/db.config.js"
import env from "../config/env.config.js";
import {hashSync, compareSync} from "bcrypt"
import pkg from "jsonwebtoken"
const {sign, verify} = pkg;

async function createUser(req, res) {
    try {
        const {username, firstname, email, phone, password} = req.body
        if (!username || !firstname || !email || !phone || !password) {
            const error = new Error("sending error")
            error.status = 401
            throw error
        }
        const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", email)
        if (user) {
            const error = new Error("there is a user")
            error.status = 401
            throw error
        }
        const [{insertId}] = await db.query("INSERT INTO users SET ?", {username, firstname, email, phone})
        const refreshToken = sign({id: insertId, role: "user"}, env.REFRESH_TOKEN, {expiresIn: "30day"})
        const accessToken = sign({id: insertId, role: "user"}, env.ACCESS_TOKEN, {expiresIn: "5m"})

        const hashingPassword = hashSync(password, 2)

        const hashedRefreshToken = hashSync(refreshToken, 2)

        await db.query("UPDATE users SET refresh_token = ?, password = ? WHERE id = ?", [hashedRefreshToken, hashingPassword, insertId])

        res.json({accessToken, refreshToken})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
}

async function login(req, res) {
    try {
        const {username, firstname, email, phone, password} = req.body
        if (!username || !firstname || !email || !phone || !password) {
            const error = new Error("sending error")
            error.status = 403
            throw error
        }
        const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", email)
        if (!user) {
            const error = new Error("there is a user")
            error.status = 403
            throw error
        }
        const ispasswordTest = compareSync(password, user.password)
        if (!ispasswordTest) {
            const error = new Error("not found")
            error.status = 403
            throw error
        }

        const refreshToken = sign({id: user.id, role: "user"}, env.REFRESH_TOKEN, {expiresIn: "30day"})
        const accessToken = sign({id: user.id, role: "user"}, env.ACCESS_TOKEN, {expiresIn: "10m"})

        const hashingToken = hashSync(refreshToken, 2)
        const hashingPassword = hashSync(password, 2)

        await db.query("UPDATE users SET refresh_token = ?, password = ? WHERE id = ?", [hashingToken, hashingPassword, user.id])
        res.json({refreshToken, accessToken})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function getUsers(req, res) {
    try {
        const [users] = await db.query("SELECT * FROM users")
        res.json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
}

async function getUser(req, res) {
    try {
        const id = req.params.id
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id)
        if (!user) {
            const error = new Error("there is a user")
            error.status = 401
            throw error
        }
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
}

async function updateUser(req, res) {
    try {
        const body = req.body
        if (!body) {
            const error = new Error("sending error")
            error.status = 403
            throw error
        }
        const id = req.params.id
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id)
        if (!user) {
            const error = new Error("not found")
            error.status = 403
            throw error
        }
        if (req.role === "user") {
            db.query("UPDATE users SET ?", body)
            res.json(user)
        }
        else if(req.role === "admin") {
            db.query("UPDATE users SET ?", body)
            res.json(user)
        }
        else{
            const error = new Error("not found")
            error.status = 403
            throw error
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
}
export {createUser, login, getUsers, getUser, updateUser}