import { Router } from "express";
import { createDelevery, getDeleverys, getDelevery, updateDelevery, deleteDelevery } from "../controller/controller.delevery.js";
import roleGuard from "../middleware/role.guard.js";
import authGuard from "../middleware/user.guard.js";

const routerDelevery = Router()

routerDelevery.post('/', authGuard, roleGuard, createDelevery)
routerDelevery.get('/:id', getDelevery)
routerDelevery.get('/', getDeleverys)
routerDelevery.patch('/:id', authGuard, roleGuard, updateDelevery)
routerDelevery.delete('/:id', authGuard, roleGuard, deleteDelevery)


export default routerDelevery

