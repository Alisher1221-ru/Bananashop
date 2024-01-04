import {Router} from "express"
import authGuard from '../middleware/user.guard.js'
import roleGuard from '../middleware/role.guard.js'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/controller.products.js"

const productRoute = Router()

productRoute.post('/', authGuard, roleGuard, createProduct)
productRoute.get('/:id', getProducts)
productRoute.get('/', getProduct)
productRoute.patch('/:id', authGuard, roleGuard, updateProduct)
productRoute.delete('/:id', authGuard, roleGuard, deleteProduct)

export default productRoute
