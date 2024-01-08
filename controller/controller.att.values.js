import db from "../config/db.config.js";

async function createAttValue(req, res) {
    try {
        const {name_uz, name_ru, atrebuts_id} = req.body
        if (!name_uz || !name_ru || !atrebuts_id) {
            const error = new Error('body not found')
            error.status = 403
            throw error
        }
        const [[attValue]] = await db.query("SELECT * FROM attributes_value WHERE name_uz = ?", name_uz)
        if (attValue) {
            const error = new Error('there is an attribute')
            error.status = 403
            throw error
        }

        await db.query("INSERT INTO attributes_value SET ?", {name_uz, name_ru, atrebuts_id})
        res.json('created attributes_value')
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getAttValues(req, res) {
    try {
        const [attValues] = await db.query("SELECT * FROM attributes_value")
        if (!attValues) {
            const error = new Error("attribute not fount")
            error.status = 402
            throw error
        }
        res.json(attValues)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function getAttValue(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[attValue]] = await db.query("SELECT * FROM attributes_value WHERE id = ?", id)
        if (!attValue) {
            const error = new Error("attribute not fount")
            error.status = 402
            throw error
        }
        res.json(attValue)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function updateAttValue(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[attValue]] = await db.query("SELECT * FROM attributes_value WHERE id = ?", id)
        if (!attValue) {
            const error = new Error("attValue not fount")
            error.status = 402
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not fount")
            error.status = 402
            throw error
        }
        await db.query("UPDATE attributes_value SET ? WHERE id = ?", [body, id])
        res.json("updated attributes_value id = "+ id)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function deleteAttValue(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        await db.query("DELETE FROM attributes_value WHERE id = ?", id)
        res.json("delete attributes_value id = "+ id)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

export {
    createAttValue,
    getAttValue,
    getAttValues,
    updateAttValue, 
    deleteAttValue
}


///////// test attributes

// {
//     "name_uz": "Assalomu aleykum nima deyishni bilmadim null deyman",
//     "name_ru": "Салам Алейкум, я не знаю че сказать,  поетаму null",
//     "atrebuts_id": 1
// }

/////////
