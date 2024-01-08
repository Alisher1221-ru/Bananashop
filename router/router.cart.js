import {Router} from "express"
import { createCart, getCarts, getCart, updateCart, deleteCart } from "../controller/controller.cart.js"
import roleGuard from "../middleware/role.guard.js"
import authGuard from "../middleware/user.guard.js"

const cartRouter = Router()

cartRouter.post('/',  authGuard, roleGuard, createCart)
cartRouter.get('/:id', getCart)
cartRouter.get('/', getCarts)
cartRouter.patch('/:id', authGuard, roleGuard, updateCart)
cartRouter.delete('/:id', authGuard, roleGuard, deleteCart)

export default cartRouter