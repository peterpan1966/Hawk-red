// const fetch = require('node-fetch');
import fetch from 'node-fetch';


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

    console.log("Respuesta obtenerToken:", response); // Agregado

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Datos obtenerToken:", data); // Agregado
    return data.data;
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return null;
  }
}



async function obtenerClientes(token, apikey) {
  const url = 'https://api.service24gps.com/api/v1/getClients';

  const formData = new URLSearchParams();
  formData.append('apikey', apikey);
  formData.append('token', token);

  try {
      const response = await fetch(url, {
          method: 'POST',
          body: formData,
      });

      /* console.log("Respuesta obtenerClientes:", response);
      console.log("Headers de la peticion:", response.headers);
      console.log("Status de la respuesta:", response.status);
 */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const clientes = await response.json();
      //console.log("Datos obtenerClientes:", clientes);
      return clientes;
  } catch (error) {
      console.error('Error al obtener clientes:', error);
      return null;
  }
}


//para obtener el listado de todos los Activos y sus datos



/* async function obtenerActivosCliente(token, apikey, idCliente) {
  const url = 'https://api.service24gps.com/api/v1/getClientAssetsInfo';

  const formData = new URLSearchParams();
  formData.append('apikey', apikey);
  formData.append('token', token);
  formData.append('idCliente', idCliente);

  try {
      const response = await fetch(url, {
          method: 'POST',
          body: formData,
      });


      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const activos = await response.json();
    //   console.log("Datos obtenerActivosCliente:", activos);
      return activos;
  } catch (error) {
      console.error('Error al obtener activos del cliente:', error);
      return null;
  }
} 
 */
// agregado para obtener activos de un cliente */

async function obtenerActivosCliente(token, apikey, idCliente) {
  const url = 'https://api.service24gps.com/api/v1/getClientAssetsInfo';

  const formData = new URLSearchParams();
  formData.append('apikey', apikey);
  formData.append('token', token);
  formData.append('idCliente', idCliente);

  try {
      const response = await fetch(url, {
          method: 'POST',
          body: formData,
      });

     /*  console.log("Respuesta obtenerActivosCliente:", response);
      console.log("Headers de la peticion:", response.headers);
      console.log("Status de la respuesta:", response.status);
 */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const activos = await response.json();
    //   console.log("Datos obtenerActivosCliente:", activos);
      return activos;
  } catch (error) {
      console.error('Error al obtener activos del cliente:', error);
      return null;
  }
}
// obtener vehiculos completos
async function obtenerVehiculosCompletos(token, apikey) {
  const url = 'https://api.service24gps.com/api/v1/ondelivery/vehicleGetAllComplete';

  const formData = new URLSearchParams();
  formData.append('apikey', apikey);
  formData.append('token', token);

  try {
      const response = await fetch(url, {
          method: 'POST',
          body: formData,
      });

      /* console.log("Respuesta obtenerVehiculosCompletos:", response);
      console.log("Headers de la peticion:", response.headers);
      console.log("Status de la respuesta:", response.status); */

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const vehiculos = await response.json();
    //   console.log("Datos obtenerVehiculosCompletos:", vehiculos);
      return vehiculos;
  } catch (error) {
      console.error('Error al obtener vehículos completos:', error);
      return null;
  }
}

async function obtenerMarcasEquiposGps(token, apikey) {
    const url = 'https://api.service24gps.com/api/v1/getBrands';

    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('token', token);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const marcas = await response.json();
       // console.log("Marcas de equipos GPS:", marcas);
        return marcas;
    } catch (error) {
        console.error('Error al obtener marcas de equipos GPS:', error);
        return null;
    }
}
async function obtenerModelosEquiposGps(token, apikey) {
    const url = 'https://api.service24gps.com/api/v1/getModels';

    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('token', token);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const modelos = await response.json();
        //console.log("Modelos de equipos GPS:", modelos);
        return modelos;
    } catch (error) {
        console.error('Error al obtener modelos de equipos GPS:', error);
        return null;
    }
}

