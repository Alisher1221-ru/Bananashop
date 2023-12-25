import db from "../config/db.config.js"

async function xxx (req,res) {
    try {
        const [[data]] = await db.query("SELECT * FROM users JOIN pricol ON users.id = pricol.user_id")
        res.json(data)
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

export default xxx