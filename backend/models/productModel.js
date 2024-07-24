import { pgFrameworks } from "../instances/iPgManager/iPgManager.js";

export class ProductModel{

    static async createProduct({nombre_producto, precio, id_deporte, id_marca, fecha_creacion}){
        
    }

    static async addImage({name, data}){
        try {
            console.log(`${name}, ${data}`)
            const key = 'insert_image'
            const params = [name, data]
            const resultSet = await pgFrameworks.exeQuery({
                key,
                params
            })
            return { success: true, resultSet }
        } catch (error) {
            return { success: false, error: error.message}
        }
    }
    
}