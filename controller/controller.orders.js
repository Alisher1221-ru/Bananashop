import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";

async function createOrder(req, res) {
    try {
        const {adress_id, user_id, product, delevery_id, count, status} = req.body
        if (!adress_id || !user_id || !product || !delevery_id || !count || !status) {
            const error = new Error('body not found')
            error.status = 400
            throw error
        }

        await db.query("INSERT INTO orders SET ?", {adress_id, user_id, product, delevery_id, count, status})
        res.json("create orders")
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function getOrders(req, res) {
    try {
        const { page, limit } = req.query;
        // Fetch the total count of records
        const [[{ "COUNT(*)": totalItems }]] = await db.query("SELECT COUNT(*) FROM orders");
        // Create a Pagination object
        const paginations = new Pagination(totalItems, page, limit);
        // Fetch the paginated addresses
        const [orders] = await db.query("SELECT * FROM orders LIMIT ? OFFSET ?", [paginations.limit, paginations.offset]);
        res.json({ orders, paginations }.orders);
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function getOrder(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[orders]] = await db.query("SELECT * FROM orders WHERE id = ?", id)
        if (!orders) {
            const error = new Error("orders not fount")
            error.status = 402
            throw error
        }
        res.json(orders)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function updateOrder(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[orders]] = await db.query("SELECT * FROM orders WHERE id = ?", id)
        if (!orders) {
            const error = new Error("orders not fount")
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
            await db.query("UPDATE orders SET ? WHERE id = ?", [body, id])
            res.json("updated orders id = "+ id)
            return
        }
        if (req.id === orders.user_id) {
            await db.query("UPDATE orders SET ? WHERE id = ?", [body, id])
            res.json("updated orders id = "+ id)
            return
        }
        const error = new Error("you are not the owner of this address")
        error.status = 403
        throw error
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function deleteOrder(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }

        if (req.role === "admin") {
            await db.query("DELETE FROM orders WHERE id = ?", id)
            res.json("delete orders id = "+ id)
            return
        }
        if (req.id === orders.user_id) {
            await db.query("DELETE FROM orders WHERE id = ?", id)
            res.json("delete orders id = "+ id)
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
    createOrder,
    getOrder,
    getOrders,
    updateOrder,
    deleteOrder
}

////////// test Orders

// {
//     "adress_id": 1,
//     "user_id": 1,
//     "product": 1,
//     "delevery_id": 1,
//     "count": 2,
//     "status": "packing"
// }

//////////
