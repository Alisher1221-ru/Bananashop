import {Router} from "express"
import { createLike, deleteLike, getLike, getLikes, updateLike } from "../controller/controller.like.js"

const likeRouter = Router()

likeRouter.post('/', createLike)
likeRouter.get('/:id', getLikes)
likeRouter.get('/', getLike)
likeRouter.patch('/:id', updateLike)
likeRouter.delete('/:id', deleteLike)

export default likeRouter