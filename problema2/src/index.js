function getData(url){
  
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      
      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
        }
        else {
          reject(Error(req.statusText));
        }
      }
   
      req.onerror = function() {
        reject(Error("Network Error"));
      }
  
      req.send()
     
    })
};
  let data;
getData('https://swapi.dev/api/people/?')
  .then((respuesta) => {
    data = JSON.parse(respuesta)
  })
  .then(() => {
      
   mostrarData(data);
   
  })

let constructor = false;
const mostrarData = (data) => {
   const datalist = data.results;
   const contenedor =  document.getElementById('root');
   const contenedorModal = document.getElementById('root_modal')

   contenedor.innerHTML = "";
   contenedorModal.innerHTML = "";
    for (let i = 0; i < datalist.length; ++i) {
        contenedor.innerHTML += (`<div id="${datalist[i].name}" class="peoplelist">
       <p class="namepeople">${datalist[i].name}</p>
       </div>`);
        if (constructor === false) {
            contenedorModal.innerHTML += `<div id="modal_${datalist[i].name}" style="display:none;" class="modal">
                                                <div class="contenedor_modal">
                                                    <div class="header_modal">
                                                        <h1>${datalist[i].name} - Detalles</h1>
                                                        <button type="button" class="close">X</button>
                                                    </div>
                                                    <div class="cuerpo_modal">
                                                        
                                                        <div class= "letrasdentromodal"><strong>Nombre: </strong><span>${datalist[i].name}</span></div>
                                                        <div class= "letrasdentromodal"><strong>Año nacimiento: </strong><span>${datalist[i].birth_year}</span></div>
                                                        <div class= "letrasdentromodal"><strong>Genero: </strong><span>${datalist[i].gender}</span></div>
                                                        <div class= "letrasdentromodal" id="planeta_${datalist[i].name}"></div>
                                                        <div class= "letrasdentromodal" id="pelicula_${datalist[i].name}"> <strong>Peliculas: </strong></div>
                                                    </div>
                                                </div>
                                            </div>`;

                                
                    mostrarPlaneta(datalist[i]);                  
                    mostrarPelicula(datalist[i]);
   
        };
    };
    modal()
    constructor = true;
 let btnNext= document.getElementById('next')
btnNext.addEventListener('click', () => {
    contenedor.innerHTML = "";
    contenedorModal.innerHTML = "";
   
        let otraData;
        getData(data.next)
          .then((respuesta) => {
            otraData = JSON.parse(respuesta)
            console.log(otraData.results)
          })
          .then(() => {
              
           mostrarData(otraData);
           
          })
    
});
}

const modal= () => {
    let elements = document.getElementsByClassName("peoplelist");
    for (let i = 0; i < elements.length; i++) {
        let elemento = elements[i]
        elemento.addEventListener('click', function () {
            document.getElementById('modal_' + elemento.id).style.display = "flex";
        },false);
    }
    let modales = document.getElementsByClassName("close");
    for (let i = 0; i < modales.length; i++) {
        let elemento = modales[i]
        elemento.addEventListener('click', function () {
            elemento.closest('.modal').style.display = "none";
        },false);
    }
}

const mostrarPlaneta = (planeta) =>{
        let origen;
        getData(planeta.homeworld)
        .then(respuesta => {
          origen = JSON.parse(respuesta)
       
          let divplaneta = document.getElementById(`planeta_${planeta.name}`);
           return divplaneta.innerHTML += `<strong>Planeta origen: </strong><span>${origen.name}</span> `;
        })

}

const mostrarPelicula = (pelicula) =>{
    let origenPelicula;
    let peliculaList = pelicula.films;
    for (i=0; i < peliculaList.length; i++)
    {
        getData(peliculaList[i])
        .then(respuesta => {
            origenPelicula = JSON.parse(respuesta)
       
          let divpelicula = document.getElementById(`pelicula_${pelicula.name}`);
           return divpelicula.innerHTML += `<ul>
           <li><span>${origenPelicula.title}</span></li>
       </ul> `;
        })
    }
    

}

