import { pgFrameworks } from "../instances/iPgManager/iPgManager.js";
import { CryptManager } from "../sub-sistemas/security/CryptManager.js";

export class userModel{

    static async getAllUsers(){
        try{
        const resultSet = await pgFrameworks.exeQuery({key: 'select'})
        return resultSet
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
     * Verifica si un usuario existe en la base de datos.
     * 
     * @param {String} param.user - Usuario a verificar.
     * @returns {Promise<Object>} - Devuelve devuelve un objeto con la propiedad success en true y el resultado de la consulta en resultSet si el usuario existe
     *                              sino, devuelve un objeto con success en false y un mensaje de error.
     */
    static async verifyUser({ username }){
        console.log('------VERIFY USER-------')
        try {
            const key = 'verifyUser'
            const params = [username]
            const resultSet = await pgFrameworks.exeQuery({key, params})

            if(resultSet && resultSet.length > 0){

                return {success: true, resultSet}

            }else{

                return {success: false, error: 'Este nombre de usuario no existe.'}

            }
        } catch (error) {
            return {success: false, error: error.message}
        }
    }


    /**
     * Verifica si la contraseña proporcionada coincide con la contraseña del usuario en la base de datos.
     * 
     * @param {Object} params - El objeto de parámetros.
     * @param {string} params.username - El nombre de usuario del usuario cuya contraseña se va a verificar.
     * @param {string} params.password - La contraseña proporcionada por el usuario para verificar.
     * @returns {Promise<Object>} Una promesa que se resuelve en un objeto que contiene una propiedad de éxito que indica el resultado de la verificación de la contraseña.
     */
    static async verifyPassword({username, password}){
        console.log('------VERIFY PASSWORD-------')
        try{
            console.log(password)
            const key = 'verifyPassword'
            const params = [username]
            const resultSet = await pgFrameworks.exeQuery({key, params})
            // console.log(resultSet)

            if(resultSet && resultSet.length > 0){
                const [ {contraseña} ] = resultSet
                const success = await CryptManager.compareData({hashedData : contraseña, toCompare: password})
                if(!success) return {success, error: 'Contraseña invalida.'}
                
                return {success, mensaje: 'Contraseña valida'}
            }
        }catch(error){
            console.log(error)
            return {success: false, error}
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
    static async registerUser({nombre, apellido, username, correo, password}){ 

        const hashedPassword = await CryptManager.encriptarData({data: password});
        const client = await pgFrameworks.beginTransaction()



        try {
            console.log('entre en el try de user model registeruser')
            console.log(`insertando la persona ${nombre} ${apellido}`);
            const [{
                id_persona
            }] = await pgFrameworks.exeQuery({key: 'insert_persona', params: [nombre, apellido], client});
            console.log(`insertando el usuario ${username} ${correo} ${id_persona}`);
            await pgFrameworks.exeQuery({key: 'insert_username', params:[username, correo, hashedPassword, id_persona], client});

            await pgFrameworks.commitTransaction(client)
            return { success: true, message: "Usuario registrado con éxito" };
        } catch (error) {
            await pgFrameworks.rollbackTransaction(client)
            console.log('error al insertar el usuario:', error);
            // client.release();
            return { success: false, message: "Error al registrar el usuario", error };
        }
    }
}