import express from 'express'
import cors from 'cors'
import cors_config from '../config/cors-config.json' assert {type: 'json'}
import { iSessionWrapper } from '../instances/iSessionManager/iSessionManager.js'
import { isAuthMiddleware } from '../middlewares/isAuthMid.js'
import {loginRouter, homeRouter, logoutRouter, registerRouter, productRouter} from '../routes/dispatcher.js'

const PORT = 3000

const app = express()

app.use(express.json())
app.use(cors(cors_config))
app.use(iSessionWrapper.getSession())

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/home', isAuthMiddleware, homeRouter)
app.use('/logout', logoutRouter)
app.use('/products', productRouter)


app.listen(PORT, ()=>{
    console.log(`corriendo servidor http://localhost:${PORT}`)
})
