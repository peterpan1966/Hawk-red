import sql from "mssql";
import 'dotenv/config.js'
import { obtenerToken, obtenerActivosCliente } from '../../frontend/token-api/token.js';


const defaultConfig = {
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  server: process.env.SERV_DB,
  database:process.env.DATA_DB,
  options:{
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  }
}


const connectionStrring = process.env.DATABASE_url ?? defaultConfig;

 const consulta =  await sql.connect(connectionStrring);

export class Model{

  static async getUser(consu) {
    //console.log(consu);
    try {
      if(!consu.usuario || ! consu.password)throw new Error("FALTAN CAMPOS");
      const usuario =await consulta.request().query (`select  TOP 1 Login, Password, Perfil_PerfilID
        from [181.10.162.155].REDGPS.dbo.PerfilUsuario
        inner join [181.10.162.155].REDGPS.dbo.usuario  on usuarioid = Usuario_UsuarioId
        where Login = '${consu.usuario}' and Password = '${consu.password}' and Perfil_PerfilId = 3 order by Perfil_PerfilID asc;`);

        console.log("usuaior y pw",consu.usuario,consu.password,usuario,'fin');  
    
               /*(`SELECT top 1 usu_nombre_usuario, usu_clave, peu_perfil_id FROM perfil_usuario
    inner join usuario on peu_usuario_id = usu_id 
    where usu_nombre_usuario = '${consu.usuario}' and usu_clave = '${consu.password}'  and peu_perfil_id in (15 , 14) order by peu_perfil_id asc ;`);*/
    if (usuario.recordset.length === 0) throw new Error("USUARIO INVALIDO");
    return usuario.recordset;

    } catch (err) {
      let code = err.message
      if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
      return {error:code};
    }
  }


  static async token(consu) {
    try {
       console.log('ANTESDETOKEN',consu);
      //if(!consu.usu_nombre_usuario || ! consu.usu_clave)throw new Error("");
      if(!consu.Login || ! consu.Password)throw new Error("");
      const usuario =await consulta.request().query (`select  TOP 1 Login, Password, Perfil_PerfilID
        from [181.10.162.155].REDGPS.dbo.PerfilUsuario  
        inner join [181.10.162.155].REDGPS.dbo.usuario  on usuarioid = Usuario_UsuarioId 
        where Login = '${consu.Login}' and Password = '${consu.Password}' and Perfil_PerfilId = 3 order by Perfil_PerfilID asc;`);
        console.log("upw y susuario ",consu.Login,consu.Password,usuario);
      
      /*(`SELECT top 1 usu_nombre_usuario, usu_clave, peu_perfil_id FROM perfil_usuario
    inner join usuario on peu_usuario_id = usu_id 
    where usu_nombre_usuario = '${consu.usu_nombre_usuario}' and usu_clave = '${consu.usu_clave}'  and peu_perfil_id in (15 , 14) order by peu_perfil_id asc ;`);*/
    if (usuario.recordset.length === 0) throw new Error("");
    return usuario.recordset;
    } catch (err) {
       //console.log("pedro",err)
       return {error:'Token Invalido'};
    }
  }

