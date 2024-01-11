import db from "../config/db.config.js"
import Pagination from "../helpers/pagination.js"

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
        const { page, limit } = req.query;
        // Fetch the total count of records
        const [[{ "COUNT(*)": totalItems }]] = await db.query("SELECT COUNT(*) FROM product_event");
        // Create a Pagination object
        const paginations = new Pagination(totalItems, page, limit);
        // Fetch the paginated addresses
        const [product_event] = await db.query("SELECT * FROM product_event LIMIT ? OFFSET ?", [paginations.limit, paginations.offset]);
        res.json({ product_event, paginations }.product_event);
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function deleteProductEvent(req, res) {
    try {
        const {product_id, event_id} = req.query
        if (!product_id || !event_id) {
            const error = new Error("query not found")
            error.status = 400
            throw error
        }
        const [[product_event]] = await db.query("SELECT * FROM product_event WHERE product_id = ? AND event_id = ?", [product_id, event_id])
        if (!product_event) {
            const error = new Error("product_event not found")
            error.status = 400
            throw error
        }

        await db.query("DELETE FROM product_event WHERE product_id = ? AND event_id = ?", [product_id, event_id])
        res.json("product_event is deletes")
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
