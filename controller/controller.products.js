import db from "../config/db.config.js"


async function createProduct(req, res) {
    try {
        const {title, price, images, name_uz, name_ru, desc_shop_uz, desc_shop_ru, desc_uz, desc_ru, discount_in_perecnt, remoining_count} = req.body
        if (!title || !price || !images || !name_uz || !name_ru || !desc_shop_uz || !desc_shop_ru || !desc_uz || !desc_ru || !discount_in_perecnt || !remoining_count) {
            const error = new Error("body not found")
            error.status = 403
            throw error
        }
        const [[product]] = await db.query("SELECT * FROM product WHERE name_uz = ?", name_uz)
        if (product) {
            const error = new Error("product not found")
            error.status = 403
            throw error
        }
        await db.query("INSERT INTO product SET ?", {title, price, images, name_uz, name_ru, desc_shop_uz, desc_shop_ru, desc_uz, desc_ru, discount_in_perecnt, remoining_count})
        res.json('create product')
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getProduct(req, res) {
    try {
        const [product] = await db.query("SELECT * FROM product")
        if (!product) {
            const error = new Error("product not found")
            error.status = 403
            throw error
        }
        res.json(product)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getProducts(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("error is params")
            error.status = 402
            throw error
        }
        const [[product]] = await db.query("SELECT * FROM product WHERE id = ?", id)
        if (!product) {
            const error = new Error("product not found")
            error.status = 403
            throw error
        }
        res.json(product)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function updateProduct(req, res) {
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
        const [[product]] = await db.query("SELECT * FROM product WHERE id = ?", id)
        if (!product) {
            const error = new Error("product not found")
            error.status = 402
            throw error
        }

        await db.query("UPDATE product SET ?, updated_at = ? WHERE id = ? ", [body, new Date(), id])
        res.json("product is id = "+ id +" updates")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not found")
            error.status = 402
            throw error
        }
        const [[product]] = await db.query("SELECT * FROM product WHERE id = ?", id)
        if (!product) {
            const error = new Error("product not found")
            error.status = 402
            throw error
        }

        await db.query("DELETE FROM product WHERE id = ? ", id)
        res.json("product is id = "+ id +" deletes")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export {createProduct, getProduct, getProducts, updateProduct, deleteProduct}

///////////test body
// {
//     "title": "nVidia GeForce RTX 4090 Ti 18GB 512bit 3 propeller 8pin conector",
//     "price": 31000000,
//     "images": "https://www.ixbt.com/img/x780x600/r30/00/02/56/96/light1.jpg",
//     "name_uz": "nVidia GeForce RTX 4090 Ti",
//     "name_ru": "nVidia GeForce RTX 4090 Ti",
//     "desc_shop_uz": "zor",
//     "desc_shop_ru": "класс",
//     "desc_uz": "zor video karta boldi",
//     "desc_ru": "Это жёсткая видеокарта",
//     "discount_in_perecnt": 10,
//     "remoining_count": 12
// }
///////////
