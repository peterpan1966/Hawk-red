
onmessage = async (e)=> {
    // console.log('Worker');
    const consulta = e.data[1];
    if(e.data[0] === "btn") {
      // console.log('btn')
      const datos= await fetch (`http://${API_URL}/fcdn/trazabilidad`,{ 
      method:"POST",
      body: JSON.stringify(consulta),
      headers:{'Content-Type':'application/json'},
      credentials: 'include'
    }).then(res=>{return res.json();}).then(res=>{return res});
    // console.log('Worker: Posting message back to main script');
    return postMessage(datos);
    }
    // SI LA CONSULTA ES DE DESCARGA
    if(e.data[0]==='xlsx'){
      // console.log('xlsx')
      const datos= await fetch (`http://${API_URL}/fcdn/trazabilidad/descargar`,{  
        method:"POST",
        body: JSON.stringify(consulta),
        headers:{'Content-Type':'application/json'},
        credentials: 'include'
      }).then(res=>{
        const content = res.headers.get('Content-Type');
        if(content.includes('application/json'))return res.json();
        return res.blob();}).then(res=>{return res});
      return postMessage(datos);
  }
  }