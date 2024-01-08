import {Router} from "express"
import roleGuard from "../middleware/role.guard.js"
import authGuard from "../middleware/user.guard.js"
import {createComment, getComments, getComment, updateComment, deleteComment} from '../controller/controller.comment.js'

const CommentRouter = Router()

CommentRouter.post('/', authGuard, roleGuard, createComment)
CommentRouter.get('/:id', getComment)
CommentRouter.get('/', getComments)
CommentRouter.patch('/:id', authGuard, roleGuard, updateComment)
CommentRouter.delete('/:id', authGuard, roleGuard, deleteComment)

export default CommentRouter