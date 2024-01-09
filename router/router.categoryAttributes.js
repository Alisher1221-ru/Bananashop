import { Router } from "express";
import { createCategorysAttributes, getCategorysAttributes, deleteCategorysAttributes } from "../controller/controller.categoryAttributes.js";
import roleGuard from "../middleware/role.guard.js";
import authGuard from "../middleware/user.guard.js";

const routercategoryAttributes = Router()

routercategoryAttributes.post('/', authGuard, roleGuard, createCategorysAttributes)
routercategoryAttributes.get('/', getCategorysAttributes)
routercategoryAttributes.delete('/:id', authGuard, roleGuard, deleteCategorysAttributes)


export default routercategoryAttributes

