import db from "../config/db.config.js"
import Pagination from "../helpers/pagination.js"

async function createAdress(req, res){
    try {
        const {region, city, street, house, room, name, user_id} = req.body
        if (!region || !city || !street || !house || !room || !name || !user_id) {
            const error = new Error("body not found")
            error.status = 400
            throw error
        }

        await db.query("INSERT INTO adress SET ?", {region, city, street, house, room, name, user_id})
        res.json("created adress")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getAdresss(req, res) {
    try {
        const { page, limit } = req.query;
        // Fetch the total count of records
        const [[{ "COUNT(*)": totalItems }]] = await db.query("SELECT COUNT(*) FROM adress");
        // Create a Pagination object
        const paginations = new Pagination(totalItems, page, limit);
        // Fetch the paginated addresses
        const [addresses] = await db.query("SELECT * FROM adress LIMIT ? OFFSET ?", [paginations.limit, paginations.offset]);
        res.json({ addresses, paginations }.addresses);
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getAdress(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("error is params")
            error.status = 400
            throw error
        }
        const [[adress]] = await db.query("SELECT * FROM adress WHERE id = ?", id)
        if (!adress) {
            const error = new Error("adress not found")
            error.status = 404
            throw error
        }
        res.json(adress)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
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
            error.status = 404
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not found")
            error.status = 400
            throw error
        }
        if (req.role === "admin") {
            await db.query("UPDATE adress SET ? WHERE id = ?", [body, id])
            res.json("updated adress id = "+id)
            return
        }
        if (req.id === adress.user_id) {
            await db.query("UPDATE adress SET ? WHERE id = ?", [body, id])
            res.json("updated adress id = "+id)
            return
        }
        const error = new Error("you are not the owner of this address")
        error.status = 403
        throw error
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
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

        if (req.role === "admin") {
            await db.query("DELETE FROM adress WHERE id = ?", id)
            res.json("delete adress id = "+id)
            return
        }
        if (req.id === adress.user_id) {
            await db.query("DELETE FROM adress WHERE id = ?", id)
            res.json("delete adress id = "+id)
            return
        }
        const error = new Error("you are not the owner of this address")
        error.status = 403
        throw error
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export {
    createAdress,
    getAdress,
    getAdresss,
    updateAdress,
    deleteAdress
}


/////////// test adress

// {
//     "region": "Xorezm",
//     "city": "Urganch",
//     "street": "yangi oylalar 4-yolak",
//     "house": 14,
//     "room": "null",
//     "name": "naruto",
//     "user_id": 4
// }

///////////
