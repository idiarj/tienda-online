import { imageModel } from "../models/imageModel.js";

export class imageController{
    static async uploadImage(req, res){
        try {
            console.log(req.file)
            console.log(req.body)
            console.log(req)
            return res.status(200)
        } catch (error) {
            return res.status(500).json({
                mensaje: 'Error interno en el servidor.',
                error: error.message
            })
        }
    }
}