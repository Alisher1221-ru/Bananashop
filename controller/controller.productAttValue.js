import db from "../config/db.config.js"

async function createProductAttValue(req, res) {
    try {
        const {product_id, attributes_value_id} = req.body
        if (!product_id || !attributes_value_id) {
            const error = new Error("body not found")
            error.status = 403
            throw error
        }
        const [[product_attributes_value]] = await db.query("SELECT * FROM product_attributes_value WHERE product_id = ?", product_id)
        if (product_attributes_value) {
            if (product_attributes_value.attributes_value_id === attributes_value_id) {
                const error = new Error('there is an event')
                error.status = 403
                throw error
            }
        }
        await db.query("INSERT INTO product_attributes_value SET ?", {product_id, attributes_value_id})
        res.json('create product_attributes_value')
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getProductAttValues(req, res) {
    try {
        const [product_attributes_value] = await db.query("SELECT * FROM product_attributes_value")
        if (!product_attributes_value) {
            const error = new Error("product_attributes_value not found")
            error.status = 403
            throw error
        }
        res.json(product_attributes_value)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getProductAttValue(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("error is params")
            error.status = 402
            throw error
        }
        const [[product_attributes_value]] = await db.query("SELECT * FROM product_attributes_value WHERE id = ?", id)
        if (!product_attributes_value) {
            const error = new Error("product_attributes_value not found")
            error.status = 403
            throw error
        }
        res.json(product_attributes_value)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function updateProductAttValue(req, res) {
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
        const [[product_attributes_value]] = await db.query("SELECT * FROM product_attributes_value WHERE id = ?", id)
        if (!product_attributes_value) {
            const error = new Error("product_attributes_value not found")
            error.status = 402
            throw error
        }

        await db.query("UPDATE product_attributes_value SET ?, updated_at = ? WHERE id = ? ", [body, new Date(), id])
        res.json("product_attributes_value is id = "+ id +" updates")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function deleteProductAttValue(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not found")
            error.status = 402
            throw error
        }
        const [[product_attributes_value]] = await db.query("SELECT * FROM product_attributes_value WHERE id = ?", id)
        if (!product_attributes_value) {
            const error = new Error("product_attributes_value not found")
            error.status = 402
            throw error
        }

        await db.query("DELETE FROM product_attributes_value WHERE id = ? ", id)
        res.json("product_attributes_value is id = "+ id +" deletes")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export {createProductAttValue, getProductAttValues, getProductAttValue, updateProductAttValue, deleteProductAttValue}

/////////// test delevery

// {
//     "product_id": 2,
//     "attributes_value_id": 1
// }

///////////
