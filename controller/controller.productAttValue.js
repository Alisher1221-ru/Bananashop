import db from "../config/db.config.js"
import Pagination from "../helpers/pagination.js"

async function createProductAttValue(req, res) {
    try {
        const {product_id, attributes_value_id} = req.body
        if (!product_id || !attributes_value_id) {
            const error = new Error("body not found")
            error.status = 403
            throw error
        }
        const [[product_attributes_value]] = await db.query("SELECT * FROM product_attributes_value WHERE product_id = ?", product_id)
        if (product_attributes_value) {
            if (product_attributes_value.attributes_value_id === attributes_value_id) {
                const error = new Error('there is an event')
                error.status = 403
                throw error
            }
        }
        await db.query("INSERT INTO product_attributes_value SET ?", {product_id, attributes_value_id})
        res.json('create product_attributes_value')
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getProductAttValue(req, res) {
    try {
        const {page, limit} = req.query
        
        const [[{"COUNT(*)": totalItems}]] = await db.query("SELECT COUNT(*) FROM product_attributes_value");
        const paginations = new Pagination(totalItems, page, limit)
        const getQuery = `
        SELECT
            p.id AS product_id,
            p.title,
            p.price,
            p.images,
            p.name_uz AS product_name_uz,
            p.name_ru AS product_name_ru,
            p.desc_shop_uz,
            p.desc_shop_ru,
            p.desc_uz,
            p.desc_ru,
            p.view_count,
            p.order_count,
            p.discount_in_perecnt,
            p.remoining_count,
            p.created_at AS product_created_at,
            p.updated_at AS product_updated_at,
            av.id AS attributes_value_id,
            av.created_at AS attributes_value_created_at,
            av.updated_at AS attributes_value_updated_at,
            av.name_uz AS attributes_value_name_uz,
            av.name_ru AS attributes_value_name_ru,
            av.atrebuts_id
        FROM
            product_attributes_value AS cp
        JOIN
            product AS p ON p.id = cp.product_id
        JOIN
            attributes_value AS av ON av.id = cp.attributes_value_id
        LIMIT ? OFFSET ?
        `;

        const [product_attributes_value] = await db.query(getQuery, [paginations.limit, paginations.offset]);
        res.json({product_attributes_value, paginations});
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}


async function deleteProductAttValue(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not found")
            error.status = 402
            throw error
        }
        const [[product_attributes_value]] = await db.query("SELECT * FROM product_attributes_value WHERE id = ?", id)
        if (!product_attributes_value) {
            const error = new Error("product_attributes_value not found")
            error.status = 402
            throw error
        }

        await db.query("DELETE FROM product_attributes_value WHERE id = ? ", id)
        res.json("product_attributes_value is id = "+ id +" deletes")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export {createProductAttValue, getProductAttValue, deleteProductAttValue}

/////////// test delevery

// {
//     "product_id": 2,
//     "attributes_value_id": 1
// }

///////////
