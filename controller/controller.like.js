import db from "../config/db.config.js";

async function createLike(req, res) {
    try {
        const {user_id, product_id} = req.body
        if (!user_id || !product_id) {
            const error = new Error('body not found')
            error.status = 402
            throw error
        }
        const [[likee]] = await db.query("SELECT * FROM likee WHERE user_id = ?", user_id)
        if (likee) {
            if (likee.product_id === product_id) {
                const error = new Error('already have a likee')
                error.status = 402
                throw error
            }
        }

        await db.query("INSERT INTO likee SET ?", {user_id, product_id})
        res.json("create likee")
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function getLikes(req, res) {
    try {
        const [likee] = await db.query("SELECT * FROM likee")
        if (!likee) {
            const error = new Error("likee not fount")
            error.status = 402
            throw error
        }
        res.json(likee)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function getLike(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[likee]] = await db.query("SELECT * FROM likee WHERE id = ?", id)
        if (!likee) {
            const error = new Error("likee not fount")
            error.status = 402
            throw error
        }
        res.json(likee)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function updateLike(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[likee]] = await db.query("SELECT * FROM likee WHERE id = ?", id)
        if (!likee) {
            const error = new Error("likee not fount")
            error.status = 402
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not fount")
            error.status = 402
            throw error
        }
        await db.query("UPDATE likee SET ? WHERE id = ?", [body, id])
        res.json("updated likee id = "+ id)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function deleteLike(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        await db.query("DELETE FROM likee WHERE id = ?", id)
        res.json("updated likee id = "+ id)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

export {
    createLike,
    getLikes,
    getLike,
    updateLike,
    deleteLike
}

// {
//     "user_id": 14,
//     "product_id": 1
// }