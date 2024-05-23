/// <reference types="cypress" />
import {getRandomNumberBetween} from "../../../helpers/utilities";

const url = Cypress.env('URL_SERVER');
let animalId;
let animalName;
let animalType;

describe('Server Animals Board Tests', () => {

    it('Get all animals and select random animal', () => {
        // cy.request(`${url}/animals`).its('status')
        //     .should('equal', 202)
        cy.api(`${url}/animals`)
            .then(response => {
                expect(response.status).to.equal(200);
                expect(response).property('body');
                const animalsList = response.body;
                const index = getRandomNumberBetween(0, animalsList.length - 1)
                const animal = animalsList[index];
                animalId = animal._id;
                animalName = animal.name;
                animalType = animal.type;
            })
    });

    it('Get selected animal and verify data', () => {
        cy.api(`${url}/animals/${animalId}`)
            .then(response => {
                expect(response.status).to.equal(200);
                expect(response).property('body')
                expect(response.body.name).to.equal(animalName)
                expect(response.body.type).to.equal(animalType)
            })
    })
})
