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

      console.log("Respuesta obtenerClientes:", response);
      console.log("Headers de la peticion:", response.headers);
      console.log("Status de la respuesta:", response.status);

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const clientes = await response.json();
      console.log("Datos obtenerClientes:", clientes);
      return clientes;
  } catch (error) {
      console.error('Error al obtener clientes:', error);
      return null;
  }
}

// agregado para obtener activos de un cliente  aca este como obtiene Sofi  eel activo 

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

      console.log("Respuesta obtenerActivosCliente:", response);
      console.log("Headers de la peticion:", response.headers);
      console.log("Status de la respuesta:", response.status);

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const activos = await response.json();
      console.log("Datos obtenerActivosCliente:", activos);
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

      console.log("Respuesta obtenerVehiculosCompletos:", response);
      console.log("Headers de la peticion:", response.headers);
      console.log("Status de la respuesta:", response.status);

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const vehiculos = await response.json();
      console.log("Datos obtenerVehiculosCompletos:", vehiculos);
      return vehiculos;
  } catch (error) {
      console.error('Error al obtener vehículos completos:', error);
      return null;
  }
}


async function main() {
  const username = 'afardella@hawkgps.com';
  const password = 'Hawk1234';
  const apikey = '4cdb944f71ad386b8c46d806bb625c85';
  const idCliente = '85843'; // ID del cliente para el que quieres obtener los activos
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
            console.log('Activos del cliente:', activos);
           
    }


  }
}




main();




export { 
  obtenerToken, 
  obtenerClientes, 
  obtenerActivosCliente, 
  obtenerVehiculosCompletos 
};
