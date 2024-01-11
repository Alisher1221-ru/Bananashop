import db from "../config/db.config.js"
import Pagination from "../helpers/pagination.js"

async function createComment(req, res){
    try {
        const {content, images, product_id, rating, answer_to} = req.body
        if (!product_id || !content) {
            const error = new Error("body not found")
            error.status = 403
            throw error
        }

        await db.query("INSERT INTO comment SET ?", {user_id: req.id , content, images, product_id, rating, answer_to})
        res.json("created comment")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getComments(req, res) {
    try {
        const { page, limit } = req.query;
        // Fetch the total count of records
        const [[{ "COUNT(*)": totalItems }]] = await db.query("SELECT COUNT(*) FROM comment");
        // Create a Pagination object
        const paginations = new Pagination(totalItems, page, limit);
        // Fetch the paginated addresses
        const [comment] = await db.query("SELECT * FROM comment LIMIT ? OFFSET ?", [paginations.limit, paginations.offset]);
        res.json({ comment, paginations }.comment);
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

async function getComment(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("error is params")
            error.status = 402
            throw error
        }
        const [[comment]] = await db.query("SELECT * FROM comment WHERE id = ?", id)
        if (!comment) {
            const error = new Error("comment not found")
            error.status = 403
            throw error
        }
        res.json(comment)
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

async function updateComment(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("error is params")
            error.status = 402
            throw error
        }
        const [[comment]] = await db.query("SELECT * FROM comment WHERE id = ?", id)
        if (!comment) {
            const error = new Error("comment not found")
            error.status = 403
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not found")
            error.status = 403
            throw error
        }

        if (req.role === "admin") {
            await db.query("UPDATE attributes SET ? WHERE id = ?", [body, id])
            res.json("updated attribute id = "+ id)
            return
        }
        if (req.id === comment.user_id) {
            await db.query("UPDATE attributes SET ? WHERE id = ?", [body, id])
            res.json("updated attribute id = "+ id)
            return
        }
        const error = new Error("you are not the owner of this address")
        error.status = 403
        throw error
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

async function deleteComment(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("error is params")
            error.status = 402
            throw error
        }
        const [[comment]] = await db.query("SELECT * FROM comment WHERE id = ?", id)
        if (!comment) {
            const error = new Error("comment not found")
            error.status = 403
            throw error
        }

        if (req.role === "admin") {
            await db.query("DELETE FROM comment WHERE id = ?", id)
            res.json("delete comment id = "+id)
            return
        }
        if (req.id === comment.user_id) {
            await db.query("DELETE FROM comment WHERE id = ?", id)
            res.json("delete comment id = "+id)
            return
        }
        const error = new Error("you are not the owner of this address")
        error.status = 403
        throw error
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

export {
    createComment,
    getComments,
    getComment,
    updateComment,
    deleteComment
}


/////////// test commint

// {
//     "content": "lol",
//     "images": "xax",
//     "product_id": 1,
//     "rating": 4.5,
//     "answer_to": 2
// }

///////////
