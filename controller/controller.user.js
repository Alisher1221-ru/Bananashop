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

        await db.query("UPDATE users SET role = ?, refresh_token = ?, password = ? WHERE id = ?", ["user", hashedRefreshToken, hashingPassword, insertId])

        res.json({accessToken, refreshToken})
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function login(req, res) {
    try {
        const {username, email, password} = req.body
        if (!username || !email || !password) {
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
            const error = new Error("wrong password")
            error.status = 403
            throw error
        }

        const refreshToken = sign({id: user.id, role: user.role || "user"}, env.REFRESH_TOKEN, {expiresIn: "30day"})
        const accessToken = sign({id: user.id, role: user.role || "user"}, env.ACCESS_TOKEN, {expiresIn: "1day"})

        const hashingToken = hashSync(refreshToken, 2)
        const hashingPassword = hashSync(password, 2)

        await db.query("UPDATE users SET refresh_token = ?, password = ? WHERE id = ?", [hashingToken, hashingPassword, user.id])
        res.json({refreshToken, accessToken})
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function refreshUser(req, res) {
    try {
        const {refresh_token} = req.body
        if (!refresh_token) {
            const error = new Error("is error || wrong token")
            error.status = 403
            throw error
        }
        const {id, role} = verify(refresh_token, env.REFRESH_TOKEN)
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id)
        if (!user) {
            const error = new Error("is error || User is not found")
            error.status = 403
            throw error
        }
        const refreshToken = sign({ id: user.id, role: user.role || "user" }, env.REFRESH_TOKEN, { expiresIn: "30day" })
        const accessToken = sign({ id: user.id, role: user.role || "user" }, env.ACCESS_TOKEN, { expiresIn: "10m" })

        const Token = hashSync(refreshToken, 2)

        await db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [Token, user.id])

        res.json({refreshToken, accessToken})
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getUsers(req, res) {
    try {
        const [users] = await db.query("SELECT * FROM users")
        res.json(users)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message})
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
        res.status(error.status || 500).json({error: error.message})
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
        if (!Math.floor(id) === id) {
            const error = new Error("error is params")
            error.status = 402
            throw error
        }
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id)
        if (!user) {
            const error = new Error("not found")
            error.status = 403
            throw error
        }

        if(req.role === "admin") {
            await db.query("UPDATE users SET ?, password = ?, update_at = ? WHERE id = ?", [body, new Date(), user.id])
            res.json(user.username + " the user has been updated")
        }
        else if (req.id === user.id) {
            await db.query("UPDATE users SET ?, updated_at = ? WHERE id = ?", [body, new Date(), user.id])
            res.json(user.username + " the user has been updated")
        }
        else{
            const error = new Error("error")
            error.status = 403
            throw error
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message})
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not found")
            error.status = 402
            throw error
        }
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id)
        if (!user) {
            const error = new Error("not found")
            error.status = 403
            throw error
        }

        if (req.role === "user" && req.id === user.id) {
            await db.query("DELETE FROM users WHERE id = ?", user.id)
            res.json(user.username + " user has been deleted")
            return 
        }
        else if(req.role === "admin") {
            await db.query("DELETE FROM users WHERE id = ?", user.id)
            res.json(user.username + " user has been deleted")
            return 
        }
        const error = new Error("error")
        error.status = 403
        throw error
    } catch (error) {
        console.log(error);
        res.status(403).json({error: error.message})
    }
}

async function logoutUser(req, res) {
    try {
        const {refresh_token} = req.body
        if (!refresh_token) {
            const error = new Error("is error || wrong token")
            error.status = 403
            throw error
        }
        const {id, role} = verify(refresh_token, env.REFRESH_TOKEN)
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id)
        if (!user) {
            const error = new Error("is error || User is not found")
            error.status = 403
            throw error
        }

        await db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [null, user.id])

        res.json("logout is profil")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export {createUser, login, getUsers, getUser, refreshUser, updateUser, deleteUser, logoutUser}


//////////test login , signin
// {
//     "username": "Naruto",
//     "firstname": "Uzumaki",
//     "email": "Naruto@gamil.com",
//     "phone": 992027806,
//     "password": "NarutoUzumaki"
// }
///////////
