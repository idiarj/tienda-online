import { pgFrameworks } from "../instances/iPgManager/iPgManger.js";
import { CryptManager } from "../sub-sistemas/security/CryptManager.js";

export class userModel{



    static async getAllUsers(){
        try{
        const result = await pgFrameworks.exeQuery({key: 'select'})
        return result
        }catch(error){
            return error
        }
    }

    static async getUser({username}){
        try{
            console.log(username)
            const user = await pgFrameworks.exeQuery({key: 'getUser', params: [username]})
            return user
        }catch(error){
            return {error}
        }
    }



    /**
     * Metodo estatico y asincrono para verificar un usuario existe en la base de datos.
     * @param {String} param.user - Usuario a verificar.
     * @returns {Promise<String>} - Devuelve el usuario si existe, si no devuelve undefined.
     */
    static async verifyUser({ user }){
        console.log('------VERIFY USER-------')
        try {

            const result = await pgFrameworks.exeQuery({key: 'verifyUser', params: [user]})
            // console.log(result)

            if(result && result.length > 0){

                const [ {username} ] = result
                console.log(username)
                return username

            }else{
                console.log('usuario no valido')
                return false
                
            }
        } catch (error) {
            return {error}
        }
    }

    static async verifyPassword({username, password_user}){
        console.log('------VERIFY PASSWORD-------')
        try{
            console.log(password_user)
            const result = await pgFrameworks.exeQuery({key: 'verifyPassword', params: [username]})
            // console.log(result)

            if(result && result.length > 0){
                const [ {password} ] = result
                return await CryptManager.compareData({hashedData : password, toCompare: password_user})
            }else{
                return false
            }
        }catch(error){
            console.log(error)
            return {error}
        }
    }

    static async getUsernameId({user}){
        try{
            const key = 'getUserId'
            const params = [user]
            const [{id_usuario}] = await pgFrameworks.exeQuery({key, params})
            return id_usuario
        }catch(error){
            return {error}
        }
    }

    static async getPersonId({id}){
        try{
            const key = 'getUserId'
            const params = [user]
            const [{id_usuario}] = await pgFrameworks.exeQuery({key, params})
            return id_usuario
        }catch(error){
            return {error}
        }
    }

    


    /**
     * Registra un nuevo usuario en la base de datos. Este método asume que el objeto proporcionado
     * contiene toda la información necesaria para crear un nuevo registro de usuario, incluyendo
     * nombre, apellido, nombre de usuario, correo electrónico y contraseña. La contraseña se cifrará
     * antes de almacenarse en la base de datos.
     *
     * @param {Object} obj - Objeto con los datos del usuario a registrar.
     * @param {string} obj.nombre - Nombre del usuario.
     * @param {string} obj.apellido - Apellido del usuario.
     * @param {string} obj.username - Nombre de usuario, debe ser único.
     * @param {string} obj.correo - Correo electrónico del usuario.
     * @param {string} obj.password - Contraseña del usuario.
     * @returns {Promise<Object>} - Promesa que resuelve a un objeto. Si el registro es exitoso,
     *                               el objeto tendrá una propiedad `success` con valor `true` y
     *                               un mensaje `message` indicando el éxito de la operación.
     *                               En caso de error, el objeto tendrá una propiedad `success` con
     *                               valor `false` y detalles del error en `message` y `error`.
     */
    static async registerUser({nombre, apellido, cedula, username, correo, password}){ 

        const hashedPassword = await CryptManager.encriptarData({data: password});
        const client = await pgFrameworks.beginTransaction()



        try {
            console.log('entre en el try de user model registeruser')
            console.log(`insertando la persona ${nombre} ${apellido}`);
            const [{
                id_persona
            }] = await pgFrameworks.exeQuery({key: 'insert_persona', params: [nombre, apellido, cedula], client});
            console.log(`insertando el usuario ${username} ${correo} ${id_persona}`);
            await pgFrameworks.exeQuery({key: 'insert_username', params:[username, correo, hashedPassword, id_persona], client});

            await pgFrameworks.commitTransaction(client)
            return { success: true, message: "Usuario registrado con éxito" };
        } catch (error) {
            await pgFrameworks.rollbackTransaction(client)
            console.log('error al insertar el usuario:', error);
            client.release();
            return { success: false, message: "Error al registrar el usuario", error };
        }
    }
}