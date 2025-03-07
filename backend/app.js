import express , {json} from 'express';
import { createRouter } from './router/router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


export const createApp = ({model})=>{

    const app = express();
    app.use(cookieParser());
    app.use(json());
        //agregado para acceder desde cualquier IP
        app.use((req, res, next) => {
          const origin = req.headers.origin;
          if (origin) {
            res.setHeader('Access-Control-Allow-Origin', origin);
          }
          res.setHeader('Access-Control-Allow-Credentials', 'true');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
          res.setHeader('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
          res.setHeader('Access-Control-Expose-Headers', 'Content-Length,Content-Range,Authorization');
        
          if (req.method === 'OPTIONS') {
            res.sendStatus(204);
          } else {
            next();
          }
        });



      app.disable('x-powered-by');
      app.use('/fcdn', createRouter({model}));

      const PORT = process.env.PORT ?? 9000;


      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor escuchando en: http://0.0.0.0:${PORT}/fcdn`); // lo agrege para que funcione desde cualquier direccion
      });

}