import { obtenerPokemones, modificarOffset, offset } from './api.js'

export function mostrarCantidadPokemones(){
    const contadorPokemones = document.querySelector('#contadorPokemones');
    
    obtenerPokemones().then(datos => {
        let cantidadPokemones = datos.count;
        contadorPokemones.textContent = cantidadPokemones;
    })
}


export function mostrarPokemones(){
    const contenedorPokemones = document.querySelector('#contenedorPokemones');
    contenedorPokemones.innerHTML = ''
    obtenerPokemones().then(datos => {
        let pokemones = datos.results
        for(let i = 0; i < pokemones.length; i++){
            fetch(pokemones[i].url)
                .then(x => x.json())
                .then(x => {
                    contenedorPokemones.innerHTML += `
                                                        <div class="col" id="pokemon${x.id}">
                                                        <div class="card stretched-link tarjeta" style="width: 14rem">
                                                            <img src='${x.sprites.front_default}' class="card-img-top" alt='${x.name} imagen'>
                                                                <div class="card-body" id="cuerpoTarjeta">
                                                                    <p class="card-title text-center fw-bold">${x.name}</p>
                                                                    <li class="list-group=item invisible">Type: ${x.types[0].type.name}</li>
                                                                    <li class="list-group=item invisible">Weight: ${x.weight}</li>
                                                                    <li class="list-group=item invisible">Height: ${x.height}</li>
                                                                </div>
                                                        </div>
                                                    </div>`
                    
                })
        }
        
    })
}



export function manejarEventos(){
    const contenedor = document.querySelector('#contenedorPadre')
    contenedor.onclick = function(e){
        const pokemonSeleccionado = e.target;
        if(pokemonSeleccionado.classList.contains('card')){
            manejarClickUsuario(pokemonSeleccionado)
        };
    }
}

export function manejarClickUsuario(elemento){
    imagen = elemento.querySelector('img');
    elementos = elemento.querySelectorAll('li');

    if(elemento.querySelectorAll('li')[0].classList.contains('invisible')){
        setTimeout(function(){
            elemento.style.opacity = '0';
            imagen.classList.add('invisible');
            for(let i = 0; i < elementos.length; i++){
                elementos[i].classList.remove('invisible');
            }
        }, 150)
        setTimeout(function(){
            elemento.style.opacity = '1';
        }, 600);
        
    } else {
        setTimeout(function(){
            elemento.style.opacity = '0';
            imagen.classList.remove('invisible');
            for(let i = 0; i < elementos.length; i++){
                elementos[i].classList.add('invisible');
            }
        }, 200);
        setTimeout(function(){
            elemento.style.opacity = '1';
        }, 600);
    }
}

const botonAnterior = document.querySelector('#botonAnterior');
const botonSiguiente = document.querySelector('#botonSiguiente');

botonAnterior.onclick = function(){
            if(offset === 0){
                return false;
            } else {
                modificarOffset(-20);
                mostrarPokemones();
            }
};


botonSiguiente.onclick = function(){
        if(offset === 1120){
            return false;
        } else {
            modificarOffset(20);
            mostrarPokemones();
        };
}
