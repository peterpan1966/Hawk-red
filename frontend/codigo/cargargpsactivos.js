/* function cargarDatos(vehiculo) {
    const dominioId = vehiculo.DominioID; // Obtiene el DominioId del vehículo
    console.log('DominioId',vehiculo.DominioID)

    TuClase.getunidad(vehiculo.DominioID)
        .then(datosMovil => {
            console.log('Datos del vehículo:', datosMovil); // Muestra los datos en la consola

            if (datosMovil && datosMovil.length > 0) {
                const movil = datosMovil[0]; // Asume que getunidades devuelve un array de un solo elemento

                // Prepara los datos para la API
                const datosParaApi = {
                    tipo_equipo: 1,
                    nombre: movil.numeroSerie,
                    imei: movil.numeroSerie,
                    marca: movil.IdMarca,
                    modelo: movil.IdModelo,
                    chip_telefonico: movil.NroLinea,
                    idzona_horaria: 14,
                    idpais: 1
                };

                // Llama a la API (por ahora, solo console.log)
                console.log('Datos preparados para la API:', datosParaApi);
            }
        })
        .catch(error => {
            console.error('Error al cargar GPS&ACTIVOS:', error);
        });
} */