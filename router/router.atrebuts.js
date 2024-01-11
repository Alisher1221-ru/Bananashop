import { Router } from "express";
import { createAtrebuts, deleteAttributes, getAttribute, getAttributes, updateAttributes } from "../controller/controller.atrebuts.js";
import authGuard from "../middleware/user.guard.js";
import roleGuard from "../middleware/role.guard.js";

const routerAtrebuts = Router()

routerAtrebuts.post('/', authGuard, createAtrebuts)
routerAtrebuts.get('/:id', getAttribute)
routerAtrebuts.get('/', getAttributes)
routerAtrebuts.patch('/:id', authGuard, updateAttributes)
routerAtrebuts.delete('/:id', authGuard, deleteAttributes)


export default routerAtrebuts
