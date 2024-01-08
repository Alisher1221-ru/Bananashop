import {Router} from "express"
import { createAdress, deleteAdress, getAdress, getAdresss, updateAdress } from "../controller/controller.adress.js"
import authGuard from "../middleware/user.guard.js"
import roleGuard from "../middleware/role.guard.js"

const adressRouter = Router()

adressRouter.post('/', authGuard, roleGuard, createAdress)
adressRouter.get('/:id', getAdress)
adressRouter.get('/', getAdresss)
adressRouter.patch('/:id',authGuard, roleGuard, updateAdress)
adressRouter.delete('/:id',authGuard, roleGuard, deleteAdress)

export default adressRouter
