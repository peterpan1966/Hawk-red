/* `user strict`;

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
            console.log('Datos recibidos fetch unidades clientes:', res);
    
            // console.log(res)
            cargarVehiculos(res, razonSocial);
        })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
        };
    

});



const cargarVehiculos = async(e, razonSocial)=>{

    if (Array.isArray(e.activos)) {  // Verifica si 'activos' es un array
        // Aquí puedes iterar sobre 'activos'
        e.activos.forEach(vehiculo => {
            console.log(vehiculo);  // Haz lo que necesites con 'vehiculo'
        });
    } else {
        console.error("e.activos no es un array", e.activos);
    }




    const table = document.querySelector('#tablaVehiculos');
    const tableParalel = document.querySelector('#tablaParalela');
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
    //Agregado DominioId
    const dominioId =document.createElement ('th')
    patente.textContent = 'patente'
    descripcion.textContent = 'descripcion'
    numSerie.textContent = 'numero de serie'
    numLinea.textContent = 'numero de linea'
    tecnologiaId.textContent = 'tecnologia id'
    estado.textContent = 'estado'
    dominioId.textContent = 'dominio id'
    fila_1.appendChild(patente)
    fila_1.appendChild(descripcion)
    fila_1.appendChild(numSerie)
    fila_1.appendChild(numLinea)
    fila_1.appendChild(tecnologiaId)
    fila_1.appendChild(estado)
    fila_1.appendChild (dominioId)
    //fila_1.appendChild(celdaAcciones); // Agregamos la cabecera de acciones
    table.appendChild(fila_1)

    tableParalel.innerHTML = ""; 
    const fila1 = document.createElement('tr')
    const placa = document.createElement('th')
    const imei = document.createElement('th')
    const sim = document.createElement('th')
    const modelo = document.createElement('th')
    const idvehiculo =document.createElement('th')
    
    placa.textContent = 'placa'
    imei.textContent = 'imei'
    sim.textContent = 'sim'
    modelo.textContent = 'modelo'
    idvehiculo.textContent = 'idvehiculo'
    
    fila1.appendChild(placa)
    fila1.appendChild(imei)
    fila1.appendChild(sim)
    fila1.appendChild(modelo)
    fila1.appendChild(idvehiculo)
    
    tableParalel.appendChild(fila1)


    for (const iterator of e.moviles) {

        const fila = document.createElement('tr');

        const patente = document.createElement('td')
        const descripcion = document.createElement('td')
        const numSerie = document.createElement('td')
        const numLinea = document.createElement('td')
        const tecnologiaId = document.createElement('td')
        const estado = document.createElement('td')
        const dominioId = document.createElement ('th')

        patente.textContent = iterator.patente;
        descripcion.textContent = iterator.Descripcion;
        numSerie.textContent = iterator.numeroSerie;
        numLinea.textContent = iterator.NroLinea;
        tecnologiaId.textContent = iterator.tecnologiaId;
        estado.textContent = iterator.Estado;
        dominioId.textContent = iterator.DominioID

        fila.appendChild(patente)
        fila.appendChild(descripcion);
        fila.appendChild(numSerie)
        fila.appendChild(numLinea)
        fila.appendChild(tecnologiaId)
        fila.appendChild(estado)
        fila.appendChild(dominioId)
        table.appendChild(fila)

        let contador = 0

        for (const activo of e.activos) {

            if (activo.placa == iterator.patente){
                
                contador = 1
                const fila = document.createElement('tr');
            
                const placa = document.createElement('td')
                const imei = document.createElement('td')
                const sim = document.createElement('td')
                const modelo = document.createElement('td')
                const idvehiculo = document.createElement('td')
                
                placa.textContent = activo.placa;
                imei.textContent = activo.imei;
                sim.textContent = activo.sim;
                modelo.textContent = activo.modelo;
                idvehiculo.textContent = activo.idvehiculo;
                
                fila.appendChild(placa)
                fila.appendChild(imei)
                fila.appendChild(sim)
                fila.appendChild(modelo)
                fila.appendChild (idvehiculo)
                
            
                tableParalel.appendChild(fila)
        }}
        if (contador == 0){
            const fila = document.createElement('tr');
            const filaNula = document.createElement('td')
            filaNula.innerText = 'null'
            fila.appendChild(filaNula)
            tableParalel.appendChild(fila);
        }
    }
}

 */