/// <reference types="Cypress" />

const URL = 'http://127.0.0.1:5500/index.html';
const cantidadPokemones = 1126;
const pokemonesPorPagina = 20

context('pokedex', () => {

    before(() => {
        cy.visit(URL);
    })    

    it('se asegura que la cantidad de pokemon sea correcta', () => {
        cy.get('#contadorPokemones').should('contain.text', cantidadPokemones);
    })

    it('se asegura que haya 20 pokemon cargados por pagina', () => {
        cy.get('#contenedorPokemones').find('.col').should('have.length', pokemonesPorPagina)
    })

    it('se asegura que el boton "Next" funciona correctamente', () => {
        cy.get('#botonSiguiente').click();
        cy.get('html').should('not.contain.text', 'bulbasaur');
        cy.get('html').should('contain.text', 'pikachu');
    })

    it('se asegura que el boton "Previous" funciona correctamente', () => {
        cy.get('#botonAnterior').click();
        cy.get('html').should('not.contain.text', 'pikachu');
        cy.get('html').should('contain.text', 'bulbasaur');
    })
})