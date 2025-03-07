select usu_nombre_usuario, usu_clave,usu_id  from usuario order by usu_nombre_usuario asc;
/*** de usuario saco usu_nombre_usuario , usu_id , usu_clave, usu_deshabilitado***/
select * from usuario where usu_nombre_usuario = 'nhollmann' and usu_clave = 'fcdn2023';
select * from perfil_usuario where peu_usuario_id = 2696 order by peu_perfil_id asc;
/** mi usu ID 2678 **/
select * from perfil;

/** CONSULTAR USUARIO CONTRASE�A Y SI TIENE PERFIL 14 O 15 DE FACTURACION **/
select top 1  usu_nombre_usuario, usu_clave, peu_perfil_id
from perfil_usuario 
inner join usuario on peu_usuario_id = usu_id 
where usu_nombre_usuario = 'nhollmann' and usu_clave ='fcdn2023'  and peu_perfil_id in (15 ,14) order by peu_perfil_id asc ;


select * from usuario order by usu_nombre_usuario asc;
select top 100 *from [181.10.162.155].TICKETS.dbo.usuario 

/** pedro usuarioId = 13 , 
/**select *from PerfilUsuario where Usuario_UsuarioID = 13    de aqui saco el nuemro 3 




