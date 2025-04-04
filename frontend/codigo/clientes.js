`user strict`;

const table = document.querySelector('#tabla_clientes');
const select = document.querySelector('#select_clientes');
const consulta = {};
let encabezados=[];



const myWorker = new Worker("../worker/worker.js");

//  OBTENER OPCIONES

fetch(`http://${API_URL}/fcdn/trazabilidad`,{
    method:'GET'
}).then(res=>res.json()).then(res=>{

    // console.log(res)
    // options(res) options es una funcion
});

const options = async(e)=>{
    // console.log(e);
// for (const iterator of e.ser) {
// // console.log(iterator);
// const option = document.createElement('OPTION');
// option.classList.add('options');
// option.value = iterator.ser_id;
// // console.log(iterator.ser_nombre)
// option.innerHTML = iterator.ser_nombre;
// // console.log(option)
// servicio.appendChild(option);
// }
// for (const iterator of e.cen) {
//     const option = document.createElement('OPTION');
//     option.classList.add('options');
// option.value = iterator.cen_id;
// option.innerHTML = iterator.cen_nombre;

// // console.log(option)
// centro.appendChild(option);
// }
console.log("options")
table.innerHTML = ""; 
const fila_1 = document.createElement('tr')
fila_1.className = "filaFija"
const nombre = document.createElement('th')
const id = document.createElement('th')
const redId = document.createElement('th')
nombre.textContent = 'razon social'
id.textContent = 'id'
redId.textContent = 'red id'
//redId.textContent ='RedId'//peterlunes
fila_1.appendChild(id)
fila_1.appendChild(redId)
fila_1.appendChild(nombre)
//fila_1.appendChild(redId)  //Peterlunes
table.appendChild(fila_1)

// console.log(e.ent[0]); 

// for (const iterator of e.ent) {
//     console.log(e.ent)
//     const fila = document.createElement('tr');
//     const nombre = document.createElement('td')
//     const id = document.createElement('td')
//     id.textContent = iterator.ent_id;
//     nombre.textContent = iterator.ent_nombre;
// // console.log(iterator.ent_nombre)
// // console.log(option)
//     fila.appendChild(id)
//     fila.appendChild(nombre);
//     table.appendChild(fila)
// }
// console.log("antes")
for (const iterator of e.client) {
    const fila = document.createElement('tr');

    const razon_social = document.createElement('td')
    const id = document.createElement('td')
    const redId = document.createElement('td')
    const unidades = document.createElement('td')
   // const redId = document.createElement('td')//Peterlunes


    const link = document.createElement('a')
    const imagen = document.createElement('img')

    id.textContent = iterator.ClienteId;
    redId.textContent = iterator.Red_ID;
    razon_social.textContent = iterator.RazonSocial;
    //redId.textContent = iterator.Red_ID; //Peterlunes
    imagen.src = '../img/auto.jpg'
    link.appendChild(imagen)
    link.href = `../fcdn/unidadesVehiculos.html?id=${iterator.ClienteId}&razonSocial=${iterator.RazonSocial}`
    unidades.appendChild(link)

    
// console.log('clienteid', iterator.ClienteId)
// console.log(option)
    fila.appendChild(id)
    fila.appendChild(redId)
    fila.appendChild(razon_social);
    //fila.appendChild(redId) //Peterlunes
    fila.appendChild(unidades)
    table.appendChild(fila)
}
}

