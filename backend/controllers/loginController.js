import { iSessionWrapper } from "../instances/iSessionManager/iSessionManager.js"
import { userModel } from "../models/userModel.js"
import { loginValidation } from "../instances/iValidator/iValidator.js"

export class loginController {

    /**
     * Controlador para logear a un usuario
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     *
     */
    static async loginControlPost(req, res){
        try{
            console.log(req.body)
            const result = await loginValidation.validateTotal(req.body)
            if(iSessionWrapper.verifySession(req)) return res.json({mensaje: `Ya hay una sesion iniciada con el usuario ${req.session.username}`}  )
            if(result.error) return res.status(400).json({mensaje: 'Datos no validos', error: result.error.issues})
            console.log(result.data)

            const {username, password} = result.data

            console.log(`Usuario: ${username}, Password: ${password}`)

            const usuario = await userModel.verifyUser({
                username
            })

            if(!usuario.success && usuario.error) return res.status(400).json({error: usuario.error})

            const contraseña = await userModel.verifyPassword({
                username,
                password
            })

            if(!contraseña.success && contraseña.error) return res.status(400).json({error: contraseña.error})
            
            const [user] = usuario.resultSet

            await iSessionWrapper.createSession({req, user})
            return res.status(200).json({
                mensaje: `Sesion iniciada con el usuario ${req.session.username}`
            })
        }catch(error){
            return res.status(500).json({
                error: 'Error al iniciar sesion, por favor intente de nuevo.', 
                detalle: error.message 
            })
        }

    }

    static async loginControlGet(req, res){
        console.log(req.session)
        console.log(req.body)
        if(iSessionWrapper.verifySession(req)) return res.json({metodo: req.method, mensaje: `Bienvenido ${req.session.username}`})
        return res.json({mensaje: 'No hay una sesion iniciada'})
    }

}

