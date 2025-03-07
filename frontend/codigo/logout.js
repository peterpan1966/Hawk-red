"user strickt";

fetch(`http://${API_URL}/fcdn`,{
    method: "PATCH", 
    body: JSON.stringify({'tengo':'token'}),
    headers: {"Authorization": "Bearer <token_de_acceso>", // Ejemplo de encabezado de autorización
    "Content-Type": "application/json"},
    credentials: "include"
  }).then(res => {
    // console.log(res);
    if(!res.ok)window.location.href = `http://${baseUrl}`  //'http://192.168.88.175:8000'  //'http://10.0.1.23:8000'
  });

// COLOR USUARIO 
if(!localStorage.getItem(`${document.cookie.split('=')[1]}`)){
  let red = Math.floor(Math.random() * (256 - 128) + 128); // Rango: 128 a 255 (excluyendo 0)
  let green = Math.floor(Math.random() * (256 - 128) + 128); // Rango: 128 a 255 (excluyendo 0)
  let  blue = Math.floor(Math.random() * (256 - 128) + 128); // Rango: 128 a 255 (excluyendo 0)
  let color = `rgb(${red}, ${green}, ${blue})`;
  localStorage.setItem(`${document.cookie.split('=')[1]}`,`${color}`);
}

// INICALES USUARAIO
const log = document.querySelector('.login');
log.innerHTML = document.cookie.split('=')[1];
log.style.background = localStorage.getItem(`${document.cookie.split('=')[1]}`);


// CERRAR SESION
log.addEventListener("click",()=>{
    // CREAR CERRAR SESION
    let sesion = document.querySelector(".sesion");
    let cerrar = document.querySelector(".cerrar-sesion");
    
    if (sesion.classList.contains("cerrado")){
      sesion.style.display="inline";
      sesion.classList.replace("cerrado","abierto");
    }else if(sesion.classList.contains("abierto")){
      sesion.style.display="none";
      sesion.classList.replace("abierto","cerrado");
    }
    cerrar.addEventListener("click",()=>{
    
      fetch(`http://${API_URL}/fcdn/`,{  
        method: "DELETE",
        body: JSON.stringify({eliminar:'token'}),
        headers:{'Content-Type':'application/json'},
        credentials: 'include'
      }).then(res=>{
        if(res.ok)window.location.href = `http://${baseUrl}`  //,'http://192.168.88.175:8000'  `http://${baseUrl}`    //'http://10.0.1.23:8000';
      })
    });
});