const options_morosos = async(e)=>{
    // console.log(e);
// for (const iterator of e.ser) {
// // console.log(iterator);
// const option = document.createElement('OPTION');
// option.classList.add('options');
// option.value = iterator.ser_id;
// // console.log(iterator.ser_nombre)
// option.innerHTML = iterator.ser_nombre;
// // console.log(option)
// servicio.appendChild(option);
// }
// for (const iterator of e.cen) {
//     const option = document.createElement('OPTION');
//     option.classList.add('options');
// option.value = iterator.cen_id;
// option.innerHTML = iterator.cen_nombre;

// // console.log(option)
// centro.appendChild(option);
// }
table.innerHTML = ""; 
const fila_1 = document.createElement('tr')
fila_1.className = "filaFija"
const razon_social = document.createElement('th')
const deuda_total = document.createElement('th')
const es_moroso = document.createElement('th')
const id_cliente = document.createElement('th')
const cuit = document.createElement('th')
razon_social.textContent = 'razon social'
id_cliente.textContent = 'id'
cuit.textContent = 'cuit'
deuda_total.textContent = 'deuda total'
es_moroso.textContent = 'es moroso'
fila_1.appendChild(id_cliente)
fila_1.appendChild(cuit)
fila_1.appendChild(razon_social)
fila_1.appendChild(deuda_total)
fila_1.appendChild(es_moroso)
table.appendChild(fila_1)
// console.log(e.ent[0]); 

for (const iterator of e.cliente) {

    const fila = document.createElement('tr')

    const razon_social = document.createElement('td')
    const deuda_total = document.createElement('td')
    const es_moroso = document.createElement('td')
    const id_cliente = document.createElement('td')
    const cuit = document.createElement('td')

    id_cliente.textContent = iterator.ClienteId
    razon_social.textContent = iterator.RazonSOcial
    cuit.textContent = iterator.CUIT
    deuda_total.textContent = iterator.DeudaTotal
    es_moroso.textContent = iterator.EsMoroso
    
// console.log(iterator.ent_nombre)
// console.log(option)
    fila.appendChild(id_cliente)
    fila.appendChild(cuit)
    fila.appendChild(razon_social)
    fila.appendChild(deuda_total)
    fila.appendChild(es_moroso)

    table.appendChild(fila)
 
}
}


    




// // ACOMODAR LAS OPCIONES
// const options = async(e)=>{
//     // console.log(e);
// // for (const iterator of e.ser) {
// // // console.log(iterator);
// // const option = document.createElement('OPTION');
// // option.classList.add('options');
// // option.value = iterator.ser_id;
// // // console.log(iterator.ser_nombre)
// // option.innerHTML = iterator.ser_nombre;
// // // console.log(option)
// // servicio.appendChild(option);
// // }
// // for (const iterator of e.cen) {
// //     const option = document.createElement('OPTION');
// //     option.classList.add('options');
// // option.value = iterator.cen_id;
// // option.innerHTML = iterator.cen_nombre;

// // // console.log(option)
// // centro.appendChild(option);
// // }
// table.innerHTML = ""; 
// const fila_1 = document.createElement('tr')
// const nombre = document.createElement('th')
// const id = document.createElement('th')
// nombre.textContent = 'nombre'
// id.textContent = 'id'
// fila_1.appendChild(id)
// fila_1.appendChild(nombre)
// table.appendChild(fila_1)
// console.log(e.ent[0]); 

// for (const iterator of e.ent) {
    
//     const fila = document.createElement('tr');
//     const nombre = document.createElement('td')
//     const id = document.createElement('td')
//     id.textContent = iterator.ent_id;
//     nombre.textContent = iterator.ent_nombre;
// // console.log(iterator.ent_nombre)
// // console.log(option)
//     fila.appendChild(id)
//     fila.appendChild(nombre);
//     table.appendChild(fila)
// }
// }
// // DESDE 
// desde.addEventListener('change',(e)=>{
//   consulta.desde=e.target.value.replace(/-/g, "");
// });
// // HASTA
// hasta.addEventListener('change',(e)=>{
//   consulta.hasta=e.target.value.replace(/-/g, "");
// });
// // SERVICIO
// servicio.addEventListener('change',(e)=>{
//     consulta.servicio =parseInt(e.target.value);
//     if(e.target.value === 'Servicio')delete consulta.servicio;
// });
// // CENTRO
// centro.addEventListener('change',(e)=>{
//     consulta.centro =parseInt(e.target.value);
//     if(e.target.value === 'Centro')delete consulta.centro;
// });
// ENTIDAD
// entidad.addEventListener('change',(e)=>{
//     consulta.entidad =parseInt(e.target.value);
//     if(e.target.value === 'Entidad')delete consulta.entidad;
// });

