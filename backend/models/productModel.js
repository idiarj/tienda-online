import { pgFrameworks } from "../instances/iPgManager/iPgManager.js";
import fs from 'fs'
export class ProductModel{

    static async createProduct({nombre_producto, cantidad, precio, id_deporte, id_marca, imagen, disponibilidad, descripcion, id_usuario}){
        try {
            const key = 'insert_producto'
            let data;
            if(imagen) {
                data = await fs.promises.readFile(imagen)
            }
            const params = [nombre_producto, cantidad, id_marca, precio, id_deporte, data, disponibilidad, descripcion, id_usuario]
            console.log(params)
            console.log(params.length)
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

    static async getUserProducts({userId}){
        try {
            const key = 'getUserProducts'
            const params = [userId]
            const resultSet = await pgFrameworks.exeQuery({
                key,
                params
            })
            return {success: true, resultSet}
        } catch (error) {
            return {success: false, error: error.message}
        }
    }

    static async deleteProduct({productId, userId}){
        const client = await pgFrameworks.beginTransaction()
        try {
            const key = 'deleteProduct'
            const params = [productId]
            const [{nom_producto, id_usuario}] = await pgFrameworks.exeQuery({
                key,
                params,
                client
            })
            // console.log(resultSet)
            if(id_usuario != userId){
                await pgFrameworks.rollbackTransaction(client)
                return {success: false, error: 'No puedes borrar este producto ya que no es tuyo.'}
            }
            await pgFrameworks.commitTransaction(client)
            return {success: true, mensaje: `Producto ${nom_producto} eliminado con exito.`}
        } catch (error) {
            await pgFrameworks.rollbackTransaction(client)
            return {success: false, mensaje: `Error al eliminar el producto con id ${productId}`, error: error.message}
        }
    }

    static async editProduct({productId, nombre_producto, cantidad, precio, id_deporte, id_marca, imagen, disponibilidad, descripcion}){
        try {
            const key = 'updateProduct'
            const params = [nombre_producto, precio, descripcion, id_marca, id_deporte, cantidad, disponibilidad, productId]
            const resultSet = await pgFrameworks.exeQuery({
                key,
                params
            })
            return {success: true, resultSet}
        } catch (error) {
            return {succes: false, error: error.message}
        }
    }

    static async filterProduct({nombre_producto, cantidadMin, cantidadMax, precioMin, precioMax, id_deporte, id_marca, imagen, disponibilidad, descripcion}){
        try {
            let query = "SELECT * FROM producto WHERE 1=1";
            const params = [];
            let paramIndex = 1;

            if (nombre_producto) {
                query += ` AND nom_producto ILIKE $${paramIndex++}`;
                params.push(`%${nombre_producto}%`);
            }
            if (id_deporte) {
                query += ` AND id_deporte = $${paramIndex++}`;
                params.push(id_deporte);
            }
            if (id_marca) {
                query += ` AND id_marca = $${paramIndex++}`;
                params.push(id_marca);
            }
            if (precioMin) {
                query += ` AND precio >= $${paramIndex++}`;
                params.push(precioMin);
            }
            if (precioMax) {
                query += ` AND precio <= $${paramIndex++}`;
                params.push(precioMax);
            }

            if( precioMin > precioMax ){
                return {success: false, error: 'El precio minimo no puede ser mayor al precio maximo'}
            }

            if(cantidadMin){
                query += ` AND precio <= $${paramIndex++}`;
                params.push(cantidadMin);
            }
            if(cantidadMax){
                query += ` AND precio <= $${paramIndex++}`;
                params.push(cantidadMax);
            }

            if( cantidadMin > cantidadMax ){
                return {success: false, error: 'La cantidad minima no puede ser mayor a la cantidad maxima'}
            }

            const resultSet = await pgFrameworks.exeQuery({ query, params });
            return { success: true, resultSet };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}