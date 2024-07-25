import express from 'express'
import cors from 'cors'
import cors_config from '../config/cors-config.json' assert {type: 'json'}
import { iSessionWrapper } from '../instances/iSessionManager/iSessionManager.js'
import { isAuthMiddleware } from '../middlewares/isAuthMid.js'
import {loginRouter, homeRouter, logoutRouter, registerRouter, productRouter, imageRouter} from '../routes/dispatcher.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
const PORT = 3000

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'images'),
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname)
    }
  });
const uploadMiddleware = multer({storage}).single('image')

app.use(express.json())
app.use(cors(cors_config))
app.use(iSessionWrapper.getSession())

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/home', isAuthMiddleware, homeRouter)
app.use('/logout', logoutRouter)
app.use('/products',  productRouter)
// app.use('/image', upload.single('image'), imageRouter)

app.post('/upload', uploadMiddleware , (req, res) => {
    if (!req.file) {
        console.log('troleaste')
        return res.status(400).json({
            mensaje: 'troleaste'
        });
    }
    console.log(req.file);
    res.status(200).json({
        mensaje: 'troleastent'
    })
});


app.listen(PORT, ()=>{
    console.log(`corriendo servidor http://localhost:${PORT}`)
})
