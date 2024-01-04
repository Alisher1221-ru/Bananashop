import {Router} from 'express'
import { createUser, getUsers, getUser, updateUser, login, deleteUser, refreshUser, logoutUser } from '../controller/controller.user.js'
import authGuard from '../middleware/user.guard.js'
import roleGuard from '../middleware/role.guard.js'

const userRoute = Router()

userRoute.get('/:id', getUser)
userRoute.get('/', authGuard, roleGuard, getUsers)
userRoute.post('/refresh', authGuard, refreshUser)
userRoute.post('/signin', createUser)
userRoute.post('/login', login)
userRoute.post('/logout', logoutUser)
userRoute.patch('/:id', authGuard, updateUser)
userRoute.delete('/:id', authGuard, deleteUser)

export default userRoute
