import { Router } from "express";
import { createCategory, deleteCategory, getCategory, getCategorys, updateCategory } from "../controller/controller.category.js";
import authGuard from '../middleware/user.guard.js'
import roleGuard from '../middleware/role.guard.js'

const routerCategory = Router()

routerCategory.post('/', authGuard, roleGuard, createCategory)
routerCategory.get('/:id', getCategory)
routerCategory.get('/', getCategorys)
routerCategory.patch('/:id', authGuard, roleGuard, updateCategory)
routerCategory.delete('/:id', authGuard, roleGuard, deleteCategory)

export default routerCategory
