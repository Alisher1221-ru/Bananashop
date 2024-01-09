import {Router} from "express"
import authGuard from '../middleware/user.guard.js'
import roleGuard from '../middleware/role.guard.js'
import { createProductAttValue, getProductAttValue, getProductAttValues, updateProductAttValue, deleteProductAttValue } from "../controller/controller.productAttValue.js"

const productAttValueRoute = Router()

productAttValueRoute.post('/', authGuard, roleGuard, createProductAttValue)
productAttValueRoute.get('/:id', getProductAttValue)
productAttValueRoute.get('/', getProductAttValues)
productAttValueRoute.patch('/:id', authGuard, roleGuard, updateProductAttValue)
productAttValueRoute.delete('/:id', authGuard, roleGuard, deleteProductAttValue)

export default productAttValueRoute

