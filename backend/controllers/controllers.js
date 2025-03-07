import { excel } from '../middleware/excel.js';
import { generateToken, validateToken } from '../auth/auth.js';

const confgCookie={httpOnly: true, sameSite:'lax', credential:true,}
const confCookie2={sameSite:'lax',credential:true}

export class Controllers{
  constructor({ model }){
    this.model = model;
  }

login = async (req,res) => {
  try {
    //console.log(req.body);
    const usuario = await this.model.getUser(req.body);
    //console.log("log usuario",usuario);
    if(usuario.error){return res.status(400).setHeader('Content-Type','application/json').json(usuario)};
    //console.log('paso')
    const token  = await generateToken(usuario[0]);
     console.log(token);
   

    if(!token)throw new Error("");
 
    let iniciales =  usuario[0].Login[0] + usuario[0].Login[1];
    console.log('iniciales',iniciales);
    return res.status(200).cookie('token', token , confgCookie ).cookie('usu',iniciales.toUpperCase(),confCookie2).json('ok');
      
  } catch (err) {
     console.log(err);
    return res.status(500).json({error:'Error de Servidor'});
  }
}

logout = async (req,res)=>{
  try {
    if(req.body.eliminar){
      res.status(200).cookie('token', '' , confgCookie).cookie('usu','',confCookie2).json('eliminado');
    }
  } catch (err) {
    return res.status(500).json({error:'Error de Servidor'});
  }
}  

token = async(req,res)=>{
  try {
     // VERIFICAR SI TIENE TOKEN
     console.log(req.cookies.token);
    if(req.cookies.token){
      const token = await validateToken(req.cookies.token);
      if(token){
        const user = await this.model.token(token.user);
        if(!user.error)return res.status(200).json('ok');
        return res.status(400).json({error:'Token Invalido'});  
      
      }else if(!token)throw new Error('');   

      }else if(!req.cookies.token)return res.status(400).json('no token');
    
  } catch (err) {
    //  console.log(err);
     return res.status(500).json({error:'Error de Servidor'});
  }
}

getAll= async (req,res)=>{
  // let saludo = 'hola'
  const items = await this.model.getAll();
  console.log(items);
  // console.log('controller');
  if(items.error){
    return res.status(400).json(items);
  }
  return res.json(items);
}

getMorosos= async (req,res)=>{
  // let saludo = 'hola'
  try{
  const items = await this.model.getMorosos();
  console.log(items);
  // console.log('controller');
  if(items.error){
    console.log(items.error)
    return res.status(400).json(items);
  }
  return res.json(items);
} catch (err) {
  console.error(err);
  return res.status(500).json({ error: 'Error en el servidor' });
}
}

getunidadesclientes= async (req,res)=>{
  // let saludo = 'hola'
  try{
    console.log("Parámetros recibidos en la URL:", req.params);
    const id = req.params.id;

    // Verificar si el ID es válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "FALTA EL ID" });
    }

    // Convertir a entero y realizar la consulta
    const parsedId = parseInt(id, 10);

    const items = await this.model.getunidadesclientes(parsedId);
    
    console.log(items);
    // console.log('controller');
    if(items.error){
      console.log(items.error)
      return res.status(400).json(items);
    }
    return res.json(items);
} catch (err) {
  console.error('error', err);
  return res.status(500).json({ error: 'Error en el servidor' });
}
}

postAll= async(req,res)=>{
  const consulta = req.body
  // console.log(consulta);
  const datos = await this.model.postAll(consulta);
  // console.log(datos);
  if(datos.error)return res.status(400).json(datos);
  // console.log('paso');
  return res.status(200).json(datos);

}

postDes = async(req,res)=>{
  const consulta = req.body
  // console.log(consul);
  const datos = await this.model.postAll(consulta);
// console.log(datos);

  if(datos.error)return res.status(400).setHeader('Content-Type','application/json').json(datos);
// console.log('paso')
  let respuesta = await  excel(datos);
    // console.log(respuesta);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Length', respuesta.length);
    res.send(respuesta);
}
}