import {Router} from "express"
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from "../controller/controller.orders.js"
import roleGuard from "../middleware/role.guard.js"
import authGuard from "../middleware/user.guard.js"

const OrderRouter = Router()

OrderRouter.post('/', authGuard, createOrder)
OrderRouter.get('/:id', authGuard, getOrder)
OrderRouter.get('/', authGuard, getOrders)
OrderRouter.patch('/:id', authGuard, roleGuard, updateOrder)
OrderRouter.delete('/:id', authGuard, roleGuard, deleteOrder)

export default OrderRouter
