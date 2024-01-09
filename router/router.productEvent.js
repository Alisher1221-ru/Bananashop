import {Router} from "express"
import authGuard from '../middleware/user.guard.js'
import roleGuard from '../middleware/role.guard.js'
import { createProductEvent, getProductEvent, getProductEvents, updateProductEvent, deleteProductEvent } from "../controller/controller.productevent.js"

const productAttValueRoute = Router()

productAttValueRoute.post('/', authGuard, roleGuard, createProductEvent)
productAttValueRoute.get('/:id', getProductEvent)
productAttValueRoute.get('/', getProductEvents)
productAttValueRoute.patch('/:id', authGuard, roleGuard, updateProductEvent)
productAttValueRoute.delete('/:id', authGuard, roleGuard, deleteProductEvent)

export default productAttValueRoute

