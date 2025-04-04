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
    router.post('/trazabilidad/updBD',controllers.postUpdCliente);
    
    router.post('/trazabilidad/descargar', controllers.postDes);

//agregado para traer las caracteristcas del activo Peter
    router.get('/caractactivos/:id?', controllers.getcaractactivos);
    router.get('/unidad/:id?',controllers.getunidad);
    router.get('/datoscliente/:id?', controllers.getdatoscliente);
    return router;
}