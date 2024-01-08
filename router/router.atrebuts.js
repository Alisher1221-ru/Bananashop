import { Router } from "express";
import { createAtrebuts, deleteAttributes, getAttribute, getAttributes, updateAttributes } from "../controller/controller.atrebuts.js";

const routerAtrebuts = Router()

routerAtrebuts.post('/', createAtrebuts)
routerAtrebuts.get('/:id', getAttribute)
routerAtrebuts.get('/', getAttributes)
routerAtrebuts.patch('/:id', updateAttributes)
routerAtrebuts.delete('/:id', deleteAttributes)


export default routerAtrebuts
