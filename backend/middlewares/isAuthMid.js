import { iSessionWrapper } from "../instances/iSessionManager/iSessionManager.js";

export const isAuthMiddleware = (req, res, next) => {
    // console.log(req.session)
    // console.log('body')
    // console.log(req.body)
    // console.log(iSessionWrapper.verifySession)
    if(iSessionWrapper.verifySession(req, res)) {
        console.log('hay sesion')
        next();
    } else {
        console.log('estoy en el middleware y no estas autorizado');
        res.status(401).json({error: 'No autorizado.'}); 
    }
}