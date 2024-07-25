import { pgFrameworks } from "../instances/iPgManager/iPgManager.js";

export class ProductModel{

    static async createProduct({nombre_producto, precio, id_deporte, id_marca, data}){
        try {
            const key = 'insert_producto'
            const params = [nombre_producto, id_marca, precio, id_deporte, data]
            const resultSet = await pgFrameworks.exeQuery({
                key,
                params
            })
            return {success: true,  resultSet}          
        } catch (error) {
            return {success: false, error: error.message}
        }
    }
    
}