import db from "../config/db.config.js"

async function createCatProd(req, res){
    try {
        const body = req.body
        if (!body) {
            const error = new Error("there is already a user")
            error.status = 402
            throw error
        }
        const [[chekbody]] = await db.query("SELECT * FROM categorys_products WHERE product_id = ? AND category_id = ?", [body.product_id, body.category_id])
        if (chekbody) {
            const error = new Error("already in the database")
            error.status = 403
            throw error
        }
        await db.query("INSERT INTO categorys_products SET ?", body)
        res.json("created categorys_products")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getCatProds(req, res) {
    try {
        const [categorys_products] = await db.query("SELECT * FROM categorys_products")
        if (!categorys_products) {
            const error = new Error("comment not found")
            error.status = 403
            throw error
        }
        res.json(categorys_products)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function deleteCatProd(req, res) {
    try {
        const query = req.query
        if (!query) {
            const error = new Error("query not found")
            error.status = 403
            throw error
        }
        await db.query("DELETE FROM categorys_products WHERE product_id = ? AND category_id = ?", [query.product_id, query.category_id])
        res.json("delete categorys_products")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export {
    createCatProd,
    getCatProds,
    deleteCatProd
}


/////////// test commint

// {
//     "product_id": 1,
//     "category_id": 1
// }

///////////