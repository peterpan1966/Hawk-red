'use strict';

const consulta = {};
let encabezados = [];

const myWorker = new Worker("../worker/worker.js");

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id');
    const razonSocial = urlParams.get("razonSocial");
    //const clienteRed = urlParams.get("Red_ID");

    if (clienteId) {
        fetch(`http://${API_URL}/fcdn/unidadesClientes/${clienteId}`, {
            method: 'GET'
        }).then(res => res.json()).then(res => {
            console.log('Datos recibidos fetch unidades clientes:', res);
            cargarVehiculos(res, razonSocial);
        }).catch(error => {
            console.error('Error al obtener los datos:', error);
        });
    }
});
// este es el que carga los vehiculos
const cargarVehiculos = async (e, razonSocial) => {
    if (Array.isArray(e.activos)) {
        e.activos.forEach(vehiculo => {
            console.log(vehiculo);
        });
    } else {
        console.error("e.activos no es un array", e.activos);
    }

    const table = document.querySelector('#tablaVehiculos');
    const tableParalel = document.querySelector('#tablaParalela');
    const titulo = document.querySelector('#titulo');
    titulo.innerText = `Vehiculos del cliente: ${razonSocial}`;//agrego el RedID

    table.innerHTML = "";
    const fila_1 = document.createElement('tr');

    // Cabeceras para checkbox y botón
    const celdaSeleccionar = document.createElement('th');
    const celdaAcciones = document.createElement('th');
    celdaSeleccionar.textContent = 'Selec'; // cambie seleccionar
    celdaAcciones.textContent = 'Sync'; //cambie acciones

    fila_1.appendChild(celdaSeleccionar);

    const patenteHeader = document.createElement('th');
    const descripcionHeader = document.createElement('th');
    const numSerieHeader = document.createElement('th');
    const numLineaHeader = document.createElement('th');
    const tecnologiaIdHeader = document.createElement('th');
    //const estadoHeader = document.createElement('th');
    const dominioIdHeader = document.createElement('th');

    patenteHeader.textContent = 'patente';
    descripcionHeader.textContent = 'descripcion';
    numSerieHeader.textContent = 'nro serie';
    numLineaHeader.textContent = 'SIM';
    tecnologiaIdHeader.textContent = 'tecno_id';
    //estadoHeader.textContent = 'estado';
    dominioIdHeader.textContent = 'dom_id';

    fila_1.appendChild(patenteHeader);
    fila_1.appendChild(descripcionHeader);
    fila_1.appendChild(numSerieHeader);
    fila_1.appendChild(numLineaHeader);
    fila_1.appendChild(tecnologiaIdHeader);
    //fila_1.appendChild(estadoHeader);
    fila_1.appendChild(dominioIdHeader);
    fila_1.appendChild(celdaAcciones); // Agregamos la cabecera de acciones
    table.appendChild(fila_1);

    tableParalel.innerHTML = "";
    const fila1 = document.createElement('tr');
    const placaHeader = document.createElement('th');
    const imeiHeader = document.createElement('th');
    const simHeader = document.createElement('th');
    const modeloHeader = document.createElement('th');
    const idvehiculoHeader = document.createElement('th');

    placaHeader.textContent = 'placa';
    imeiHeader.textContent = 'imei';
    simHeader.textContent = 'sim';
    modeloHeader.textContent = 'modelo';
    idvehiculoHeader.textContent = 'idvehiculo';

    fila1.appendChild(placaHeader);
    fila1.appendChild(imeiHeader);
    fila1.appendChild(simHeader);
    fila1.appendChild(modeloHeader);
    fila1.appendChild(idvehiculoHeader);

    tableParalel.appendChild(fila1);

    for (const iterator of e.moviles) {
        const fila = document.createElement('tr');

        // Checkbox
        const celdaCheckbox = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        celdaCheckbox.appendChild(checkbox);
        fila.appendChild(celdaCheckbox);

        const patente = document.createElement('td');
        const descripcion = document.createElement('td');
        const numSerie = document.createElement('td');
        const numLinea = document.createElement('td');
        const tecnologiaId = document.createElement('td');
        //const estado = document.createElement('td');
        const dominioId = document.createElement('td');

        patente.textContent = iterator.patente;
        descripcion.textContent = iterator.Descripcion;
        numSerie.textContent = iterator.numeroSerie;
        numLinea.textContent = iterator.NroLinea;
        tecnologiaId.textContent = iterator.tecnologiaId;
       // estado.textContent = iterator.Estado;
        dominioId.textContent = iterator.DominioID;
        //redId.textContent = iterator.Red_ID

        fila.appendChild(patente);
        fila.appendChild(descripcion);
        fila.appendChild(numSerie);
        fila.appendChild(numLinea);
        fila.appendChild(tecnologiaId);
        //fila.appendChild(estado);
        fila.appendChild(dominioId);

        // Botón de "play"
        const celdaBoton = document.createElement('td');
        const botonPlay = document.createElement('button');
        botonPlay.classList.add('play-button'); // Agrega la clase para aplicar estilos CSS
        botonPlay.innerHTML = '<i class="fas fa-play"></i> ';// Icono de Font Awesome
        botonPlay.addEventListener('click', () => {
            cargarDatos(iterator); // Llama a tu función de carga de datos_Peter
        });
        celdaBoton.appendChild(botonPlay);
        fila.appendChild(celdaBoton);

        table.appendChild(fila);

        let contador = 0;
//aqui debo buscar el REDID
        for (const activo of e.activos) {
            if (activo.placa == iterator.patente) {
                contador = 1;
                const filaParalela = document.createElement('tr');

                const placa = document.createElement('td');
                const imei = document.createElement('td');
                const sim = document.createElement('td');
                const modelo = document.createElement('td');
                const idvehiculo = document.createElement('td');

                placa.textContent = activo.placa;
                imei.textContent = activo.imei;
                sim.textContent = activo.sim;
                modelo.textContent = activo.modelo;
                idvehiculo.textContent = activo.idvehiculo;

                filaParalela.appendChild(placa);
                filaParalela.appendChild(imei);
                filaParalela.appendChild(sim);
                filaParalela.appendChild(modelo);
                filaParalela.appendChild(idvehiculo);

                tableParalel.appendChild(filaParalela);
            }
        }
        if (contador == 0) {
            const filaParalela = document.createElement('tr');
            const filaNula = document.createElement('td');
            filaNula.textContent = 'NULL';
            filaParalela.appendChild(filaNula);
            tableParalel.appendChild(filaParalela);
        }
    }
};

