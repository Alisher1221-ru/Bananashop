import express from 'express'
import env from './config/env.config.js'
import userRoute from './router/routre.user.js'
import productRoute from './router/router.products.js'
import adressRouter from './router/router.adress.js'
import cartRouter from './router/router.cart.js'
import likeRouter from './router/router.like.js'
import routerCategory from './router/router.category.js'
import routerAtrebuts from './router/router.atrebuts.js'
import routerAttValue from './router/router.att.values.js'

const port = env.PORT

const appServer = express()

appServer.use(express.json())
appServer.use('/users', userRoute)
appServer.use('/products', productRoute)
appServer.use('/adress', adressRouter)
appServer.use('/cart', cartRouter)
appServer.use('/like', likeRouter)
appServer.use('/attributes', routerAtrebuts)
appServer.use('/attvalue', routerAttValue)
appServer.use('/category', routerCategory)

appServer.listen(port, () => console.log(port+" server run"))