   static async getAll(){
    let param ={}
    try {
    //const ser = await consulta.request().query('SELECT ser_nombre, ser_id FROM servicio WHERE ser_deshabilitado=0 ORDER BY ser_nombre ASC');
   // const ent = await consulta.request().query('SELECT ent_id, ent_nombre FROM entidad WHERE ent_deshabilitado=0 ORDER BY ent_nombre ASC');
    //const cen = await consulta.request().query('SELECT cen_id, cen_nombre FROM centro WHERE cen_deshabilitado=0 ORDER BY cen_nombre ASC');
     const ser = await consulta.request().query('SELECT top 5 Nombre from  [181.10.162.155].TICKETS.dbo.Tecnico ORDER BY Nombre ASC');
    const ent = await consulta.request().query('SELECT ClienteId as ent_id, RazonSocial as ent_nombre, Red_id as ent_redid from  [181.10.162.155].REDGPS.dbo.Cliente  ORDER BY ClienteId ASC');
    const cen = await consulta.request().query('SELECT TecnicoId as cen_id, Nombre as cen_nombre from [181.10.162.155].REDGPS.dbo.Tecnico ORDER BY Nombre ASC');
    // Pedro agrego consulta con los campos que me interesa traigo solos que tienen unidades activas
     const client = await consulta.request().query(`select cl.ClienteId, cl.RazonSocial, cl.CUIT, cl.DeudaTotal, cl.EsMoroso,cl.Red_ID
		from [181.10.162.155].REDGPS.dbo.cliente cl
		inner join [181.10.162.155].Hawk.dbo.clientes clh on clh.Idcliente = IdExterno
		where  IdEstado = 1 
    AND cl.ClienteId IN (SELECT DISTINCT ClienteID FROM [181.10.162.155].REDGPS.dbo.Dominio WHERE ClienteID IS NOT NULL and Estado = 1 ) 
ORDER BY cl.RazonSocial ASC`);

    //query(`select ClienteId, RazonSOcial,CUIT, DeudaTotal, EsMoroso from [181.10.162.155].TICKETS.dbo.cliente where  fechaactualizacionestado >'20230101' order by fechaactualizacionestado desc`);
    //console.log(ser.recordset)
    param.ser=ser.recordset;
    param.ent=ent.recordset;
    param.cen=cen.recordset;
    //Pedro
    param.client=client.recordset;
    

    return param;
    } catch (err) {
      let code = ''
      if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
      console.log('falat campos');
      return {error:code};
    }
  } 
// agregado para traer dominioID, patente, modelo, color etc de una unidad
//presiono el boton de cargar y hago un Select DominioID from [181.10.162.155].REDGPS.dbo.Dominio where Patente = '$$$$$', con este ID reemplazo en la consulta 

static async getcaractactivos(id){
  let param ={}
  try {
    if (!id) return { error: "FALTA EL ID" };
    console.log('id recibido: ', id)
  
   const caract = await consulta.request().query(`Select dm.DominioID, dm.Patente, mar.Nombre ,md.Nombre , cl.Nombre, cli.Red_id, cli.razonSocial as cliente, dm.ClienteID
from [181.10.162.155].REDGPS.dbo.Dominio dm
left join [181.10.162.155].REDGPS.dbo.Marca mar on mar.MarcaID = dm.MarcaID
left join [181.10.162.155].REDGPS.dbo.Modelo md on md.ModeloID = dm.ModeloID
left join [181.10.162.155].REDGPS.dbo.color cl on cl.ColorID = dm.ColorID
inner join [181.10.162.155].REDGPS.dbo.cliente cli on cli.ClienteID = dm.ClienteID
where DominioID = ${id} `);  //  18728 aqui hay que cambiar por el DomnioID o por la Patente

  console.log('Datos obtenidos del movil :', caract.recordset);
  
  
  param.caract=caract.recordset;
  if (caract.recordset.length === 0) {
    return res.status(201).json({ message: 'No se encontro caracteristicas' });
  }

  return param;
  } catch (err) {
    let code = ''
    if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
    console.log('faltan campos');
    return {error:code};
  }
} 


   


// fin de agregado domino etc 

// hacer el update en cliente del RED_ID

 static async postUpdCliente(id_cliente, clienteID1) {
  try {
    const update = await consulta
      .request()
      .input('id_cliente', id_cliente)
      .input('clienteID1', clienteID1)
      .query(
        'UPDATE [181.10.162.155].REDGPS.dbo.cliente SET Red_ID = @id_cliente WHERE ClienteId = @clienteID1'
      );

    if (update.rowsAffected && update.rowsAffected[0] > 0) {
      return id_cliente;  //{ message: 'Una fila actualizada' };
    } else {
      return  null; //{ message: 'No se encontró ninguna fila para actualizar' };
    }
  } catch (err) {
    console.error('Error al actualizar cliente:', err);
    let errorMessage = err.message;
    if (err.code === 'EREQUEST') {
      errorMessage = 'Error de solicitud SQL';
    }
    return { error: errorMessage };
  }
}
 


/* //update original
 static async postUpdCliente(id_cliente,clienteID1){

  try {
      const update = await consulta.request().query(`update  [181.10.162.155].REDGPS.dbo.cliente set Red_ID =${id_cliente}  where ClienteId = ${clienteID1} `);
      if (result.rowsAffected && result.rowsAffected[0] > 0) {
        return { message: "Una fila actualizada" };
    } else {
        return { message: "No se encontró ninguna fila para actualizar" };
    }
} catch (err) {
    console.error("Error al actualizar cliente:", err);
    let errorMessage = err.message;
    if (err.code === 'EREQUEST') {
        errorMessage = "Error de solicitud SQL";
    }
    return { error: errorMessage };
}
} 
// hasta aqui el update */


