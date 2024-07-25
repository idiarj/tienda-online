import { productController } from "../controllers/productController.js";
import { Router } from "express";

export const productRouter = Router()
productRouter.post('/', productController.productPostController)
productRouter.get('/', productController.productControllerGetAll)
productRouter.delete('/:productId', productController.deleteProduct)