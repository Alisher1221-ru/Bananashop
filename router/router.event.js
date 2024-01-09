import { Router } from "express";
import {createEvent, getEvents, getEvent, updateEvent, deleteEvent} from '../controller/controller.event.js'
import authGuard from '../middleware/user.guard.js'
import roleGuard from '../middleware/role.guard.js'

const routerEvent = Router()

routerEvent.post('/', authGuard, roleGuard, createEvent)
routerEvent.get('/:id', getEvent)
routerEvent.get('/', getEvents)
routerEvent.patch('/:id', authGuard, roleGuard, updateEvent)
routerEvent.delete('/:id', authGuard, roleGuard, deleteEvent)

export default routerEvent
