import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";

async function createCart(req, res) {
    try {
        const {user_id, product_id, count} = req.body
        if (!user_id || !product_id || !count) {
            const error = new Error('body not found')
            error.status = 400
            throw error
        }
        const [[cart]] = await db.query("SELECT * FROM cart WHERE user_id = ?", user_id)
        if (cart) {
            if (cart.product_id === product_id) {
                const error = new Error('already have a cart')
                error.status = 400
                throw error
            }
        }

        await db.query("INSERT INTO cart SET ?", {user_id, product_id, count})
        res.json("create cart")
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function getCarts(req, res) {
    try {
        const { page, limit } = req.query;
        // Fetch the total count of records
        const [[{ "COUNT(*)": totalItems }]] = await db.query("SELECT COUNT(*) FROM cart");
        // Create a Pagination object
        const paginations = new Pagination(totalItems, page, limit);
        // Fetch the paginated cart
        const [cart] = await db.query("SELECT * FROM cart LIMIT ? OFFSET ?", [paginations.limit, paginations.offset]);
        res.json({ cart, paginations }.cart);
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function getCart(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[cart]] = await db.query("SELECT * FROM cart WHERE id = ?", id)
        if (!cart) {
            const error = new Error("cart not fount")
            error.status = 402
            throw error
        }
        res.json(cart)
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function updateCart(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[cart]] = await db.query("SELECT * FROM cart WHERE id = ?", id)
        if (!cart) {
            const error = new Error("cart not fount")
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
            await db.query("UPDATE cart SET ? WHERE id = ?", [body, id])
            res.json("updated cart id = "+ id)
            return
        }
        if (req.id === cart.user_id) {
            await db.query("UPDATE cart SET ? WHERE id = ?", [body, id])
            res.json("updated cart id = "+ id)
            return
        }
        const error = new Error("you are not the owner of this account")
        error.status = 400
        throw error
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

async function deleteCart(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }

        if (req.role === "admin") {
            await db.query("DELETE FROM cart WHERE id = ?", id)
            res.json("updated cart id = "+ id)
            return
        }
        if (req.id === cart.user_id) {
            await db.query("DELETE FROM cart WHERE id = ?", id)
            res.json("delete cart id = "+ id)
            return
        }
        const error = new Error("you are not the owner of this account")
        error.status = 400
        throw error
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

export {
    createCart,
    getCarts,
    getCart,
    updateCart,
    deleteCart
}

//////////// test cart 

// {
//     "user_id": 14,
//     "product_id": 1,
//     "count": 2
// }

////////////
