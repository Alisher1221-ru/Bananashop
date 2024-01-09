import db from "../config/db.config.js";

async function createCategorysAttributes(req, res) {
    try {
        const {attributes_id, category_id} = req.body
        if (!attributes_id || !category_id ) {
            const error = new Error('body not found')
            error.status = 403
            throw error
        }
        const [[categorys_attributes]] = await db.query("SELECT * FROM categorys_attributes WHERE attributes_id = ?", attributes_id)
        if (categorys_attributes) {
            if (categorys_attributes.category_id === category_id) {
                const error = new Error('there is an categorys_attributes')
                error.status = 403
                throw error
            }
        }

        await db.query("INSERT INTO categorys_attributes SET ?", {attributes_id, category_id})
        res.json('created categorys_attributes')
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getCategorysAttributes(req, res) {
    try {
        const [categorys_attributes] = await db.query("SELECT * FROM categorys_attributes")
        if (!categorys_attributes) {
            const error = new Error("categorys_attributes not fount")
            error.status = 403
            throw error
        }
        res.json(categorys_attributes)
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function deleteCategorysAttributes(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        await db.query("DELETE FROM categorys_attributes WHERE id = ?", id)
        res.json("delete categorys_attributes id = "+ id)
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

export {
    createCategorysAttributes,
    getCategorysAttributes,
    deleteCategorysAttributes
}

//////////// test CategorysAttributes

// {
//     "category_id": 1,
//     "attributes_id": 2
// }

/////////////
