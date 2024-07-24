import { imageController } from "../controllers/imageController.js";
import { Router } from "express";

export const imageRouter = Router()

imageRouter.post('/upload', imageController.uploadImage)
