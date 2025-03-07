import excel4node from 'excel4node';

 export const excel = async(datos)=>{

  // console.log(Object.keys(datos[0]))
  let encabezado = Object.keys(datos[0]);

  // let file = `Reporte-1${Date.now()}.xlsx`;

  const wb= new excel4node.Workbook();
  const ws = wb.addWorksheet();

// console.log(datos);

// console.log(encabezado)

for (let i = 0; i < encabezado.length; i++) {
  ws.cell(1, i + 1).string(encabezado[i]);
}

for (let i = 0; i < datos.length; i++) {
  // Empezar a escribir en la fila siguiente a los encabezados
  const rowIndex = i + 2;

  // Escribir cada propiedad del objeto en una columna
  for (let j = 0; j < encabezado.length; j++) {
    let data = datos[i][encabezado[j]]
    // console.log(encabezado[j]);
    // console.log(typeof(data));
    if (encabezado[j]==='FechaFactura'){
      let año = data.getFullYear();
      let  mes = data.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, hay que sumarle 1
      let dia = data.getDate()
      let fecha  = `${dia}/${mes}/${año}`;
      ws.cell(rowIndex, j + 1).string(fecha);
    }else if(typeof(data)==='number'){
      ws.cell(rowIndex, j + 1).number(data);
    }else{
      ws.cell(rowIndex, j + 1).string(data);
    }
  }
}
// console.log(datos)
   let buffer =await wb.writeToBuffer();
  //  const str = buffer.toString();
  //  console.log(str);
   return buffer;
}