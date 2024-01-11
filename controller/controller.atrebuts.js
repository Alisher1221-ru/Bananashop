import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";

async function createAtrebuts(req, res) {
    try {
        const {name_uz, name_ru} = req.body
        if (!name_uz || !name_ru) {
            const error = new Error('body not found')
            error.status = 400
            throw error
        }

        await db.query("INSERT INTO attributes SET ?", {name_uz, name_ru})
        res.json('created attrebutes')
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getAttributes(req, res) {
    try {
        const { page, limit } = req.query;
        // Fetch the total count of records
        const [[{ "COUNT(*)": totalItems }]] = await db.query("SELECT COUNT(*) FROM attributes");
        // Create a Pagination object
        const paginations = new Pagination(totalItems, page, limit);
        // Fetch the paginated addresses
        const [attributes] = await db.query("SELECT * FROM attributes LIMIT ? OFFSET ?", [paginations.limit, paginations.offset]);
        res.json({ attributes, paginations }.attributes);
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function getAttribute(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[attribute]] = await db.query("SELECT * FROM attributes WHERE id = ?", id)
        if (!attribute) {
            const error = new Error("attribute not found")
            error.status = 404
            throw error
        }
        res.json(attribute)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function updateAttributes(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[attribute]] = await db.query("SELECT * FROM attributes WHERE id = ?", id)
        if (!attribute) {
            const error = new Error("attribute not fount")
            error.status = 402
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not fount")
            error.status = 402
            throw error
        }

        if (req.role === "admin") {
            await db.query("UPDATE attributes SET ? WHERE id = ?", [body, id])
            res.json("updated attribute id = "+ id)
            return
        }
        if (req.id === attribute.user_id) {
            await db.query("UPDATE attributes SET ? WHERE id = ?", [body, id])
            res.json("updated attribute id = "+ id)
            return
        }
        const error = new Error("you are not the owner of this address")
        error.status = 403
        throw error
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function deleteAttributes(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }

        const [[attribute]] = await db.query("SELECT * FROM attributes WHERE id = ?", id)
        if (!attribute) {
            const error = new Error('attributes not found')
            error.status = 400
            throw error
        }

        if (req.role === "admin") {
            await db.query("DELETE FROM attributes WHERE id = ?", id)
            res.json("delete attribute id = "+ id)
            return
        }
        if (req.id === attribute.user_id) {
            await db.query("DELETE FROM attributes WHERE id = ?", id)
            res.json("delete attribute id = "+ id)
            return
        }
        const error = new Error("you are not the owner of this address")
        error.status = 403
        throw error
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

export {
    createAtrebuts,
    getAttributes,
    getAttribute,
    updateAttributes,
    deleteAttributes
}

///////// test attributes

// {
//     "name_uz": "Assalomu aleykum nima deyishni bilmadim null deyman",
//     "name_ru": "Салам Алейкум, я не знаю че сказать,  поетаму null"
// }

/////////
