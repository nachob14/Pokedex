export let offset = 0;
export function modificarOffset(valor){
    offset += valor;
}
//let URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;

export async function obtenerPokemones() {
    try{ const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
    const datos = await respuesta.json();
    return datos;
    } catch {
        console.log('Error');
    };
}
