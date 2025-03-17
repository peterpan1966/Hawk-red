async function crearEquipoGps(token, apikey, datosEquipoGps) {
    const url = 'https://api.service24gps.com/api/v1/createDevice';

    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('token', token);

    // Agregar los datos del equipo GPS al formDat ejemplo AC213DH

    formData.append('tipo_equipo', datosEquipoGps.tipo_equipo); //1 es "GPS", "5 es dvr movil"
    formData.append('nombre', datosEquipoGps.nombre);//08201735835  se reprite el IMEI viene del sql 
    formData.append('imei', datosEquipoGps.imei);//08201735835 viene del sql 
    formData.append('marca', datosEquipoGps.marca);//slimtrack vienen del sql (Id)
    formData.append('modelo', datosEquipoGps.modelo);  ///TK02 vienen del sql (Id)
    formData.append('chip_telefonico', datosEquipoGps.chip_telefonico);//1152594373 viene del SQL
    formData.append('idzona_horaria', datosEquipoGps.idzona_horaria);// 14 es zona horaria -3
    formData.append('idpais', datosEquipoGps.idpais);//  1     es ARgentina

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        console.log("Respuesta crearEquipoGps:", response);
        console.log("Headers de la peticion:", response.headers);
        console.log("Status de la respuesta:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resultado = await response.json();
        console.log("Datos crearEquipoGps:", resultado);
        return resultado.data; // Devolver solo el ID del equipo GPS  aqui debo insertar este ID en el sql en equipos
        //para agregar a la BD el ID REDGPS
        const idEquipoGps = resultado.data; // Asumiendo que 'data' contiene el ID
        // Llamar a la función para actualizar la base de datos
        await actualizarIdRedGps(idEquipoGps, datosEquipoGps.paresID); // Usar paresID
        return idEquipoGps; 

        //
        console.error('Error al crear equipo GPS:', error);
        return null;
    }
}

async function crearActivo(token, apikey, datosActivo) {
    const url = 'https://api.service24gps.com/api/v1/createAsset';

    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('token', token);

    // Agregar los datos del activo al formData
    formData.append('nombre', datosActivo.nombre);  // aqui va la patente viene del sql 
    formData.append('tipo_vehiculo', datosActivo.tipo_vehiculo);
    formData.append('marca', datosActivo.marca); //viene del sql o null
    formData.append('modelo', datosActivo.modelo); //viene del sql  o null
    formData.append('anio', datosActivo.anio);// dejar null
    formData.append('patente', datosActivo.patente); // es la misma que el nombre viene del sql 
    formData.append('idcliente', datosActivo.idcliente); // id cliente es el ID que lo saco del  boton que quiero cargar
    formData.append('equipo_gps', datosActivo.equipo_gps); // es el Id del equipo que cargue previamente que deberia estar en eñl sql tambien
    formData.append('color', datosActivo.color); // vienen del sql 
    formData.append('numero_serie', datosActivo.numero_serie); //null
    formData.append('numero_motor', datosActivo.numero_motor); //null
    formData.append('numero_economico', datosActivo.numero_economico);//null
    formData.append('rendimiento_combustible', datosActivo.rendimiento_combustible);//null

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        console.log("Respuesta crearActivo:", response);
        console.log("Headers de la peticion:", response.headers);
        console.log("Status de la respuesta:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resultado = await response.json();
        console.log("Datos crearActivo:", resultado);
        return resultado;  
    } catch (error) {
        console.error('Error al crear activo:', error);
        return null;
    }
}

async function crearEquipoGpsYActivo(token, apikey, datosEquipoGps, datosActivo) {
    try {
        const equipoGpsId = await crearEquipoGps(token, apikey, datosEquipoGps);
        if (equipoGpsId) {
            console.log("Equipo GPS creado con éxito, ID:", equipoGpsId);
            datosActivo.equipo_gps = equipoGpsId; // Actualizar el ID del equipo GPS en los datos del activo

            const resultadoActivo = await crearActivo(token, apikey, datosActivo);
            if (resultadoActivo) {
                console.log("Activo creado con éxito:", resultadoActivo);
                return { equipoGpsId: equipoGpsId, activo: resultadoActivo };//actualizar en sql el dato de ID del equipo 
            } else {
                console.log("Error al crear el activo.");
                return { equipoGpsId: equipoGpsId, activo: null };
            }
        } else {
            console.log("Error al crear el equipo GPS.");
            return { equipoGpsId: null, activo: null };
        }
    } catch (error) {
        console.error("Error en la creación de equipo GPS y activo:", error);
        return { equipoGpsId: null, activo: null };
    }
}

// Ejemplo de uso:
const datosEquipoGps = {
    tipo_equipo: "1",
    nombre: "000123",
    imei: "000123",
    marca: "1",
    modelo: "1",
    chip_telefonico: "2222112233",
    idzona_horaria: "1",
    idpais: "1",
};

const datosActivo = {
    nombre: "Nuevo Activo",
    tipo_vehiculo: "1",
    marca: "Toyota",
    modelo: "Corolla",
    anio: "2023",
    patente: "ABC1234",
    idcliente: "11",
    equipo_gps: "", // Se actualizará con el ID del equipo GPS
    color: "Blanco",
    numero_serie: "SN12345",
    numero_motor: "M123",
    numero_economico: "001",
    rendimiento_combustible: "15",
};

c/* onst token = "wfszR/oPIQKjt5HT5NgjDnZ2SAZQ==";
const apikey = "25sdsd234234aa93sdsdsd37c70118e7"; */

crearEquipoGpsYActivo(token, apikey, datosEquipoGps, datosActivo)
    .then(resultados => {
        if (resultados.equipoGpsId && resultados.activo) {
            console.log("Equipo GPS y activo creados con éxito:", resultados);
        } else {
            console.log("Error en la creación de equipo GPS o activo.");
        }
    });