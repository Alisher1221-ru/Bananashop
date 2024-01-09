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
import CommentRouter from './router/router.comment.js'
import categorys_productsCategory from './router/router.cat_prod.js'
import routerEvent from './router/router.event.js'
import routercategoryAttributes from './router/router.categoryAttributes.js'
import routerDelevery from './router/router.delevery.js'
import productAttValueRoute from './router/router.productAttValue.js'
import OrderRouter from './router/router.orders.js'

const port = env.PORT

const appServer = express()

appServer.use(express.json())
appServer.use('/users', userRoute)
appServer.use('/delevery', routerDelevery)
appServer.use('/products', productRoute)
appServer.use('/productsAttValue', productAttValueRoute)
appServer.use('/adress', adressRouter)
appServer.use('/cart', cartRouter)
appServer.use('/like', likeRouter)
appServer.use('/attributes', routerAtrebuts)
appServer.use('/attvalue', routerAttValue)
appServer.use('/orders', OrderRouter)
appServer.use('/category', routerCategory)
appServer.use('/categorysProducts', categorys_productsCategory)
appServer.use('/categorysAttributes', routercategoryAttributes)
appServer.use('/comment', CommentRouter)
appServer.use('/event', routerEvent)

appServer.listen(port, () => console.log(port+" server run"))
