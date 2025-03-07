import { Router } from "express";
import { Controllers } from "../controllers/controllers.js";
import { Model } from "../models/sql.js";


export const createRouter= ({model})=>{

    const router = Router();
    
    const controllers = new Controllers({model : Model});

    router.post('/', controllers.login);

    router.patch('/',controllers.token);

    router.delete('/', controllers.logout);

    router.get('/trazabilidad',controllers.getAll);

    router.get('/morosos',controllers.getMorosos);

    router.get('/unidadesClientes/:id?', controllers.getunidadesclientes);

    router.post('/trazabilidad',controllers.postAll);
    
    router.post('/trazabilidad/descargar', controllers.postDes);

    return router;
}