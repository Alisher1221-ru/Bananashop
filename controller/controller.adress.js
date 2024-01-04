import db from "../config/db.config.js"

async function createAdress(req, res){
    try {
        const {region, city, street, house, room, name, user_id} = req.body
        if (!region || !city || !street || !house || !room || !name || !user_id) {
            const error = new Error("there is already a user")
            error.status = 402
            throw error
        }
        const [[adress]] = await db.query("SELECT * FROM adress WHERE name = ?", name)
        if (adress) {
            const error = new Error("the address is already there")
            error.status=402
            throw error
        }
        await db.query("INSERT INTO adress SET ?", {region, city, street, house, room, name, user_id})
        res.json("created adress")
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

async function getAdresss(req, res) {
    try {
        const [adress] = await db.query("SELECT * FROM adress")
        if (!adress) {
            const error = new Error("adress not found")
            error.status = 403
            throw error
        }
        res.json(adress)
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

async function getAdress(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("error is params")
            error.status = 402
            throw error
        }
        const [[adress]] = await db.query("SELECT * FROM adress WHERE id = ?", id)
        if (!adress) {
            const error = new Error("adress not found")
            error.status = 403
            throw error
        }
        res.json(adress)
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

async function updateAdress(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("error is params")
            error.status = 402
            throw error
        }
        const [[adress]] = await db.query("SELECT * FROM adress WHERE id = ?", id)
        if (!adress) {
            const error = new Error("adress not found")
            error.status = 403
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not found")
            error.status = 403
            throw error
        }

        await db.query("UPDATE adress SET ? WHERE id = ?", [body, id])
        res.json("updated adress id = "+id)
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

async function deleteAdress(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("error is params")
            error.status = 402
            throw error
        }
        const [[adress]] = await db.query("SELECT * FROM adress WHERE id = ?", id)
        if (!adress) {
            const error = new Error("adress not found")
            error.status = 403
            throw error
        }

        await db.query("DELETE FROM adress WHERE id = ?", id)
        res.json("delete adress id = "+id)
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

export {
    createAdress,
    getAdress,
    getAdresss,
    updateAdress,
    deleteAdress
}
