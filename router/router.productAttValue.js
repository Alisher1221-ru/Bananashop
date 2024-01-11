import {Router} from "express"
import authGuard from '../middleware/user.guard.js'
import roleGuard from '../middleware/role.guard.js'
import { createProductAttValue, getProductAttValue, deleteProductAttValue } from "../controller/controller.productAttValue.js"

const productAttValueRoute = Router()

productAttValueRoute.post('/', authGuard, roleGuard, createProductAttValue)
productAttValueRoute.get('/', getProductAttValue)
productAttValueRoute.delete('/', authGuard, roleGuard, deleteProductAttValue)

export default productAttValueRoute