/* function cargarDatos(vehiculo) {
    // Aquí va tu código para cargar los datos del vehículo
    console.log('Cargando datos de:', vehiculo);
    // ... tu lógica de carga de datos ...
} */
//comente para porbar la logica nuev Peter
/* 
function cargarDatos(vehiculo) {
    const dominioId = vehiculo.DominioID; // Obtiene el DominioId del vehículo
    console.log('DominioId',vehiculo.DominioID)

      if (dominioId) {
        fetch(`http://${API_URL}/fcdn/unidad/${dominioId}`, {
            method: 'GET'
        }).then(res => res.json()).then(res => {
            console.log('Datos recibidos fetch unidad cliente:', res.movil);
            //Prepara los datos para la API

        for (const iterator of res.movil)   {
            
                const datosParaApi = {
                    tipo_equipo: 1,
                    nombre: iterator.numeroSerie,
                    imei: iterator.numeroSerie,
                    marca: iterator.IdMarca,
                    modelo: iterator.IdModelo,
                    chip_telefonico: iterator.NroLinea,
                    idzona_horaria: 14,
                    idpais: 1
                };

                // Llama a la API (por ahora, solo console.log)
                console.log('Datos preparados para la API:', datosParaApi);
            }
            
            
        }).catch(error => {
            console.error('Error al obtener los datos:', error);
        });
    }

//funcion para cargar el activo , primero recupero el ID del gps que ya se cargo en resultado
//function cargarActivo(vehiculo) {
   // const dominioId = vehiculo.DominioID; // Obtiene el DominioId del vehículo
    console.log('DominioId2',vehiculo.DominioID)

      if (dominioId) {
        fetch(`http://${API_URL}/fcdn/caractactivos/${dominioId}`, {
            method: 'GET'
        }).then(res => res.json()).then(res => {
            console.log('Datos recibidos fetch activo cliente:', res.caract);
            //Prepara los datos para la API

        for (const iterator of res.caract)   {
            
                const datosParaApi2 = {
                    tipo_vehiculo: 1,
                    marca: 1,
                    modelo: 'Prueba',
                    patente: iterator.Patente,
                    idcliente: iterator.Red_id,  //debo traer el IdREDGPS del cliente
                    equipo_gps: iterator.Nombre,
                    //modelo: iterator.IdModelo,
                    // chip_telefonico: iterator.NroLinea,
                    // idzona_horaria: 14,
                    // idpais: 1

                };

                // Llama a la API (por ahora, solo console.log)
                console.log('Datos preparados para la API:2', datosParaApi2);
            }
            
            
        }).catch(error => {
            console.error('Error al obtener los datos:', error);
        });
    }

}

//comento para probar la logica si carga el equipo , previamente verifica el ID del clien */
//funcion obtener token
async function obtenerToken(username, password, apikey) {
    const url = 'https://api.service24gps.com/api/v1/gettoken';
  
    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('token', '');
    formData.append('username', username);
    formData.append('password', password);

  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
     // console.log("Respuesta obtenerToken:", response); // Agregado
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      //console.log("Datos obtenerToken:", data); // Agregado
      return data.data;
    } catch (error) {
      console.error('Error al obtener el token:', error);
      return null;
    }
  }