// DESCARGAR ARCHIVO XLSX 
// const descargar = async(res)=>{
//   const main = document.querySelector('.main');
//   const link = document.createElement('A');
//   const date = new Date();
// const year = date.getFullYear();
// const month = date.getMonth() + 1;
// const day = date.getDate();
// const fecha = `${year}-${month}-${day}`;
//     const fileName = `Reporte-${fecha}.xlsx`;
// // console.log(url)
// const excel=  window.URL.createObjectURL(res);
// link.href = excel;
// link.download = fileName;
// main.appendChild(link);
// link.click();
// setTimeout(() => window.URL.revokeObjectURL(link), 10000);
// blanco();
// borrar();
// }

// // GENERAR REPORTE VISOR WEB
// //  ENCABEZADOS
// const encabezado = (datos)=>{
//   encabezados = Object.keys(datos[0]);
//   // console.log(encabezados);
//   let cel = document.createElement("TH"); cel.classList.add("content-encabezado");
//   // crear encabezados 
//   for (const iterator of encabezados) {
//     let enc = document.createElement('TD');
//     enc.classList.add(`${iterator}`);
//     enc.classList.add('item-enc');
//     enc.innerHTML= iterator;
//     cel.appendChild(enc);
//   }
//   table.appendChild(cel);
// }  
// LISTA DE DATOS
// const listado =async(datos)=>{
//   // LISTA DE DATOS
//   // const lista = document.createElement('TABLE');
//   // lista.classList.add("lista-item");
//   // tabla.appendChild(lista);
//   const contador=2000;
//   let starIndex = 0;
//   let endIndex =starIndex + contador 

//   const carga = async() => {
//   let cel= document.createElement("TH"); cel.classList.add('content-lista');
//   table.appendChild(cel);
//   for (const dato of datos.slice(starIndex, endIndex)) {
//     // console.log(dato);
//     let dat = new Date(dato[encabezados[27]]);
//     let año = dat.getFullYear();
//     let mes = dat.getMonth() + 1;
//     let dia = dat.getDate();
//     let fecha = `${dia}/${mes}/${año}`;

