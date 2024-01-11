import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";

async function createCategorysAttributes(req, res) {
    try {
        const {attributes_id, category_id} = req.body
        if (!attributes_id || !category_id ) {
            const error = new Error('body not found')
            error.status = 403
            throw error
        }
        const [[categorys_attributes]] = await db.query("SELECT * FROM categorys_attributes WHERE attributes_id = ?", attributes_id)
        if (categorys_attributes) {
            if (categorys_attributes.category_id === category_id) {
                const error = new Error('there is an categorys_attributes')
                error.status = 403
                throw error
            }
        }

        await db.query("INSERT INTO categorys_attributes SET ?", {attributes_id, category_id})
        res.json('created categorys_attributes')
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getCategorysAttributes(req, res) {
    try {
        const {page, limit} = req.query
        
        const [[{"COUNT(*)": totalItems}]] = await db.query("SELECT COUNT(*) FROM categorys_attributes");
        const paginations = new Pagination(totalItems, page, limit)
        const getQuery = `
        SELECT
            a.id AS attributes_id,
            a.created_at AS attributes_created_at,
            a.updated_at AS attributes_updated_at,
            a.name_uz AS attributes_name_uz,
            a.name_ru AS attributes_name_ru,
            c.id AS category_id,
            c.name_uz AS category_name_uz,
            c.name_ru AS category_name_ru,
            c.desc_shop_uz AS category_desc_shop_uz,
            c.desc_shop_ru AS category_desc_shop_ru,
            c.created_at AS category_created_at,
            c.updated_at AS category_updated_at,
            c.parent_id
        FROM
            categorys_attributes AS ca
        JOIN
            attributes AS a ON a.id = ca.attributes_id
        JOIN
            category AS c ON c.id = ca.category_id
        LIMIT ? OFFSET ?
        `;
        
        const [categorys_attributes] = await db.query(getQuery, [paginations.limit, paginations.offset]);
        res.json({categorys_attributes, paginations}.categorys_attributes);
    }catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function deleteCategorysAttributes(req, res) {
    try {
        const query = req.query;
        if (!query) {
            const error = new Error("query not found");
            error.status = 400;
            throw error;
        }
        const [[categorys_attributes]] = await db.query("SELECT * FROM categorys_attributes WHERE attributes_id = ? AND category_id = ?", [query.attributes_id, query.category_id])
        if (!categorys_attributes) {
            const error = new Error("categorys_attributes not found")
            error.status = 400
            throw error
        }

        await db.query("DELETE FROM categorys_attributes WHERE attributes_id = ? AND category_id = ?", [query.attributes_id, query.category_id]);
        res.json("delete categorys_attributes");
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

export {
    createCategorysAttributes,
    getCategorysAttributes,
    deleteCategorysAttributes
}

//////////// test CategorysAttributes

// {
//     "category_id": 1,
//     "attributes_id": 2
// }

/////////////
