import {Router} from 'express'
import { createUser, getUsers, getUser, updateUser, login, deleteUser } from '../controller/controller.user.js'
import authGuard from '../middleware/user.guard.js'

const userRoute = Router()

userRoute.post('/signin', createUser)
userRoute.post('/login', login)
userRoute.get('/:id', getUser)
userRoute.get('/', authGuard, getUsers)
userRoute.patch('/:id', authGuard, updateUser)
userRoute.delete('/:id', authGuard, deleteUser)

export default userRoute