async function obtenerMarcasyModeloActivos(token, apikey) {
    const url = 'https://api.service24gps.com/api/v1/getVehiclesBrands';

    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('token', token);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
       const marymod = await response.json();
       //console.log("Modeloymarca activos:", marymod);
        return marymod;
    } catch (error) {
        console.error('Error al obtener marca y modelos activos:', error);
        return null;
    }
}

// obtener sims

//obtener activos de un cliente https://api.service24gps.com/api/v1/getClientAssetsInfo


// 
async function obtenerSims(token, apikey) {
    const url = 'https://api.service24gps.com/api/v1/getDevices';

    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('token', token);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const devices = await response.json();
       //console.log("Marcas de devices:", devices);
        return devices;
    } catch (error) {
        console.error('Error al obtener sims:', error);
        return null;
    }
}
// crear SIms 
/* async function setSims(token, apikey,nombre,nro_tel,nro_nip) {
    const url = 'https://api.service24gps.com/api/v1/setSim';
   
    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('token', token);
    formData.append('nombre',nombre);
    formData.append('nro_tel',nro_tel);
    formData.append('nro_nip',nro_nip);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const sim = await response.json();
      
        if (sim.status !== 200) {
            // La API reportó un error específico, mostrar el mensaje de 'data'
            console.error('Error de la API:', sim);
            throw new Error(`Error de la API: status ${sim.status}, data: ${sim.data}`);

        }

        console.log("simcreado Peter :", sim);
        return sim;
    } catch (error) {
        console.error('Error al crear sims:', error);
        return null;
    }
}

 */


// obtener activos de un cliente


/* async function obtenerActivos(token, apikey,idcliente) {
    const url = 'https://api.service24gps.com/api/v1/getClientAssetsInfos';

    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('token', token);
   // formData.append('idCliente', idCliente);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const activos= await response.json();
       console.log("activos :", activos);
        return activos;
    } catch (error) {
        console.error('Error al obtener activos:', error);
        return null;
    }
} */
//
async function main() {
  const username = 'afardella@hawkgps.com';
  const password = 'Hawk1234';
  const apikey = '4cdb944f71ad386b8c46d806bb625c85';
  const idCliente = '85843'; // ID del cliente para el que quieres obtener los activos
  const nombre = '1162535076';
  const nro_tel = '1162535076';
  const nro_nip = '1120';
 //const cookie = 'PHPSESSID=mhtsnhrvb2699k19ekpp0ii7j9'; // Reemplaza con tu cookie real

  const token = await obtenerToken(username, password, apikey);
  if (token) {
    console.log('Token obtenido:', token);
    const clientes = await obtenerClientes(token, apikey);
    if (clientes) {
      console.log('Clientes:', clientes);
    }
    const activos = await obtenerActivosCliente(token, apikey, idCliente);
    if (activos) {
           //console.log('Activos del cliente:', activos);
     }
    const marcas = await obtenerMarcasEquiposGps(token, apikey, idCliente);
     if (marcas) {
          // console.log('Marcas GPS:', marcas);
      }
    }
    const modelos = await obtenerModelosEquiposGps(token, apikey, idCliente);
     if (modelos) {
          // console.log('Modelos GPS:', modelos);
      }

      const marymod = await obtenerMarcasyModeloActivos(token, apikey, idCliente);
     if (marymod) {
         //  console.log('Marcasymodelosactivos:', marymod);
      }

      const sims = await obtenerSims(token, apikey, idCliente);
      if (sims) {
           // console.log('sims:', sims);
       }

       
       const Activosfull = await obtenerVehiculosCompletos(token, apikey);
       if (Activosfull) {
            // console.log('sActivosFull', Activosfull);
        }
 
        const sim = await setSims(token, apikey,nombre,nro_tel,nro_nip);
       //console.log('datos para crar sim',nombre,nro_tel,nro_nip);
        if (sim) {
             console.log('Simcreado', sim);
         }
  }





main();




export { 
  obtenerToken, 
  obtenerClientes, 
  obtenerActivosCliente, 
  obtenerVehiculosCompletos 

};
