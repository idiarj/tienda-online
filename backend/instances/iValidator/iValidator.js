import { Validation } from '../../sub-sistemas/security/Validation.js'
import { userLoginSchema } from "./schemas/loginSchema.js";
import { userRegisterSchema } from "./schemas/registerSchema.js";
import { productSchema } from './schemas/productSchema.js';
import { imageFileSchema } from './schemas/imageSchema.js';

export const loginValidation = new Validation(userLoginSchema);
export const registerValidation = new Validation(userRegisterSchema); 
export const productValidation = new Validation(productSchema);
export const imageValidation = new Validation(imageFileSchema);