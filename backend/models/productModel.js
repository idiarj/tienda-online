import { pgFrameworks } from "../instances/iPgManager/iPgManager.js";
import fs from 'fs'
export class ProductModel{

    static async createProduct({nombre_producto, precio, id_deporte, id_marca, imagen}){
        try {
            const key = 'insert_producto'
            const data = await fs.promises.readFile(imagen)
            const params = [nombre_producto, id_marca, precio, id_deporte, data]
            console.log(params)
            const resultSet = await pgFrameworks.exeQuery({
                key,
                params
            })
            return {success: true,  resultSet}          
        } catch (error) {
            return {success: false, error: error.message}
        }
    }

    static async getAllProducts(){
        try
    }
    
}