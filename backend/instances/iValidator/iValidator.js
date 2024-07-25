import { Validation } from '../../sub-sistemas/security/Validation.js'
import { userLoginSchema } from "./schemas/loginSchema.js";
import { userRegisterSchema } from "./schemas/registerSchema.js";
import { productSchema } from './schemas/productSchema.js';


export const loginValidation = new Validation(userLoginSchema);
export const registerValidation = new Validation(userRegisterSchema); 
export const productValidation = new Validation(productSchema);
