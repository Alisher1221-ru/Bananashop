import {Router} from "express"
import { createCart, getCarts, getCart, updateCart, deleteCart } from "../controller/controller.cart.js"

const cartRouter = Router()

cartRouter.post('/', createCart)
cartRouter.get('/:id', getCart)
cartRouter.get('/', getCarts)
cartRouter.patch('/:id', updateCart)
cartRouter.delete('/:id', deleteCart)

export default cartRouter