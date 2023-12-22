import {Router} from 'express'
import { createUser, getUsers, getUser, updateUser } from '../controller/controller.user.js'

const userRoute = Router()

userRoute.post('/', createUser)
userRoute.get('/:id', getUser)
userRoute.get('/', getUsers)
userRoute.patch('/:id', updateUser)
// userRoute.delete('/:id', authGuard(), getUser)

export default userRoute

// authGuard("admin, user, moderator")