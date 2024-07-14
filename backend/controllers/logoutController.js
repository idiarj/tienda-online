import { iSessionWrapper } from "../instances/iSessionManager/iSessionManager.js";

export class logoutController{

    static async logoutControlPost(req, res){
    try {
        if (!iSessionWrapper.verifySession(req)) {
            return res.json({ mensaje: 'No hay sesion activa' });
        }
        const result = await iSessionWrapper.closeSession(req);
        return res.json(result);
    } catch (err) {
        return res.json({ err });
    }
}
}