'use strict';

const consulta = {};
let encabezados = [];

const myWorker = new Worker("../worker/worker.js");

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id');
    const razonSocial = urlParams.get("razonSocial");

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
    titulo.innerText = `Vehiculos del cliente: ${razonSocial}`;

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
    tecnologiaIdHeader.textContent = 'tecn0_id';
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
            filaNula.innerText = 'null';
            filaParalela.appendChild(filaNula);
            tableParalel.appendChild(filaParalela);
        }
    }
};

function cargarDatos(vehiculo) {
    // Aquí va tu código para cargar los datos del vehículo
    console.log('Cargando datos de:', vehiculo);
    // ... tu lógica de carga de datos ...
}