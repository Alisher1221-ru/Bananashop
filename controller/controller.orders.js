import db from "../config/db.config.js";

async function createOrder(req, res) {
    try {
        const {adress_id, user_id, product, delevery_id, count, status} = req.body
        if (!adress_id || !user_id || !product || !delevery_id || !count || !status) {
            const error = new Error('body not found')
            error.status = 403
            throw error
        }
        const [[orders]] = await db.query("SELECT * FROM orders WHERE product = ?", product)
        if (orders) {
            const error = new Error('already have a orders')
            error.status = 403
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
        const [orders] = await db.query("SELECT * FROM orders")
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
        if (req.role === "admin") {
            res.json(orders)
            return
        }
        if (orders.user_id === req.id) {
            res.json(orders)
            return
        }
        const error = new Error("this is not your order")
        error.status = 404
        throw error
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
        await db.query("UPDATE orders SET ? WHERE id = ?", [body, id])
        res.json("updated orders id = "+ id)
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
        await db.query("DELETE FROM orders WHERE id = ?", id)
        res.json("delete orders id = "+ id)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

export {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
}

////////// test Order

// {
//     "adress_id": 1,
//     "user_id": 1,
//     "product": [1,2],
//     "delevery_id": 1,
//     "count": 2,
//     "status": "packing"
// }

//////////
