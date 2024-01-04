import express from 'express'
import env from './config/env.config.js'
import userRoute from './router/routre.user.js'
import productRoute from './router/router.products.js'
import adressRouter from './router/router.adress.js'

const port = env.PORT

const appServer = express()

appServer.use(express.json())
appServer.use('/users', userRoute)
appServer.use('/products', productRoute)
appServer.use('/adress', adressRouter)

appServer.listen(port, () => console.log(port+" server run"))