//     let i1 = await document.createElement('TD' ); i1.classList.add('li'); i1.innerHTML= dato[encabezados[0]];
//     let i2 =  await document.createElement('TD' ); i2.classList.add('li'); i2.innerHTML= dato[encabezados[1]];
//     let i3 = await document.createElement('TD' ); i3.classList.add('li');i3.innerHTML= dato[encabezados[2]];
//     let i4 = await document.createElement('TD' ); i4.classList.add('li'); i4.innerHTML= dato[encabezados[3]];
//     let i5 = await document.createElement('TD' ); i5.classList.add('li');i5.innerHTML= dato[encabezados[4]];
//     let i6 = await document.createElement('TD' ); i6.classList.add('li');i6.innerHTML= dato[encabezados[5]];
//     let i7 = await document.createElement('TD' );i7.classList.add('li'); i7.innerHTML= dato[encabezados[6]];
//     let i8 = await document.createElement('TD' );i8.classList.add('li'); i8.innerHTML= dato[encabezados[7]];
//     let i9 = await document.createElement('TD' );i9.classList.add('li'); i9.innerHTML= dato[encabezados[8]];
//     let i10 = await document.createElement('TD' );i10.classList.add('li'); i10.innerHTML= dato[encabezados[9]];
//     let i11 = await document.createElement('TD' );i11.classList.add('li'); i11.innerHTML= dato[encabezados[10]];
//     let i12 = await document.createElement('TD' );i12.classList.add('li'); i12.innerHTML= dato[encabezados[11]];
//     let i13 = await document.createElement('TD' ); i13.classList.add('li'); i13.innerHTML= dato[encabezados[12]];
//     let i14 = await document.createElement('TD' ); i14.classList.add('li'); i14.innerHTML= dato[encabezados[13]];
//     let i15 = await document.createElement('TD' ); i15.classList.add('li'); i15.innerHTML= dato[encabezados[14]];
//     let i16 = await document.createElement('TD' ); i16.classList.add('li'); i16.innerHTML= dato[encabezados[15]];
//     let i17 = await document.createElement('TD' ); i17.classList.add('li'); i17.innerHTML= dato[encabezados[16]];
//     let i18 = await document.createElement('TD' ); i18.classList.add('li'); i18.innerHTML= dato[encabezados[17]];
//     let i19 = await document.createElement('TD' ); i19.classList.add('li'); i19.innerHTML= dato[encabezados[18]];
//     let i20 = await document.createElement('TD' ); i20.classList.add('li'); i20.innerHTML= dato[encabezados[19]];
//     let i21 = await document.createElement('TD' ); i21.classList.add('li'); i21.innerHTML= dato[encabezados[20]];
//     let i22 = await document.createElement('TD' ); i22.classList.add('li'); i22.innerHTML= dato[encabezados[21]];
//     let i23 = await document.createElement('TD' ); i23.classList.add('li'); i23.innerHTML= dato[encabezados[22]];
//     let i24 = await document.createElement('TD' ); i24.classList.add('li'); i24.innerHTML= dato[encabezados[23]];
//     let i25 = await document.createElement('TD' ); i25.classList.add('li'); i25.innerHTML= dato[encabezados[24]];
//     let i26 = await document.createElement('TD' ); i26.classList.add('li'); i26.innerHTML= dato[encabezados[25]];
//     let i27 = await document.createElement('TD' ); i27.classList.add('li'); i27.innerHTML= dato[encabezados[26]];
//     let i28 = await document.createElement('TD' ); i28.classList.add('li'); i28.innerHTML= fecha;
//     let i29 = await document.createElement('TD' ); i29.classList.add('li'); i29.innerHTML= dato[encabezados[28]];
//     let i30 = await document.createElement('TD' ); i30.classList.add('li'); i30.innerHTML= dato[encabezados[39]];
//     let i31 = await document.createElement('TD' ); i31.classList.add('li'); i31.innerHTML= dato[encabezados[30]];
//     let i32 = await document.createElement('TD' ); i32.classList.add('li'); i32.innerHTML= dato[encabezados[31]];
//     let i33 = await document.createElement('TD' ); i33.classList.add('li'); i33.innerHTML= dato[encabezados[32]];
//     let i34 = await document.createElement('TD' ); i34.classList.add('li'); i34.innerHTML= dato[encabezados[33]];
//     await cel.append(i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,i30,i31,i32,i33,i34);
//     console.log(cel);
//   }
//     // lista.appendChild(cel);
//     // tabla.appendChild(lista);
//     starIndex=endIndex;
//     endIndex=Math.min(endIndex + contador, Object.values(datos).length);
//   }
//   await setTimeout(async() =>carga(),3000); 
//   table.style.cursor="progress";
//   let cargando = setInterval(async() => {
//     try {
//       if(endIndex<Object.values(datos).length){
//         await carga();
//         console.log('cargando mas');
//       }else{
//       table.style.cursor="default";
//       clearInterval(cargando);
//     }
//     } catch (err) {
//       console.log(err);
//     }
//   },10000);
// }


// // MODAL DE ERRORES
// const error = (e)=>{
//   // crear elementos
//   const content = document.createElement('DIV');
//   const modal= document.createElement(`DIV`);
//   const img= document.createElement('IMG');
//   const texto = document.createElement('SPAN');
//   const fin = document.createElement('IMG');
//   const carga = document.createElement('DIV');
//   const txtBar = document.createElement('SPAN');
//   let count = 0;

