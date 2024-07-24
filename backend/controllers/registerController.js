import { registerValidation } from "../instances/iValidator/iValidator.js";
import { userModel } from "../models/userModel.js";


export class registerController{

    static async registerControlPost(req, res){
        try{
            console.log(req.body)

            const { error } = await registerValidation.validateTotal(req.body);
            
            if(error) return res.status(400).json({
                error: 'Error en la validación de los datos',
                detalle: error.issues[0].message
            });

            const {nombre, apellido, username, correo, password} = req.body;

            const usuario = await userModel.verifyUser({username});
            if(usuario.success) return res.status(400).json({error: 'Este nombre de usuario ya existe.'});

            const email = await userModel.verifyEmail({correo});
            if(email.success) return res.status(400).json({error: 'Este correo ya está registrado.'});

            const newUser = await userModel.registerUser({
                nombre, 
                apellido, 
                username, 
                correo, 
                password
                });
            if(!newUser.success) return res.status(500).json({
                error: 'Error al registrar el usuario',
                detalle: newUser.error
            })

            return res.status(201).json({mensaje: 'Usuario registrado correctamente'});
            

        } catch (error) {
            return res.status(400).json({error: 'Error al registrar el usuario', detalle: error.message});
        }
    }
}