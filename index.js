import express from 'express'
import env from './config/env.config.js'

const port = env.PORT

const appServer = express()

appServer.use(express.json())
appServer.use('/bananashop', )

appServer.listen(port, () => console.log(port+" server run"))