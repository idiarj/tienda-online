import { ProductModel } from "../models/productModel.js";
import { productValidation } from "../instances/iValidator/iValidator.js";


export class productController{

    static async productPostController(req, res){
        console.log('entre')
        try {
            const {path} = req.file
            req.body.imagen = path
            console.log(req.body)
            const {error} = productValidation.validateTotal(req.body)
        } catch (error) {
            return res.status(500).json({
                error: 'Error interno del servidor',
                detalle: error.message
            })
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