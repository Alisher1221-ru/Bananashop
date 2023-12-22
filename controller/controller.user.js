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

async function getUsers(req, res) {
    try {
        const {username, firstname, email, phone, password} = req.body
        if (!username || !firstname || !email || !phone || !password) {
            const error = new Error("sending error")
            error.status = 401
            throw error
        }
        const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", email)
        if (!user) {
            const error = new Error("there is a user")
            error.status = 401
            throw error
        }
        const refreshToken = sign({id: user.id, role: user.role}, env.REFRESH_TOKEN, {expiresIn: "30day"})
        const accessToken = sign({id: user.id, role: user.role}, env.ACCESS_TOKEN, {expiresIn: "5m"})
        
        const hashingPassword = hashSync(password, 2)

        const hashedRefreshToken = hashSync(refreshToken, 2)

        await db.query("UPDATE users SET refresh_token = ?, password = ? WHERE id = ?", [hashedRefreshToken, hashingPassword, user.id])

        res.json({accessToken, refreshToken})
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
        const {username, firstname, email, phone, password} = req.body
        if (!username || !firstname || !email || !phone || !password) {
            const error = new Error("sending error")
            error.status = 401
            throw error
        }

        const id = req.params.id
        
        const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", email)
        if (!user) {
            const error = new Error("there is a user")
            error.status = 401
            throw error
        }
        
        const ispasswortTest = compareSync(password, user.password)
        if (!ispasswortTest) {
            const error = new Error("wrong password")
            error.status = 401
            throw error
        }
        if (user.role === "user" || user.role === null) {
            if (!user.id === id) {
                const error = new Error("wrong id")
                error.status = 401
                throw error
            }
            
        }
        res.json(id)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
}
export {createUser, getUsers, getUser, updateUser}