import { ProductModel } from "../models/productModel.js";
import { imageValidation } from "../instances/iValidator/iValidator.js";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { pgFrameworks } from "../instances/iPgManager/iPgManager.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export class productController{

    static async productPostController(req, res){
        console.log('entre')
        try {

        } catch (error) {

        }
    }

    static async productControllerGetAll(req, res){
        try {


        }catch(error){

        }
    }
    static async addProductImageController(req, res){
        try {
            console.log(`estoy recibiendo`, req.body)
            // const {error} = imageValidation.validateTotal(req.body)

            // if(error) return res.status(500).json({
            //     mensaje: 'Error en las validaciones',
            //     error: error.issues[0].message
            // })

            // const {name, data} = req.body
            // const imagen = await ProductModel.addImage({
            //     name,
            //     data
            // })

            // if(!imagen.success) return res.status(500).json({
            //     mensaje: 'Error al intentar subir la imagen.',
            //     error: imagen.error
            // })

            // return res.status(200).json({
            //     mensaje: 'Imagen subida con exito.',
            //     data: imagen.resultSet
            // })
        } catch (error) {
            return res.status(500).json({
                mensaje: 'Error interno del servidor',
                error: error.message
            })
        }
    }
}