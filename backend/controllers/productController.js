import { ProductModel } from "../models/productModel.js";
import { imageValidation } from "../instances/iValidator/iValidator.js";

export class productController{

    static async productPostController(req, res){
        try {
            
        } catch (error) {
            
        }
    }
    
    static async addProductImageController(req, res){
        try {
            const {error} = imageValidation.validateTotal(req.body)
            if(error) return res.status(500).json({
                mensaje: 'Error en las validaciones',
                error: error.issues[0].message
            })
        } catch (error) {
            
        }
    }
}