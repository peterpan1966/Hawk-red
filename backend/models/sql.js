import sql from "mssql";
import 'dotenv/config.js'


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
        from [181.10.162.155].TICKETS.dbo.PerfilUsuario
        inner join [181.10.162.155].TICKETS.dbo.usuario  on usuarioid = Usuario_UsuarioId
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
        from [181.10.162.155].TICKETS.dbo.PerfilUsuario  
        inner join [181.10.162.155].TICKETS.dbo.usuario  on usuarioid = Usuario_UsuarioId 
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
    const ser = await consulta.request().query('SELECT ser_nombre, ser_id FROM servicio WHERE ser_deshabilitado=0 ORDER BY ser_nombre ASC');
   // const ent = await consulta.request().query('SELECT ent_id, ent_nombre FROM entidad WHERE ent_deshabilitado=0 ORDER BY ent_nombre ASC');
    //const cen = await consulta.request().query('SELECT cen_id, cen_nombre FROM centro WHERE cen_deshabilitado=0 ORDER BY cen_nombre ASC');
    // const ser = await consulta.request().query('SELECT top 5 Nombre from  [181.10.162.155].TICKETS.dbo.Tecnico ORDER BY Nombre ASC');
    const ent = await consulta.request().query('SELECT ClienteId as ent_id, RazonSocial as ent_nombre from  [181.10.162.155].TICKETS.dbo.Cliente  ORDER BY ClienteId ASC');
    const cen = await consulta.request().query('SELECT TecnicoId as cen_id, Nombre as cen_nombre from [181.10.162.155].TICKETS.dbo.Tecnico ORDER BY Nombre ASC');
    // Pedro agrego consulta con los campos que me interesa
     const client = await consulta.request().query(`select cl.ClienteId, cl.RazonSocial, cl.CUIT, cl.DeudaTotal, cl.EsMoroso
		from [181.10.162.155].TICKETS.dbo.cliente cl
		inner join [181.10.162.155].Hawk.dbo.clientes clh on clh.Idcliente = IdExterno
		where  IdEstado = 1 and cl.DeudaTotal > 100 order by RazonSocial asc`);
    //query(`select ClienteId, RazonSOcial,CUIT, DeudaTotal, EsMoroso from [181.10.162.155].TICKETS.dbo.cliente where  fechaactualizacionestado >'20230101' order by fechaactualizacionestado desc`);
    //console.log(ser.recordset)
    param.ser=ser.recordset;
    param.ent=ent.recordset;
    param.cen=cen.recordset;
    //Pedro
    param.client=client.recordset;
    
    //console.log(param);
    //console.table(param.client);
    return param;
    } catch (err) {
      let code = ''
      if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
      console.log('falat campos');
      return {error:code};
    }
  } 

  static async postAll(consu){
    // console.log(consu);
    try {
        const trazabilidad = await consulta.request().query(`EXEC dbo.SP_TRAZABILIDAD_FCDN '${consu.desde}','${consu.hasta}','${consu.entidad}','${consu.servicio}','${consu.centro}'`);
      // console.log(trazabilidad.recordset);
      const fmanual = await consulta.request().query(`EXEC dbo.SP_TRAZABILIDAD_FCDN_MANUAL_1 '${consu.desde}','${consu.hasta}','${consu.entidad}','${consu.servicio}','${consu.centro}'`);
      // console.log(fmanual.recordset);
      const frecepcion = await consulta.request().query(`EXEC dbo.SP_TRAZABILIDAD_FCDN_CAJA '${consu.desde}','${consu.hasta}','${consu.entidad}','${consu.servicio}','${consu.centro}'`);
      // console.log(frecepcion.recordset);
      let traza = trazabilidad.recordset.concat(...fmanual.recordset, ...frecepcion.recordset);

      // console.log(traza);
      
      // console.log(traza.length);
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
      from [181.10.162.155].TICKETS.dbo.cliente cl
      inner join [181.10.162.155].Hawk.dbo.clientes clh on clh.Idcliente = IdExterno
      where  IdEstado = 1   and cl.esmoroso = 1 and cl.DeudaTotal > 100 order by RazonSocial asc`);
    //query(`SELECT ClienteId, RazonSOcial,CUIT, ROUND(DeudaTotal,2) as DeudaTotal, EsMoroso FROM [181.10.162.155].TICKETS.dbo.cliente WHERE 
    //   fechaactualizacionestado >'20230101' AND EsMoroso = 1 and DeudaTotal>10 ORDER BY fechaactualizacionestado desc`);
    
    console.log('Datos obtenidos de la base de datos:', cliente.recordset);
    //Pedro
    param.cliente=cliente.recordset;

    if (cliente.recordset.length === 0) {
      return res.status(201).json({ message: 'No se encontraron morosos' });
    }

    return param
    
    // console.log('resultado final', param);
    //console.table(param.client);
    // return param;
    } catch (err) {
      console.log('Error en getMorosos:', err);
      let code = ''
      if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
      return {error:code};
    }
  }
  /*
// nuevo getall
static async getAll(){
  let param ={}
  try {

    console.log('Conectando a la base de datos...');

  const cliente = await consulta.request().query(`select cl.ClienteId, cl.RazonSOcial, cl.CUIT, cl.DeudaTotal,cl.EsMoroso
    from [181.10.162.155].TICKETS.dbo.cliente cl
    inner join [181.10.162.155].Hawk.dbo.clientes clh on clh.Idcliente = IdExterno
    where  IdEstado = 1    order by RazonSocial asc`);
  //query(`SELECT ClienteId, RazonSOcial,CUIT, ROUND(DeudaTotal,2) as DeudaTotal, EsMoroso FROM [181.10.162.155].TICKETS.dbo.cliente WHERE 
  //   fechaactualizacionestado >'20230101' AND EsMoroso = 1 and DeudaTotal>10 ORDER BY fechaactualizacionestado desc`);
  
  console.log('Datos obtenidos de la base de datos:', cliente.recordset);
  //Pedro
  param.cliente=cliente.recordset;

  if (cliente.recordset.length === 0) {
    return res.status(201).json({ message: 'No se encontraron clientes' });
  }

  return param
  
  // console.log('resultado final', param);
  //console.table(param.client);
  // return param;
  } catch (err) {
    console.log('Error en getClientes:', err);
    let code = ''
    if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
    return {error:code};
  }
}
*/

