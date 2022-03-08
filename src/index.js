import { obtenerPokemones } from "./api.js"
import {
    mostrarCantidadPokemones,
    mostrarPokemones,
    manejarEventos,
} from "./ui.js"

function inicializar (){
    obtenerPokemones();
    mostrarCantidadPokemones();
    mostrarPokemones();
    manejarEventos();
}

inicializar();