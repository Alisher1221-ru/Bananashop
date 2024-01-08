import { Router } from "express";
import { createAttValue, getAttValue, getAttValues, updateAttValue, deleteAttValue } from "../controller/controller.att.values.js";
import roleGuard from "../middleware/role.guard.js";
import authGuard from "../middleware/user.guard.js";

const routerAttValue = Router()

routerAttValue.post('/', authGuard, roleGuard, createAttValue)
routerAttValue.get('/:id', getAttValue)
routerAttValue.get('/', getAttValues)
routerAttValue.patch('/:id', authGuard, roleGuard, updateAttValue)
routerAttValue.delete('/:id', authGuard, roleGuard, deleteAttValue)


export default routerAttValue

