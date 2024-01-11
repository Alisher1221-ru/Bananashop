import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";

async function createEvent(req, res) {
    try {
        const {name} = req.body
        if (!name) {
            const error = new Error('body not found')
            error.status = 403
            throw error
        }
        const [[event]] = await db.query("SELECT * FROM event WHERE name = ?", name)
        if (event) {
            const error = new Error('there is an event')
            error.status = 403
            throw error
        }

        await db.query("INSERT INTO event SET ?", {name})
        res.json('created event')
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getEvents(req, res) {
    try {
        const { page, limit } = req.query;
        // Fetch the total count of records
        const [[{ "COUNT(*)": totalItems }]] = await db.query("SELECT COUNT(*) FROM event");
        // Create a Pagination object
        const paginations = new Pagination(totalItems, page, limit);
        // Fetch the paginated addresses
        const [event] = await db.query("SELECT * FROM event LIMIT ? OFFSET ?", [paginations.limit, paginations.offset]);
        res.json({ event, paginations }.event);
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function getEvent(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[event]] = await db.query("SELECT * FROM event WHERE id = ?", id)
        if (!event) {
            const error = new Error("event not fount")
            error.status = 402
            throw error
        }
        res.json(event)
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function updateEvent(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        const [[event]] = await db.query("SELECT * FROM event WHERE id = ?", id)
        if (!event) {
            const error = new Error("event not fount")
            error.status = 403
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not fount")
            error.status = 402
            throw error
        }
        await db.query("UPDATE event SET ? WHERE id = ?", [body, id])
        res.json("updated event id = "+ id)
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

async function deleteEvent(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("params not fount")
            error.status = 402
            throw error
        }
        await db.query("DELETE FROM event WHERE id = ?", id)
        res.json("delete event id = "+ id)
    } catch (error) {
        res.status(error.status || 500).json({error:error.message})
    }
}

export {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent
}

//////////// test category

// {
//     "name": "1x1"
// }

/////////////
