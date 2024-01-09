import db from "../config/db.config.js";

async function createOrder(req, res) {
    try {
        const {adress_id, user_id, product, delevery_id, count, status} = req.body
        if (!adress_id || !user_id || !product || !delevery_id || !count || !status) {
            const error = new Error('body not found')
            error.status = 403
            throw error
        }
        const [[order]] = await db.query("SELECT * FROM order WHERE user_id = ?", user_id)
        if (order) {
            const error = new Error('already have a order')
            error.status = 403
            throw error
        }

        await db.query("INSERT INTO order SET ?", {adress_id, user_id, product, delevery_id, count, status})
        res.json("create order")
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function getOrders(req, res) {
    try {
        const [order] = await db.query("SELECT * FROM order")
        if (!order) {
            const error = new Error("order not fount")
            error.status = 402
            throw error
        }
        res.json(order)
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
        const [[order]] = await db.query("SELECT * FROM order WHERE id = ?", id)
        if (!order) {
            const error = new Error("order not fount")
            error.status = 402
            throw error
        }
        res.json(order)
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
        const [[order]] = await db.query("SELECT * FROM order WHERE id = ?", id)
        if (!order) {
            const error = new Error("order not fount")
            error.status = 402
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not fount")
            error.status = 402
            throw error
        }
        await db.query("UPDATE order SET ? WHERE id = ?", [body, id])
        res.json("updated order id = "+ id)
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
        await db.query("DELETE FROM order WHERE id = ?", id)
        res.json("updated order id = "+ id)
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
//     "status": "new"
// }

//////////
