import db from "../config/db.config.js"

async function createComment(req, res){
    try {
        const {parent_id, user_id, content, images, product_id, rating, answer_to} = req.body
        if (!user_id || !content || !images || !product_id || !rating ) {
            const error = new Error("there is already a user")
            error.status = 402
            throw error
        }
        await db.query("INSERT INTO comment SET ?", {parent_id, user_id, content, images, product_id, rating, answer_to})
        res.json("created comment")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getComments(req, res) {
    try {
        const [comment] = await db.query("SELECT * FROM comment")
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

        await db.query("UPDATE comment SET ? WHERE id = ?", [body, id])
        res.json("updated comment id = "+id)
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

        await db.query("DELETE FROM comment WHERE id = ?", id)
        res.json("delete comment id = "+id)
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
//     "parent_id": null,
//     "user_id": 14,
//     "content": "lol",
//     "images": "xax",
//     "rating": 4.5,
//     "answer_to": null
// }

///////////
