"user strict";
  

  fetch(`http://${API_URL}/fcdn`, {
    method: "PATCH", 
    body: JSON.stringify({'tengo':'token'}),
    headers: {"Authorization": "Bearer <token_de_acceso>", // Ejemplo de encabezado de autorización
    "Content-Type": "application/json"},
    credentials: "include"
  }).then(res => {
    if(res.ok	) window.location.href =  `http://${baseUrl}/fcdn/trazabilidad`;  //'baseUrl/fcdn/trazabilidad';  
    
    return 'ok';
  });


// const boton = document.querySelector(`.content-login`);
// const usuario = document.querySelector(`.usuario`);
// const password = document.querySelector(`.password`);
// const usaer = document.querySelector('#user');
// const consulta={};

const boton = document.querySelector(`#submit-btn`);
const form = document.querySelector(`.form`);
const usuario = document.querySelector(`#usuario`);
console.log("usuario: ", usuario.value);
const password = document.querySelector(`#password`);
const usaer = document.querySelector('#user');
const consulta={};
console.log(consulta);


usuario.addEventListener('input',(e)=> consulta.usuario = e.target.value)
password.addEventListener('input',(e)=> consulta.password = e.target.value);

usuario.addEventListener("change",(e)=>{
  console.log(e.target.value)
});


const blanco = ()=>{
    usuario.value='';
    password.value='';
    delete consulta.usuario;
    delete consulta.pass;
}

const error = (e)=>{
    const main = document.querySelector(".main");
    // crear elementos
    const content = document.createElement('DIV');
    const modal= document.createElement(`DIV`);
    const img= document.createElement('IMG');
    const texto = document.createElement('SPAN');
    const fin = document.createElement('IMG');
    const carga = document.createElement('DIV');
    const txtBar = document.createElement('SPAN');
    let count = 0;
  
  // agregar clase
    content.classList.add('content-modal');
    modal.classList.add('modal');
    texto.classList.add('txt-modal');
    img.classList.add('img-modal');
    img.setAttribute('src','../img/404.svg');
    fin.classList.add('x-modal');
    fin.setAttribute('src','../img/x.svg');
    carga.classList.add('carga');
    txtBar.classList.add('txt-bar');
  
  // cargar todo en el DOM
  e.then(res=>{if(res){
    console.log(res.error);
    texto.innerHTML=res.error}});
  modal.appendChild(img);
  modal.appendChild(texto);
  carga.appendChild(txtBar);
  content.appendChild(fin);
  content.appendChild(modal)
  content.appendChild(carga);
  main.appendChild(content);
  
  // APICLAR LA CARGA
  fin.addEventListener('click',()=>{
  count = 100;
  });
  let interval =setInterval(()=>{
    if(count===100){
      content.remove();
      clearInterval(interval);
    }else{
      count = count + 1
      carga.style.width=`${count}%`
      txtBar.textContent= `${count}%`
    }
    },'30');
  blanco();
  }

// aqui cambie form por boton
form.addEventListener(`submit`, async(e)=>{
e.preventDefault();
 console.log(consulta);

await fetch ( `http://${API_URL}/fcdn/`,{ 
  method:'POST',
  body:JSON.stringify(consulta),
  headers:{'Content-Type':'application/json'},
  credentials: 'include'
}).then(res=>{
// console.log(res);
    if(res.ok){
       console.log('logeado');
        setTimeout(()=>{
        window.location.href = `http://${baseUrl}/fcdn/clientes.html`;   // agregue .html para que funciine le cambie tarzabilidad por clientes
      
            },'1500');
        // console.log(res.json());
            return 'aceptado';
    }
    error(res.json())
    return'Error'

});
blanco();
});