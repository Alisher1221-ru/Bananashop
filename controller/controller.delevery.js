import db from "../config/db.config.js"
import Pagination from "../helpers/pagination.js"


async function createDelevery(req, res) {
    try {
        const {delevery_id, note, delevery_fee} = req.body
        if (!delevery_id || !delevery_fee) {
            const error = new Error("body not found")
            error.status = 400
            throw error
        }
        if (req.role === "user") {
            const error = new Error("your not delevery or admin")
            error.status = 400
            throw error
        }
        const [{insertId}] = await db.query("INSERT INTO delivery SET ?", {delevery_id, note, delevery_fee})
        res.json('create delivery id = '+insertId)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getDeleverys(req, res) {
    try {
        const { page, limit } = req.query;
        // Fetch the total count of records
        const [[{ "COUNT(*)": totalItems }]] = await db.query("SELECT COUNT(*) FROM delivery");
        // Create a Pagination object
        const paginations = new Pagination(totalItems, page, limit);
        // Fetch the paginated addresses
        const [delivery] = await db.query("SELECT * FROM delivery LIMIT ? OFFSET ?", [paginations.limit, paginations.offset]);
        res.json({ delivery, paginations }.delivery);
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getDelevery(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("error is params")
            error.status = 402
            throw error
        }
        const [[delivery]] = await db.query("SELECT * FROM delivery WHERE id = ?", id)
        if (!delivery) {
            const error = new Error("delivery not found")
            error.status = 400
            throw error
        }
        res.json(delivery)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function updateDelevery(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not found")
            error.status = 402
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not found")
            error.status = 402
            throw error
        }
        const [[delivery]] = await db.query("SELECT * FROM delivery WHERE id = ?", id)
        if (!delivery) {
            const error = new Error("delivery not found")
            error.status = 402
            throw error
        }

        if (req.role === "admin") {
            await db.query("UPDATE delivery SET ?, updated_at = ? WHERE id = ? ", [body, new Date(), id])
            res.json("delivery is id = "+ id +" updates")
            return
        }
        if (req.id === comment.user_id) {
            await db.query("UPDATE delivery SET ?, updated_at = ? WHERE id = ? ", [body, new Date(), id])
            res.json("delivery is id = "+ id +" updates")
            return
        }
        const error = new Error("you are not the owner of this address")
        error.status = 403
        throw error
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function deleteDelevery(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not found")
            error.status = 402
            throw error
        }
        const [[delivery]] = await db.query("SELECT * FROM delivery WHERE id = ?", id)
        if (!delivery) {
            const error = new Error("delivery not found")
            error.status = 402
            throw error
        }
        
        if (req.role === "admin") {
            await db.query("DELETE FROM delivery WHERE id = ? ", id)
            res.json("delivery is id = "+ id +" deletes")
            return
        }
        if (req.id === comment.user_id) {
            await db.query("DELETE FROM delivery WHERE id = ? ", id)
            res.json("delivery is id = "+ id +" deletes")
            return
        }
        const error = new Error("you are not the owner of this address")
        error.status = 403
        throw error
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export {createDelevery, getDeleverys, getDelevery, updateDelevery, deleteDelevery}

/////////// test delevery

// {
//     "delevery_id": 1,
//     "note": "omg im betmen",
//     "delevery_fee": 50000
// }

///////////
