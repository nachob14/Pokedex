let offset = 0;

//let URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;

async function obtenerPokemones() {
    try{ const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
    const datos = await respuesta.json();
    return datos;
    } catch {
        console.log('Error');
    }
}


function mostrarCantidadPokemones(){
    const contadorPokemones = document.querySelector('#contadorPokemones');
    
    obtenerPokemones().then(datos => {
        let cantidadPokemones = datos.count;
        contadorPokemones.textContent = cantidadPokemones;
    })
}

function mostrarPokemones(){
    const contenedorPokemones = document.querySelector('#contenedorPokemones');
    contenedorPokemones.innerHTML = ''
    obtenerPokemones().then(datos => {
        let pokemones = datos.results
        for(let i = 0; i < pokemones.length; i++){
            fetch(pokemones[i].url)
                .then(x => x.json())
                .then(x => {
                    contenedorPokemones.innerHTML += `<div class="col">
                                                        <div class="card" style="width: 14rem">
                                                            <img src='${x.sprites.front_default}' class="card-img-top" alt='${x.name} imagen'>
                                                                <div class="card-body">
                                                                    <p class="card-title text-center fw-bold">${x.name}</p>
                                                                    <li class="list-group=item">Type: ${x.types[0].type.name}</li>
                                                                    <li class="list-group=item">Weight: ${x.weight}</li>
                                                                    <li class="list-group=item">Height: ${x.height}</li>
                                                                </div>
                                                        </div>
                                                    </div>`
                    
                })
        }
        
    })
}

const botonAnterior = document.querySelector('#botonAnterior');
const botonSiguiente = document.querySelector('#botonSiguiente');

botonAnterior.onclick = function(){
            if(offset === 0){
                return false;
            } else {
                offset -= 20;
                mostrarPokemones();
            }
};


botonSiguiente.onclick = function(){
        if(offset === 1120){
            return false;
        } else {
            offset += 20;
            mostrarPokemones();
        };
}


function inicializar (){
    obtenerPokemones();
    mostrarCantidadPokemones();
    mostrarPokemones();
}

inicializar();