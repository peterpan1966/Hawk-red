`user strict`;

const consulta = {};
let encabezados=[];



const myWorker = new Worker("../worker/worker.js");


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id');
    const razonSocial = urlParams.get("razonSocial")

    if (clienteId) {
        fetch(`http://${API_URL}/fcdn/unidadesClientes/${clienteId}`,{
            method:'GET'
        }).then(res=>res.json()).then(res=>{
            console.log('Datos recibidos:', res);
    
            // console.log(res)
            cargarVehiculos(res, razonSocial);
        })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
        };
    

});



const cargarVehiculos = async(e, razonSocial)=>{
    const table = document.querySelector('#tablaVehiculos');
    const titulo = document.querySelector('#titulo');
    titulo.innerText = `Vehiculos del cliente: ${razonSocial}`


    table.innerHTML = ""; 
    const fila_1 = document.createElement('tr')
    const patente = document.createElement('th')
    const descripcion = document.createElement('th')
    const numSerie = document.createElement('th')
    const numLinea = document.createElement('th')
    const tecnologiaId = document.createElement('th')
    const estado = document.createElement('th')
    patente.textContent = 'patente'
    descripcion.textContent = 'descripcion'
    numSerie.textContent = 'numero de serie'
    numLinea.textContent = 'numero de linea'
    tecnologiaId.textContent = 'tecnologia id'
    estado.textContent = 'estado'
    fila_1.appendChild(patente)
    fila_1.appendChild(descripcion)
    fila_1.appendChild(numSerie)
    fila_1.appendChild(numLinea)
    fila_1.appendChild(tecnologiaId)
    fila_1.appendChild(estado)
    table.appendChild(fila_1)


    for (const iterator of e.moviles) {

        const fila = document.createElement('tr');

        const patente = document.createElement('td')
        const descripcion = document.createElement('td')
        const numSerie = document.createElement('td')
        const numLinea = document.createElement('td')
        const tecnologiaId = document.createElement('td')
        const estado = document.createElement('td')

        patente.textContent = iterator.patente;
        descripcion.textContent = iterator.Descripcion;
        numSerie.textContent = iterator.numeroSerie;
        numLinea.textContent = iterator.NroLinea;
        tecnologiaId.textContent = iterator.tecnologiaId;
        estado.textContent = iterator.estado;

        fila.appendChild(patente)
        fila.appendChild(descripcion);
        fila.appendChild(numSerie)
        fila.appendChild(numLinea)
        fila.appendChild(tecnologiaId)
        fila.appendChild(estado)

        table.appendChild(fila)
}
}
