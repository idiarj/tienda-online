import { registerValidation } from "../instances/iValidator/iValidator.js";
import { userModel } from "../models/userModel.js";


export class registerController{

    static async registerControlPost(req, res){


        const result = await registerValidation.validateTotal(req.body);

        if(result.error) {

            const [{message}] = result.error.issues
            return res.status(406).json({error: 'Datos incorrectos', error: message})

        }

        //String con el nombre de usuario en minuscula que el cliente ingreso.
        const username = result.data['username']
        const userFromModelResult = await userModel.verifyUser({user: username});
        //console.log(`usuario del userModel ${userFromModelResult}`)
        //console.log(`usuario de resultData ${username}`)
        //console.log(`en lowerCase son iguales? ${userFromModelResult.toLowerCase()}, ${username.toLowerCase()}, ${userFromModelResult.toLowerCase() === username.toLowerCase()}`)
        //console.log((typeof userFromModelResult === 'string') && userFromModelResult.toLowerCase() === username.toLowerCase())

        if (userFromModelResult.error) {
            return res.status(400).json({error: 'Error al verificar el usuario', detalle: userFromModelResult.error});
        }

        if((typeof userFromModelResult === 'string') && userFromModelResult.toLowerCase() === username.toLowerCase()){
            return res.status(400).json({error: 'El nombre de usuario ya existe'})
        }


        try{
            console.log('entre en el trycatch del controller')
            const registerResult = await userModel.registerUser(result.data);
           
            if(registerResult && registerResult.success) {
                return res.json({mensaje: 'Usuario registrado exitosamente'});
            } else {
                return res.status(400).json({error: 'No se pudo registrar el usuario'});
            }
        } catch (error) {

            return res.status(400).json({error: 'Error al registrar el usuario', detalle: error.message});
        }
    }
}