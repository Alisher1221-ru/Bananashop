import { Router } from "express";
import { createAttValue, getAttValue, getAttValues, updateAttValue, deleteAttValue } from "../controller/controller.att.values.js";

const routerAttValue = Router()

routerAttValue.post('/', createAttValue)
routerAttValue.get('/:id', getAttValue)
routerAttValue.get('/', getAttValues)
routerAttValue.patch('/:id', updateAttValue)
routerAttValue.delete('/:id', deleteAttValue)


export default routerAttValue

