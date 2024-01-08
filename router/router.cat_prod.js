import { Router } from "express";
import {createCatProd, getCatProds, deleteCatProd} from '../controller/controller.cat_prod.js'
import authGuard from '../middleware/user.guard.js'
import roleGuard from '../middleware/role.guard.js'

const categorys_productsCategory = Router()

categorys_productsCategory.post('/', authGuard, roleGuard, createCatProd)
categorys_productsCategory.get('/', getCatProds)
categorys_productsCategory.delete('/', authGuard, roleGuard, deleteCatProd)

export default categorys_productsCategory
