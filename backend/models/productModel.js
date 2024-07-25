import { pgFrameworks } from "../instances/iPgManager/iPgManager.js";
import fs from 'fs'
export class ProductModel{

    static async createProduct({nombre_producto, cantidad, precio, id_deporte, id_marca, imagen}){
        try {
            const key = 'insert_producto'
            const data = await fs.promises.readFile(imagen)
            const params = [nombre_producto, cantidad, id_marca, precio, id_deporte, data]
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

    static async getAllProducts({userId = ''}){
        try{
            const key = userId !== '' ? 'getAllProductsLoged' : 'getAllProductsNotLoged'
            const params = userId !== '' ? [userId] : []
            const resultSet = await pgFrameworks.exeQuery({key, params})
            return {success: true, resultSet}
        }catch(error){
            return {success: false, error: error.message}
        }
    }

    static async deleteProduct({productId, userId}){
        const client = await pgFrameworks.beginTransaction()
        try {
            const key = 'deleteProduct'
            const params = [productId]
            const [{id_usuario, nom_producto}] = await pgFrameworks.exeQuery({
                key,
                params,
                client
            })
            if(id_usuario != userId){
                await pgFrameworks.rollbackTransaction(client)
                return {success: false, error: 'No puedes borrar este producto ya que no es tuyo.'}
            }
            await pgFrameworks.commitTransaction(client)
            return {success: true, mensaje: `Producto ${nom_producto} eliminado con exito.`}
        } catch (error) {
            return {success: false, mensaje: `Error al eliminar el producto con id ${productId}`, error: error.message}
        }
    }
}