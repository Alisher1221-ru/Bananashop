import {Router} from 'express'
import { createUser, getUsers, getUser, updateUser, login } from '../controller/controller.user.js'
import authGuard from '../middleware/user.middleware.js'

const userRoute = Router()

userRoute.post('/signin', authGuard, createUser)
userRoute.post('/login', authGuard, login)
userRoute.get('/:id', authGuard, getUser)
userRoute.get('/', authGuard, getUsers)
userRoute.patch('/:id', authGuard, updateUser)
userRoute.delete('/delet:id', authGuard, getUser)

export default userRoute
