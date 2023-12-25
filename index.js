import express from 'express'
import env from './config/env.config.js'
import userRoute from './router/routre.user.js'
import xxx from './te4st/pricol.test.js'

const port = env.PORT

const appServer = express()

appServer.use(express.json())
appServer.use('/users', userRoute)

appServer.use('/pricol', xxx)

appServer.listen(port, () => console.log(port+" server run"))