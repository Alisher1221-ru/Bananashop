import {Router} from "express"
import { createAdress, deleteAdress, getAdress, getAdresss, updateAdress } from "../controller/controller.adress.js"

const adressRouter = Router()

adressRouter.post('/', createAdress)
adressRouter.get('/:id', getAdress)
adressRouter.get('/', getAdresss)
adressRouter.patch('/:id', updateAdress)
adressRouter.delete('/:id', deleteAdress)

export default adressRouter