  static async postAll(consu){

    try {
        const trazabilidad = await consulta.request().query(`EXEC dbo.SP_TRAZABILIDAD_FCDN '${consu.desde}','${consu.hasta}','${consu.entidad}','${consu.servicio}','${consu.centro}'`);

      const fmanual = await consulta.request().query(`EXEC dbo.SP_TRAZABILIDAD_FCDN_MANUAL_1 '${consu.desde}','${consu.hasta}','${consu.entidad}','${consu.servicio}','${consu.centro}'`);

      const frecepcion = await consulta.request().query(`EXEC dbo.SP_TRAZABILIDAD_FCDN_CAJA '${consu.desde}','${consu.hasta}','${consu.entidad}','${consu.servicio}','${consu.centro}'`);

      let traza = trazabilidad.recordset.concat(...fmanual.recordset, ...frecepcion.recordset);


        if(traza.length === 0)throw new Error('NO EN CONTRADA')
        return traza;
      
    } catch (err) {
      console.log(err)
      let code = err.message
      if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
      return {error:code};
    }
  } 

 
  static async getMorosos(){
    let param ={}
    try {

      console.log('Conectando a la base de datos...');

    const cliente = await consulta.request().query(`select cl.ClienteId, cl.RazonSOcial, cl.CUIT, cl.DeudaTotal,cl.EsMoroso
      from [181.10.162.155].REDGPS.dbo.cliente cl
      inner join [181.10.162.155].Hawk.dbo.clientes clh on clh.Idcliente = IdExterno
      where  IdEstado = 1   and cl.esmoroso = 1 and cl.DeudaTotal > 100 order by RazonSocial asc`);

    console.log('Datos obtenidos de la base de datos:', cliente.recordset);

    param.cliente=cliente.recordset;

    if (cliente.recordset.length === 0) {
      return res.status(201).json({ message: 'No se encontraron morosos' });
    }

    return param
    
    } catch (err) {
      console.log('Error en getMorosos:', err);
      let code = ''
      if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
      return {error:code};
    }
  }

  //agregue la busqueda de gps por unidad 
  static async getunidad(id){
    let param ={}
    

    try {
  
      if (!id) return { error: "FALTA EL ID" };
      console.log('id recibido: ', id)
  
  
      const movil = await consulta.request().query(`Select do.patente,tec.Descripcion, 
    eq.numeroSerie,ch.NroLinea, eq.tecnologiaId, Tec.IdMarca,Tec.IdModelo,do.DominioId,do.IdRedGPS, cl.razonSocial
    from  [181.10.162.155].REDGPS.dbo.dominio do
    inner join  [181.10.162.155].REDGPS.dbo.equipo eq on eq.DominioID = do.DominioID
    inner join  [181.10.162.155].REDGPS.dbo.cliente cl on cl.ClienteID = do.ClienteID
    inner join  [181.10.162.155].REDGPS.dbo.chip ch on ch.EquipoID = eq.EquipoID
	inner join  [181.10.162.155].REDGPS.dbo.tecnologiarelacion tec on tec.idTecnologiaPronto  = eq.TecnologiaId
 where do.DominioId = ${id}  and do.Estado = 1`);
  
  
   console.log('Datos obtenidos del movil :', movil.recordset);


    param.movil=movil.recordset;

    if (movil.recordset.length === 0) {
      return res.status(201).json({ message: 'No se encontro gps' });
    }

    return param
    
    } catch (err) {
      console.log('Error en getUnidad:', err);
      let code = ''
      if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
      return {error:code};
    }
  }

    
  //Martes 25 
static async getdatoscliente(id){
  let param ={}
  try {
    if (!id) return { error: "FALTA EL ID" };
    console.log('id recibido: ', id)
  
   const clientedata = await consulta.request().query(`Select ClienteID, CUIT, RazonSocial, Direccion,Email , Red_ID
from [181.10.162.155].REDGPS.dbo.cliente 
where ClienteID = ${id} `);  //  18728 aqui hay que cambiar por el DomnioID o por la Patente

  console.log('Datos obtenidos del cliente :', clientedata.recordset);
  
  
  param.clientedata=clientedata.recordset;
  if (clientedata.recordset.length === 0) {
    return res.status(201).json({ message: 'No se encontro clientedata' });
  }

  return param;
  } catch (err) {
    let code = ''
    if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
    console.log('faltan campos');
    return {error:code};
  }
}


