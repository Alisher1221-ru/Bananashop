import {Router} from "express"
import authGuard from '../middleware/user.guard.js'
import roleGuard from '../middleware/role.guard.js'
import { createProductEvent, getProductEvents, deleteProductEvent } from "../controller/controller.productevent.js"

const productEventRoute = Router()

productEventRoute.post('/', authGuard, roleGuard, createProductEvent)
productEventRoute.get('/', getProductEvents)
productEventRoute.delete('/', authGuard, roleGuard, deleteProductEvent)

export default productEventRoute