// // agregar clase
//   content.classList.add('content-modal');
//   modal.classList.add('modal');
//   texto.classList.add('txt-modal');
//   img.classList.add('img-modal');
//   img.setAttribute('src','../img/404.svg');
//   fin.classList.add('x-modal');
//   fin.setAttribute('src','../img/x.svg');
//   carga.classList.add('carga');
//   txtBar.classList.add('txt-bar');

// // cargar todo en el DOM
// texto.innerHTML=e.error;
// modal.appendChild(img);
// modal.appendChild(texto);
// carga.appendChild(txtBar);
// content.appendChild(fin);
// content.appendChild(modal)
// content.appendChild(carga);
// main.appendChild(content);

// // APICLAR LA CARGA
// fin.addEventListener('click',()=>{
// count = 100;
// });
// let interval =setInterval(()=>{
// if(count===100){
//   content.remove();
//   clearInterval(interval);
// }else{
//   count = count + 1
//   carga.style.width=`${count}%`
//   txtBar.textContent= `${count}%`
// }
// },'20');
// }

// // BLANCO
// const blanco= ()=>{
//   desde.value ='';
//   hasta.value='';
//   servicio.value='';
//   centro.value='';
//   entidad.value='';
//   delete consulta.desde;
//   delete consulta.hasta;
//   delete consulta.servicio;
//   delete consulta.centro;
//   delete consulta.entidad;
// }

// // BORRAR CONTENIDO DEL LISTADO
// const borrar= ()=>{
//   let item1 = document.querySelector('.encabezado');
//   let item2 = document.querySelector('.lista-item');
//   if(item1 && item2){
//     item1.remove();
//     item2.remove();
//     encabezados=[];
//   }
// }



// // HACER CONSULTA SIMPLE
// boton.addEventListener('click',async(e)=>{
//     e.preventDefault();
//     if(!consulta.servicio)consulta.servicio='';
//     if(!consulta.centro)consulta.centro='';
//     if(!consulta.entidad)consulta.entidad='';
//     // console.log(consulta);
//     let tipo = 'btn'
//     myWorker.postMessage([tipo,consulta]);
//       myWorker.onmessage = function(e) {
//         let respuesta = e.data;
//         // console.log(respuesta)
//         if(respuesta.error)return error(respuesta);
//         borrar();
//         encabezado(respuesta);
//         listado(respuesta);
//       }
// });

// // GENERAR XLSX PARA DESCARGAR 
// xlsx.addEventListener('click',async()=>{
// const cursor = document.querySelector('.cursor');
// if(!consulta.servicio)consulta.servicio='';
// if(!consulta.centro)consulta.centro='';
// if(!consulta.entidad)consulta.entidad='';
//    // console.log(consulta);
//   let tipo = "xlsx"
//   myWorker.postMessage([tipo,consulta]);
//   cursor.style.cursor = "progress";
//   table.style.cursor = "progress";
//   myWorker.onmessage = function(e) {
//     let respuesta = e.data;
//     if(respuesta.error){
//       cursor.style.cursor = "pointer";
//       content.style.cursor = 'default'
//       return error(respuesta)
//     }
//    descargar(respuesta);
//    cursor.style.cursor = "pointer";
//    table.style.cursor = 'default'
//   }
// });

generarReporte = function() {

    event.preventDefault()
    
    let value_select = select.value

    if (value_select == ''){
        table.innerHTML = ''
    }

    if (value_select == 'getall') {
        console.log('todos')
   
        fetch(`http://${API_URL}/fcdn/trazabilidad`,{
            method:'GET'
        }).then(res=>res.json()).then(res=>{
            console.log('Datos recibidos:', res);
            options(res);
        })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
        };

    if (value_select == 'morosos'){
        console.log('morosos')
     
        fetch(`http://${API_URL}/fcdn/morosos`,{
            method:'GET'
        }).then(res=>res.json()).then(res=>{
            console.log('Datos recibidos:', res);

            // console.log(res)
            options_morosos(res);
        })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
        };

    }
        
    
