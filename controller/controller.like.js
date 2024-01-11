import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";

async function createLike(req, res) {
    try {
        const {user_id, product_id} = req.body
        if (!user_id || !product_id) {
            const error = new Error('body not found')
            error.status = 400
            throw error
        }
        const [[likee]] = await db.query("SELECT * FROM likee WHERE user_id = ?", user_id)
        if (likee) {
            if (likee.product_id === product_id) {
                const error = new Error('already have a likee')
                error.status = 400
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
        const { page, limit } = req.query;
        // Fetch the total count of records
        const [[{ "COUNT(*)": totalItems }]] = await db.query("SELECT COUNT(*) FROM likee");
        // Create a Pagination object
        const paginations = new Pagination(totalItems, page, limit);
        // Fetch the paginated addresses
        const [likee] = await db.query("SELECT * FROM likee LIMIT ? OFFSET ?", [paginations.limit, paginations.offset]);
        res.json({ likee, paginations }.likee);
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function getLike(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 400
            throw error
        }
        const [[likee]] = await db.query("SELECT * FROM likee WHERE id = ?", id)
        if (!likee) {
            const error = new Error("likee not fount")
            error.status = 400
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
            error.status = 400
            throw error
        }
        const [[likee]] = await db.query("SELECT * FROM likee WHERE id = ?", id)
        if (!likee) {
            const error = new Error("likee not fount")
            error.status = 400
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not fount")
            error.status = 400
            throw error
        }

        if (req.role === "admin") {
            await db.query("UPDATE likee SET ? WHERE id = ?", [body, id])
            res.json("updated likee id = "+ id)
            return
        }
        if (req.id === likee.user_id) {
            await db.query("UPDATE likee SET ? WHERE id = ?", [body, id])
            res.json("updated likee id = "+ id)
            return
        }
        const error = new Error("you are not the owner of this address")
        error.status = 403
        throw error
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function deleteLike(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 400
            throw error
        }

        if (req.role === "admin") {
            await db.query("DELETE FROM likee WHERE id = ?", id)
            res.json("updated likee id = "+ id)
            return
        }
        if (req.id === likee.user_id) {
            await db.query("DELETE FROM likee WHERE id = ?", id)
            res.json("updated likee id = "+ id)
            return
        }
        const error = new Error("you are not the owner of this address")
        error.status = 403
        throw error
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

////////// test like

// {
//     "user_id": 14,
//     "product_id": 1
// }

//////////
