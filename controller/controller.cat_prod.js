import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";

async function createCatProd(req, res) {
    try {
        const body = req.body;
        if (!body) {
            const error = new Error("there is already a user");
            error.status = 402;
            throw error;
        }
        const [[chekbody]] = await db.query(
            "SELECT * FROM categorys_products WHERE product_id = ? AND category_id = ?",
            [body.product_id, body.category_id]
        );
        if (chekbody) {
            const error = new Error("already in the database");
            error.status = 403;
            throw error;
        }
        await db.query("INSERT INTO categorys_products SET ?", body);
        res.json("created categorys_products");
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

async function getCatProds(req, res) {
    try {
        const {page, limit} = req.query
        
        const [[{"COUNT(*)": totalItems}]] = await db.query("SELECT COUNT(*) FROM categorys_products");
        const paginations = new Pagination(totalItems, page, limit)
        const getQuery = `
        SELECT
            p.id AS product_id,
            p.title,
            p.price,
            p.images,
            p.name_uz AS product_name_uz,
            p.name_ru AS product_name_ru,
            p.desc_shop_uz AS product_desc_shop_uz,
            p.desc_shop_ru AS product_desc_shop_ru,
            p.desc_uz,
            p.desc_ru,
            p.view_count,
            p.order_count,
            p.discount_in_perecnt,
            p.remoining_count,
            p.created_at AS product_created_at,
            p.updated_at AS product_updated_at,
            c.id AS category_id,
            c.name_uz AS category_name_uz,
            c.name_ru AS category_name_ru,
            c.desc_shop_uz AS category_desc_shop_uz,
            c.desc_shop_ru AS category_desc_shop_ru,
            c.created_at AS category_created_at,
            c.updated_at AS category_updated_at,
            c.parent_id
        FROM
            categorys_products AS cp
        JOIN
            product AS p ON p.id = cp.product_id
        JOIN
            category AS c ON c.id = cp.category_id
        LIMIT ? OFFSET ?
        `;
        
        const [categorys_products] = await db.query(getQuery, [paginations.limit, paginations.offset]);
        res.json({categorys_products, paginations});
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

async function deleteCatProd(req, res) {
    try {
        const query = req.query;
        if (!query) {
            const error = new Error("query not found");
            error.status = 403;
            throw error;
        }
        await db.query(
            "DELETE FROM categorys_products WHERE product_id = ? AND category_id = ?",
            [query.product_id, query.category_id]
        );
        res.json("delete categorys_products");
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export { createCatProd, getCatProds, deleteCatProd };

/////////// test commint

// {
//     "product_id": 1,
//     "category_id": 1
// }

///////////