//lunes Feriado 




// hasta aqui lunes feriado 
// agregue esto nuevo del crear activo en api 

async function crearActivoEnAPI(datosActivo) {
    const username = 'afardella@hawkgps.com';
    const password = 'Hawk1234';
    const apikey = '4cdb944f71ad386b8c46d806bb625c85';

    const token = await obtenerToken(username, password, apikey);
    if (!token) {
        console.error('Error al obtener el token para crear activo.');
        return null;
    }

    const formDataActivo = new FormData();
    formDataActivo.append('apikey', apikey);
    formDataActivo.append('token', token);
    formDataActivo.append('tipo_vehiculo', datosActivo.tipo_vehiculo);
    formDataActivo.append('marca', datosActivo.marca);
    formDataActivo.append('nombre', datosActivo.nombre);
    formDataActivo.append('modelo', datosActivo.modelo);
    formDataActivo.append('patente', datosActivo.patente);
    formDataActivo.append('idcliente', datosActivo.idcliente);
    formDataActivo.append('equipo_gps', datosActivo.equipo_gps);
    formDataActivo.append('cliente', datosActivo.cliente);

    try {
        const responseActivo = await fetch('https://api.service24gps.com/api/v1/createAsset', {
            method: 'POST',
            body: formDataActivo
        });

        const resultadoActivo = await responseActivo.json();
        console.log('Resultado de la API de creación de activo:', resultadoActivo);

        if (resultadoActivo.status === 200 && resultadoActivo.data) {
            const idvehiculo = resultadoActivo.data;
            console.log('Activo creado con ID:', idvehiculo);

            // Crear la relación entre el activo y el cliente
            const resultadoRelacion = await crearRelacionActCli(idvehiculo, datosActivo.idcliente, datosActivo.cliente, apikey, token);
            if (resultadoRelacion) {
                return resultadoRelacion; // Retornar el resultado de la relación
            } else {
                return null; // Error al crear la relación
            }
        } else {
            console.error('Error al crear el activo:', resultadoActivo);
            return null; // Error al crear el activo
        }
    } catch (error) {
        console.error('Error al llamar a la API de creación de activo:', error);
        return null; // Error en la llamada a la API
    }
}

