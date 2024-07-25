import { ProductModel } from "../models/productModel.js";
import { productValidation } from "../instances/iValidator/iValidator.js";
import { iSessionWrapper } from "../instances/iSessionManager/iSessionManager.js";


export class productController{

    static async productPostController(req, res){
        console.log('entre')
        try {
            // console.log(req.body)
            if(!iSessionWrapper.verifySession(req, res)) return res.status(401).json({
                error: 'Necesitas iniciar sesion para vender un producto.'
            })
            if(req.file){
                const {path} = req.file
                req.body.imagen = path
            }
            const {userid: id_usuario} = req.session
            console.log(id_usuario)
            console.log(req.body)

            const {nombre_producto, cantidad, precio, id_marca, id_deporte, imagen, disponibilidad, descripcion} = req.body 
            const {error} = productValidation.validateTotal(req.body)
            if(error) return res.status(400).json({
                mensaje: 'Error en las validaciones',
                error: error.issues[0].message
            })
            const producto = await ProductModel.createProduct({nombre_producto, cantidad, precio, id_marca, id_deporte, imagen, disponibilidad, descripcion, id_usuario})
            if(!producto.success) return res.status(400).json({
                mensaje: 'Error al crear el producto',
                error: producto.error
            })
            return res.status(200).json({
                mensaje: 'Producto creado con exito.',
                producto: producto.resultSet
            })
        } catch (error) {
            return res.status(500).json({
                error: 'Error interno del servidor',
                detalle: error.message
            })
        }
    }

    static async productControllerGetAll(req, res){
        try {
            const {userid} = req.session
            const productos = await ProductModel.getAllProducts({userId: userid})
            if(!productos.success) return res.status(400).json({
                error: productos.error
            })
            return res.status(200).json({
                productos: productos.resultSet
            })
        }catch(error){
            return res.status(500).json({
                error: error.message
            })
        }
    }
    
    static async deleteProduct(req, res){
        try {
            const {userid} = req.session
            const {productId} = req.params
            const deletedProduct = await ProductModel.deleteProduct({
                userId: userid,
                productId
            })

            if(!deletedProduct.success) return res.status(400).json({
                error: deletedProduct.error
            })

            return res.status(200).json({
                mensaje: deletedProduct.mensaje,
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    static async getUserProducts(req, res){
        try {
            const {userid} = req.session
            const productos = await ProductModel.getUserProducts({userId: userid})
            if(!productos.success) return res.status(400).json({
                error: productos.error
            })
            return res.status(200).json({
                products: productos.resultSet
            })
        } catch (error) {

        }
    }

    static async patchProduct(req, res){
        try {
            console.log(req.body)
            const {error} = productValidation.validateUpate(req.body)
            if(error) return res.status(400).json({
                mensaje: 'Error en las validaciones',
                error: error.issues[0].message
            })
            const {productId} = req.params
            const {nombre_producto, cantidad, precio, id_marca, id_deporte, imagen, disponibilidad, descripcion} = req.body 
            const editedProduct = await ProductModel.editProduct({productId, nombre_producto, cantidad, precio, id_marca, id_deporte, imagen, disponibilidad, descripcion})
            if(!editedProduct.success) return res.status(400).json({
                error: editedProduct.error
            }) 
            return res.status(200).json({
                product: editedProduct.resultSet
            })
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
}