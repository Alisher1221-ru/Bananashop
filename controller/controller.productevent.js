import db from "../config/db.config.js"

async function createProductEvent(req, res) {
    try {
        const {product_id, event_id} = req.body
        if (!product_id || !event_id) {
            const error = new Error("body not found")
            error.status = 403
            throw error
        }
        const [[product_event]] = await db.query("SELECT * FROM product_event WHERE product_id = ?", product_id)
        if (product_event) {
            if (product_event.event_id === event_id) {
                const error = new Error('there is an event')
                error.status = 403
                throw error
            }
        }
        await db.query("INSERT INTO product_event SET ?", {product_id, event_id})
        res.json('create product_event')
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getProductEvents(req, res) {
    try {
        const [product_event] = await db.query("SELECT * FROM product_event")
        if (!product_event) {
            const error = new Error("product_event not found")
            error.status = 403
            throw error
        }
        res.json(product_event)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function deleteProductEvent(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not found")
            error.status = 402
            throw error
        }
        const [[product_event]] = await db.query("SELECT * FROM product_event WHERE id = ?", id)
        if (!product_event) {
            const error = new Error("product_event not found")
            error.status = 402
            throw error
        }

        await db.query("DELETE FROM product_event WHERE id = ? ", id)
        res.json("product_event is id = "+ id +" deletes")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export {createProductEvent, getProductEvents, deleteProductEvent}

/////////// test delevery

// {
//     "product_id": 2,
//     "event_id": 1
// }

///////////
