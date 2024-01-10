import db from "../config/db.config.js";

async function createAtrebuts(req, res) {
    try {
        const {name_uz, name_ru} = req.body
        if (!name_uz || !name_ru) {
            const error = new Error('body not found')
            error.status = 400
            throw error
        }
        const [[atrebut]] = await db.query("SELECT * FROM attributes WHERE name_uz = ? OR name_ru = ?", [name_uz, name_ru])
        if (atrebut) {
            const error = new Error('there is an attribute')
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
        const [attribute] = await db.query("SELECT * FROM attributes")
        if (!attribute) {
            const error = new Error("attribute not fount")
            error.status = 402
            throw error
        }
        res.json(attribute)
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
        await db.query("UPDATE attributes SET ? WHERE id = ?", [body, id])
        res.json("updated attribute id = "+ id)
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
        await db.query("DELETE FROM attributes WHERE id = ?", id)
        res.json("updated attribute id = "+ id)
    } catch (error) {
        res.status(error.status).json({error:error.message})
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
