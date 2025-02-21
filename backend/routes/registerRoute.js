import { Router } from 'express'
import { registerController } from '../controllers/registerController.js'

/**
 * @type {Router} - Enrutador para las peticiones POST y GET del endpoint /register.
 */
export const registerRouter = Router()

registerRouter.post('/', registerController.registerControlPost)