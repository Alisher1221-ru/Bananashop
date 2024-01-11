import {Router} from "express"
import { createLike, deleteLike, getLike, getLikes, updateLike } from "../controller/controller.like.js"
import roleGuard from "../middleware/role.guard.js"
import authGuard from "../middleware/user.guard.js"

const likeRouter = Router()

likeRouter.post('/', authGuard, roleGuard, createLike)
likeRouter.get('/:id', getLike)
likeRouter.get('/', getLikes)
likeRouter.patch('/:id', authGuard, roleGuard, updateLike)
likeRouter.delete('/:id', authGuard, roleGuard, deleteLike)

export default likeRouter