//Pedro para buscar unidades, equipos, sim por cliente
static async getunidadesclientes(id){
  let param ={}
  

  try {

    if (!id) return { error: "FALTA EL ID" };
    console.log('id recibido: ', id)

    const moviles = await consulta.request().query(`Select do.patente,gr.Descripcion, 
    eq.numeroSerie,ch.NroLinea, eq.tecnologiaId, do.estado
    from  [181.10.162.155].TICKETS.dbo.dominio do
    inner join  [181.10.162.155].TICKETS.dbo.equipo eq on eq.DominioID = do.DominioID
    inner join  [181.10.162.155].TICKETS.dbo.cliente cl on cl.ClienteID = do.ClienteID
    inner join  [181.10.162.155].TICKETS.dbo.chip ch on ch.EquipoID = eq.EquipoID
    inner join  [181.10.162.155].[Hawk].[dbo].[Articulos] art on art.idArticulo = eq.EquipoID
    inner join  [181.10.162.155].[Hawk].[dbo].[grados] gr on gr.idgrado = eq.TecnologiaID
    where do.ClienteID = '${parseInt(id)}' and do.Estado = 1`);

    console.log('Datos obtenidos de la base de datos:', moviles.recordset);
    //Pedro
    param.moviles=moviles.recordset;

    if (moviles.recordset.length === 0) {
      return res.status(201).json({ message: 'No se encontraron moviles' });
    }

    return param
  
  // console.log('resultado final', param);
  //console.table(param.client);
  // return param;
  } catch (err) {
    console.log('Error en getMoviles:', err);
    let code = ''
    if(err.code ==='EREQUEST')code='FALTAN CAMPOS';
    return {error:code};
  }
}

}