  // hasta aqui Peter martes 

static async getunidadesclientes(id){
  let param ={}
  

  try {

    if (!id) return { error: "FALTA EL ID" };
    console.log('id recibido: ', id)

   /*  const moviles = await consulta.request().query(`Select do.patente,gr.Descripcion, 
    eq.numeroSerie,ch.NroLinea, eq.tecnologiaId, do.estado
    from  [181.10.162.155].REDGPS.dbo.dominio do
    inner join  [181.10.162.155].REDGPS.dbo.equipo eq on eq.DominioID = do.DominioID
    inner join  [181.10.162.155].REDGPS.dbo.cliente cl on cl.ClienteID = do.ClienteID
    inner join  [181.10.162.155].REDGPS.dbo.chip ch on ch.EquipoID = eq.EquipoID
    inner join  [181.10.162.155].[Hawk].[dbo].[Articulos] art on art.idArticulo = eq.EquipoID
    inner join  [181.10.162.155].[Hawk].[dbo].[grados] gr on gr.idgrado = eq.TecnologiaID
    where do.ClienteID = '${parseInt(id)}' and do.Estado = 1`); */

    const moviles = await consulta.request().query(`SELECT do.patente,tec.Descripcion, 
    eq.numeroSerie,ch.NroLinea, eq.tecnologiaId, Tec.IdMarca,Tec.IdModelo,do.DominioID,do.Estado,cl.Red_ID
    from  [181.10.162.155].REDGPS.dbo.dominio do
    inner join  [181.10.162.155].REDGPS.dbo.equipo eq on eq.DominioID = do.DominioID
    inner join  [181.10.162.155].REDGPS.dbo.cliente cl on cl.ClienteID = do.ClienteID
    inner join  [181.10.162.155].REDGPS.dbo.chip ch on ch.EquipoID = eq.EquipoID
	  inner join  [181.10.162.155].REDGPS.dbo.tecnologiarelacion tec on tec.idTecnologiaPronto  = eq.TecnologiaId
      where do.ClienteID = '${parseInt(id)}' and do.Estado = 1`);



    
    console.log('Datos obtenidos de la base de datos:', moviles.recordset);
    
    const redId = await consulta.request().query(`select Red_Id from [181.10.162.155].REDGPS.dbo.cliente where ClienteId = ${parseInt(id)} `);
    console.log('red id: ', redId)
    const username = 'afardella@hawkgps.com';
    const password = 'Hawk1234';
    const apikey = '4cdb944f71ad386b8c46d806bb625c85';

    const token = await obtenerToken(username, password, apikey);
    if (token) {
      const activos = await obtenerActivosCliente(token, apikey, parseInt(redId.recordset[0].Red_Id));
      console.log('Respuesta de la API para activos:', activos);
      if (activos && activos.data) {
              console.log('Activos del cliente:', activos.data);
              param.activos=activos.data;
      } else {
        console.error('No se encontraron activos para el cliente:', '85843');
        return [];
      }
    } else {
      return { error: 'No se pudo obtener el token de la API' };
    }
    

    param.moviles=moviles.recordset;

    if (moviles.recordset.length === 0) {
      return res.status(201).json({ message: 'No se encontraron moviles' });
    }
   

    return param;
  
  } catch (err) {
    console.log('Error en getMoviles:', err);
    let code = ''
    if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
    return {error:code};
  }
}


}

// actualizar ID en Pronto_RED 
async function actualizarIdRedGps(idEquipoGps, dominioId) {
  try {
      const pool = await getConnection(); // Usar tu función de conexión existente

      const request = pool.request();
      request.input('idRedGPS', sql.Int, idEquipoGps);
      request.input('dominioId', sql.Int, dominioId);

      const result = await request.query(`
          UPDATE dominio
          SET IdRedGPS = @idRedGPS
          WHERE DominioID = @dominioId
      `);

      console.log(`Equipo GPS con ID ${idEquipoGps} actualizado en la base de datos.`);
      return result; // Opcional: devolver el resultado de la consulta
  } catch (error) {
      console.error('Error al actualizar la base de datos:', error);
      throw error; // Re-lanzar el error para que se maneje en la función crearEquipoGps
  }

}
///