async function crearRelacionActCli(idvehiculo, idcliente, cliente, apikey, token) {
    const formDataRelacion = new FormData();
    formDataRelacion.append('apikey', apikey);
    formDataRelacion.append('token', token);
    formDataRelacion.append('idcliente', idcliente);
    formDataRelacion.append('idvehiculo', idvehiculo);
    formDataRelacion.append('cliente', cliente);

    console.log('Datos para la relación:', { apikey, token, idcliente, idvehiculo, cliente });

    try {
        const responseRelacion = await fetch('https://api.service24gps.com/api/v1/addAssetByClient', {
            method: 'POST',
            body: formDataRelacion
        });

        const resultadoRelacion = await responseRelacion.json();
        console.log('Resultado de la API de relación activo-cliente:', resultadoRelacion);

        if (resultadoRelacion.status === 200 ) {
            console.log('Relación creada Ok:', resultadoRelacion.data);
            return resultadoRelacion.data;
        } else {
            console.error('Error al crear la relación:', resultadoRelacion);
            return null;
        }
    } catch (error) {
        console.error('Error al llamar a la API de relación activo-cliente:', error);
        return null;
    }
}

// hasta 



async function cargarDatos(vehiculo) {
    const dominioId = vehiculo.DominioID;
    console.log('DominioId', dominioId);

    if (dominioId) {
        try {
            // Paso 1: Cargar el vehículo y obtener el ID del equipo
            const resUnidad = await fetch(`http://${API_URL}/fcdn/unidad/${dominioId}`);
            const dataUnidad = await resUnidad.json();
            console.log('Datos recibidos fetch unidad cliente:', dataUnidad.movil);

            for (const iterator of dataUnidad.movil) {
                const datosEquipo = {
                    tipo_equipo: 1,
                    nombre: iterator.numeroSerie,
                    imei: iterator.numeroSerie,
                    marca: iterator.IdMarca,
                    modelo: iterator.IdModelo,
                    chip_telefonico: iterator.NroLinea,
                    idzona_horaria: 14,
                    idpais: 1
                };

                console.log('Datos preparados para la API de equipo:', datosEquipo);

                // Aquí deberías llamar a la API para crear el equipo y obtener el ID
                
             
                const equipoId = await crearEquipoYObtenerId(datosEquipo,vehiculo); // Función simulada
                console.log('ID del equipo creado:', equipoId);
                console.log('datos del vehiculo a cargar',vehiculo);

                // Paso 2: Cargar el activo utilizando el ID del equipo
               const vehiculoId = await cargarActivo(vehiculo, equipoId);
               
               
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }}


     // agrego funciona cargar Activo y cliente martes 16 hs 
     async function cargarActivo(vehiculo, equipoId) {
        const dominioId = vehiculo.DominioID;
        console.log('DominioId2', dominioId);
    
        if (dominioId) {
            try {
                const res = await fetch(`http://${API_URL}/fcdn/caractactivos/${dominioId}`);
                const data = await res.json();
                console.log('Datos recibidos fetch activo cliente:', data.caract);
    
                for (const iterator of data.caract) {
                    let idCliente = iterator.Red_id;
                    let clienteID1= iterator.ClienteID;
    
                    if (!idCliente) {
                        console.log('Cliente no encontrado, creando cliente...',clienteID1);
                        idCliente = await crearClienteYObtenerId(clienteID1); // Obtener el ID del cliente
                        console.log('Este es el Red_ID cargado para cargar el vehiculo',idCliente);
                        

                       if (!idCliente) {
                       
                            console.error('No se pudo obtener el ID del cliente, saltando la creación del activo.');
                            continue;
                        }
                    }
    
                    const datosParaApi2 = {
                        tipo_vehiculo: 1,
                        marca: 1,
                        nombre: iterator.Patente,
                        modelo: 'Prueba',
                        patente: iterator.Patente,
                        idcliente: idCliente,
                        cliente: iterator.cliente,
                        equipo_gps: equipoId,
                    };
    
                    console.log('Datos preparados para la API:2', datosParaApi2);
                    await crearActivoEnAPI(datosParaApi2);
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
    }

    async function crearClienteYObtenerId(clienteID1) {
        try {
            console.log('el id que paso para slq es :', clienteID1);
            const responseCliente = await fetch(`http://${API_URL}/fcdn/datoscliente/${clienteID1}`);
            const datosCliente = await responseCliente.json();
            console.log('Datos del cliente obtenidos:', datosCliente.clientedata);
    
            if (!datosCliente || datosCliente.clientedata.length === 0) {
                console.error('No se encontraron datos del cliente.');
                return null;
            }
    
            for (const iterator of datosCliente.clientedata) {
                const datosParaApi3 = {
                    nombre: iterator.RazonSocial,
                    razon_social: iterator.RazonSocial,
                    idzona_horaria: "14",
                    IdTipo_informacion_tributaria: "5",
                    email: iterator.Email,
                    rfc: iterator.CUIT,
                    ciudad: "CABA",
                    domicilio: iterator.Direccion,
                    descripcion: "Cliente creado automáticamente",
                };
    
                console.log('datos para API3cliente: ', datosParaApi3);
                const resultadoSetClient = await crearClienteEnApi(datosParaApi3);
                console.log('esto viene de api resultadoSetClient', resultadoSetClient, resultadoSetClient.status, resultadoSetClient.data);
    
//desde aqui es la funcion de update
                if (resultadoSetClient && resultadoSetClient.status === 200) {
                    console.log('Cliente creado con API con ID:V1', resultadoSetClient.data);
                //new
                const id_cliente = resultadoSetClient.data;
                const ClienteID1 = clienteID1;

                console.log('id_cliente,ClienteID1', id_cliente, ClienteID1);

                const resultadoUpdate= await fetch(`http://${API_URL}/fcdn/trazabilidad/updBD`,{
                    method:"POST",

                    body: JSON.stringify({  //id_cliente,clienteID1
                        id_cliente: id_cliente,
                        clienteID1: ClienteID1,
                        
                }),
                    headers:{'Content-Type':'application/json'},
                    credentials: 'include'
                  }).then(res=>{return res.json();}).then(res=>{return res});
                 console.log('Resultado del update:', resultadoUpdate.id_cliente); 
                 
                  //return postMessage(resultadoUpdate.id_cliente);
                  console.log('Resultado del update:', resultadoUpdate);
                  return resultadoUpdate.id_cliente;  
                  //return resultadoSetClient.data; // Retornar el ID del cliente
                }


                else {
                  //  console.error('Error al crear el cliente:', resultadoSetClient ? resultadoSetClient.data : "Respuesta de la API indefinida");
                    console.error('Error al crear el cliente:V3', resultadoSetClient.data );
                    // Si la creación falla, continuar con el siguiente cliente en el array
                }
//hasta aqui funcion update                

            }
            return null; // Retornar null si la creación falla para todos los clientes
        } catch (error) {
            console.error('Error al obtener los datos Api3:', error);
            return null;
        }
    }
    
  
            
            //await crearClienteEnApi(datosParaApi3);

          
//         }
//     } catch (error) {
//         console.error('Error al obtener los datos Api3:', error);
//     }
// }
async function crearClienteEnApi(datosCliente){

    const username = 'afardella@hawkgps.com';
    const password = 'Hawk1234';
    const apikey = '4cdb944f71ad386b8c46d806bb625c85';

        const token = await obtenerToken(username, password, apikey);
         if (!token) {
        console.error('Error al obtener el token.');
        return null;
    }

    console.log('Token obtenido para cargar cliente:', token);

const formDataCliente = new FormData();
formDataCliente.append('apikey', apikey);
formDataCliente.append('token', token);
formDataCliente.append('nombre', datosCliente.nombre);
formDataCliente.append('razon_social', datosCliente.nombre);
formDataCliente.append('idzona_horaria', '14');
formDataCliente.append('IdTipo_informacion_tributaria', '5');
formDataCliente.append('rfc=', datosCliente.rfc);
formDataCliente.append('email', datosCliente.email);
formDataCliente.append('descripcion', datosCliente.descripcion);
console.log('datosdelfromdataclienteappend  ',datosCliente.nombre,datosCliente.rfc,datosCliente.email);

try{
    
     const responseSetClient = await fetch('https://api.service24gps.com/api/v1/setClient', {
                method: 'POST',
              /*   headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }, */
                body: formDataCliente
            });
    
            const resultadoSetClient = await responseSetClient.json();
            console.log('Resulatdo de la Api3 crear cliente',resultadoSetClient.data);
            if (resultadoSetClient.status === 200 ) {
                console.log('Cliente creado    API con ID:', resultadoSetClient.data);
                //const Red_ID = resultadoSetClient.data;
                return resultadoSetClient; // Retornar el ID del cliente creado
               
            } else {
                console.error('Error al crear el cliente:V22: ', resultadoSetClient.data);
                return null;
            }
        } catch (error) {
            console.error('Error en crearClienteYObtenerId:', error);
            return null;
        }
    } 


     // hasta aqui la funcion de caragr Activo y cargar cliente

    /*  async function cargarActivo(vehiculo, equipoId) {

        const dominioId = vehiculo.DominioID;
        console.log('DominioId2', dominioId);
    
        if (dominioId) {
            try {
                const res = await fetch(`http://${API_URL}/fcdn/caractactivos/${dominioId}`);
                const data = await res.json();
                console.log('Datos recibidos fetch activo cliente:', data.caract);
    
                for (const iterator of data.caract) {
                    const datosParaApi2 = {
                        tipo_vehiculo: 1,
                        marca: 1,
                        nombre:iterator.Patente,
                        modelo: 'Prueba',
                        patente: iterator.Patente,
                        idcliente: iterator.Red_id,
                        cliente: iterator.cliente,
                        equipo_gps: equipoId, // Usamos el equipoId obtenido
                    };
    
                    console.log('Datos preparados para la API:2', datosParaApi2);
    
                    // Llamada a la API createAsset
                    await crearActivoEnAPI(datosParaApi2);
                    //agregue domingo
                  
                    
                    
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
    }
     */
    
//async function crearEquipoYObtenerId(datosEquipo) {
    // Aquí iría la lógica para llamar a tu API de creación de equipo
    // y obtener el ID del equipo creado.
    // Simulación:
   // return Math.floor(Math.random() * 1000); // Genera un ID aleatorio para simular
   async function crearEquipoYObtenerId(datosEquipo) {
    const username = 'afardella@hawkgps.com';
    const password = 'Hawk1234';
    const apikey = '4cdb944f71ad386b8c46d806bb625c85';

    const token = await obtenerToken(username, password, apikey);
    if (!token) {
        console.error('Error al obtener el token.');
        return null;
    }

    console.log('Token obtenido:', token);
    // Función para buscar un equipo por nombre
    async function buscarEquipoPorNombre(nombre) {
        const formDataBuscar = new FormData();
        formDataBuscar.append('apikey', apikey);
        formDataBuscar.append('token', token);

        try {
            const responseBuscar = await fetch('https://api.service24gps.com/api/v1/getDevices', {
                method: 'POST',
                body: formDataBuscar
            });
            const resultadoBuscar = await responseBuscar.json();
            console.log('Resultado de la búsqueda de equipos:', resultadoBuscar);

            if (resultadoBuscar.status === 200 && resultadoBuscar.data && Array.isArray(resultadoBuscar.data)) {
                // Buscar el equipo por nombre
                const equipoEncontrado = resultadoBuscar.data.find(equipo => equipo.nombre === nombre);
                if (equipoEncontrado) {
                    return equipoEncontrado.nombre; // Devuelve el ID del equipo encontrado  estaba equipoEncontrado.id
                }
            }
            return null; // No se encontró el equipo
        } catch (error) {
            console.error('Error al buscar el equipo por nombre:', error);
            return null;
        }
    }
    //aqui agregue la busqueda de SIm y creacion en caso de que no existe lunes 24
// Función para buscar un SIM por número de teléfono
async function buscarSimPorNumero(chip_telefonico) {
    const formDataBuscarSim = new FormData();
    formDataBuscarSim.append('apikey', apikey);
    formDataBuscarSim.append('token', token);

    try {
        const responseBuscarSim = await fetch('https://api.service24gps.com/api/v1/getSims', {
            method: 'POST',
            body: formDataBuscarSim
        });
        const resultadoBuscarSim = await responseBuscarSim.json();
        console.log('Resultado de la búsqueda de SIMs:', resultadoBuscarSim);

        if (resultadoBuscarSim.status === 200 && resultadoBuscarSim.data && Array.isArray(resultadoBuscarSim.data)) {
            const simEncontrado = resultadoBuscarSim.data.find(sim => sim.numero === chip_telefonico); // Corrección: usar chip_telefonico
            if (simEncontrado) {
                return simEncontrado; // Devuelve el SIM encontrado
            }
        }
        return null; // No se encontró el SIM
    } catch (error) {
        console.error('Error al buscar el SIM:', error);
        return null;
    }
}

// Función para crear un SIM
async function crearSim(chip_telefonico) {
    const formDataCrearSim = new FormData();
    formDataCrearSim.append('apikey', apikey);
    formDataCrearSim.append('token', token);
    formDataCrearSim.append('nombre',chip_telefonico);
    formDataCrearSim.append('nro_tel',chip_telefonico);
    formDataCrearSim.append('nro_nip','1120');

    try {
        const responseCrearSim = await fetch('https://api.service24gps.com/api/v1/setSim', {
            method: 'POST',
            body: formDataCrearSim
        });
        const resultadoCrearSim = await responseCrearSim.json();
        console.log('Resultado de la creación del SIM:', resultadoCrearSim);

        if (resultadoCrearSim.status === 200 && resultadoCrearSim.data) {
            return resultadoCrearSim.data; // Devuelve el resultado de la creación del SIM
        } else {
            console.error('Error al crear el SIM:', resultadoCrearSim);
            return null;
        }
    } catch (error) {
        console.error('Error al llamar a la API de creación de SIM:', error);
        return null;
    }
}

// Verificar si el SIM ya existe
const simExistente = await buscarSimPorNumero(datosEquipo.chip_telefonico);
if (!simExistente) {
    // Si el SIM no existe, crearlo
    console.log('El SIM no existe. Creando nuevo SIM.');
    const resultadoCreacionSim = await crearSim(datosEquipo.chip_telefonico, datosEquipo.chip_telefonico);
    if (!resultadoCreacionSim) {
        console.error('No se pudo crear el SIM. Abortando la creación del equipo.');
        return null;
    }

    //agregado para asegurar que se complete la creacion de sim antes de avanzar con la creacion del equipo
    if (resultadoCreacionSim) {
        console.log('SIM creado exitosamente. Continuando con la creación del equipo.');
    } else {
        console.error('Error al crear el SIM. Abortando la creación del equipo.');
        return null;
    }
}
// fin del agregado que espera crear el sim 




    //hasta aqui logica de creacion de SIM lunes 24

    // Verificar si el equipo ya existe
    const idEquipoExistente = await buscarEquipoPorNombre(datosEquipo.nombre);
    if (idEquipoExistente) {
        console.log('El equipo ya existe. nombre:', idEquipoExistente);
        return idEquipoExistente;
    }

    // Si el equipo no existe, crearlo
    console.log('El equipo no existe. Creando nuevo equipo.');

    const formData = new FormData();
    formData.append('apikey', apikey);
    formData.append('token', token);
    formData.append('tipo_equipo', datosEquipo.tipo_equipo);
    formData.append('nombre', datosEquipo.nombre);
    formData.append('imei', datosEquipo.imei);
    formData.append('marca', datosEquipo.marca);
    formData.append('modelo', datosEquipo.modelo);
    formData.append('chip_telefonico', datosEquipo.chip_telefonico);
    formData.append('idzona_horaria', datosEquipo.idzona_horaria);
    formData.append('idpais', datosEquipo.idpais);

    try {
        const response = await fetch('https://api.service24gps.com/api/v1/createDevice', {
            method: 'POST',
            body: formData
        });

        const resultado = await response.json();
        console.log('Resultado de la API de creación de equipo:', resultado);

        if (resultado.status === 200 && resultado.data) {
            //agregue que devuelva el IMEI o nombre 
            return resultado.data; // Devuelve el 'data' (IMEI creado )

         

        } else {
            console.error('Error al crear el equipo:', resultado);
            return null;
        }
    } catch (error) {
        console.error('Error al llamar a la API de creación de equipo:', error);
        return null;
    }


   }
