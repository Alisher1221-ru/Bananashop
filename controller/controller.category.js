import db from "../config/db.config.js";

async function createCategory(req, res) {
    try {
        const {name_uz, name_ru, desc_shop_uz, desc_shop_ru, parent_id} = req.body
        if (!name_uz || !name_ru || !desc_shop_uz || !desc_shop_ru ) {
            const error = new Error('body not found')
            error.status = 403
            throw error
        }
        const [[category]] = await db.query("SELECT * FROM category WHERE name_uz = ?", name_uz)
        if (category) {
            const error = new Error('there is an category')
            error.status = 403
            throw error
        }

        await db.query("INSERT INTO category SET ?", {name_uz, name_ru, desc_shop_uz, desc_shop_ru, parent_id})
        res.json('created category')
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getCategorys(req, res) {
    try {
        const [category] = await db.query("SELECT * FROM category")
        if (!category) {
            const error = new Error("category not fount")
            error.status = 403
            throw error
        }
        res.json(category)
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function getCategory(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[category]] = await db.query("SELECT * FROM category WHERE id = ?", id)
        if (!category) {
            const error = new Error("category not fount")
            error.status = 402
            throw error
        }
        res.json(category)
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function updateCategory(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[category]] = await db.query("SELECT * FROM category WHERE id = ?", id)
        if (!category) {
            const error = new Error("category not fount")
            error.status = 403
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not fount")
            error.status = 402
            throw error
        }
        await db.query("UPDATE category SET ? WHERE id = ?", [body, id])
        res.json("updated category id = "+ id)
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function deleteCategory(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        await db.query("DELETE FROM category WHERE id = ?", id)
        res.json("delete category id = "+ id)
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

export {
    createCategory,
    getCategorys,
    getCategory,
    updateCategory,
    deleteCategory
}

//////////// test category

// {
//     "name_uz": "electronica",
//     "name_ru": "электроника",
//     "desc_shop_uz": "mazda uzb",
//     "desc_shop_ru": "Мазда Узб",
//     "parent_id": null
// }

/////////////
