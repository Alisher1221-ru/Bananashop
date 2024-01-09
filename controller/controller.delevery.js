import db from "../config/db.config.js"


async function createDelevery(req, res) {
    try {
        const {delevery_id, note, delevery_fee} = req.body
        if (!delevery_id || !delevery_fee) {
            const error = new Error("body not found")
            error.status = 403
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
        const [delivery] = await db.query("SELECT * FROM delivery")
        if (!delivery) {
            const error = new Error("delivery not found")
            error.status = 403
            throw error
        }
        res.json(delivery)
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
            error.status = 403
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

        await db.query("UPDATE delivery SET ?, updated_at = ? WHERE id = ? ", [body, new Date(), id])
        res.json("delivery is id = "+ id +" updates")
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

        await db.query("DELETE FROM delivery WHERE id = ? ", id)
        res.json("delivery is id = "+ id +" deletes")
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
