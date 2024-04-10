import BasePage from "../base.page";
import {getRandomNumberBetween} from "../../helpers/utilities";
import {animalsBoard} from "../../helpers/selectors";

const url = Cypress.env('urlServer');

class AnimalsBoardClientPage extends BasePage {
    interceptGetAnimals() {
        cy.intercept({method: "GET", url: `${url}/animals`}).as("animals");
    }

    verifyAnimalsBoard() {
        cy.wait("@animals")
        cy.url().should("include", "animals");
        cy.get(animalsBoard.animalsGroup).should("be.visible");
    }

    randomSelectAnimal() {
        cy.intercept('GET', '/animals/*').as('openNewWindow');

        cy.get(animalsBoard.animalsGroup).should("be.visible").then(cards => {
            // const card = getRandomNumberBetween(0, cards.length - 1)
            const card = 40;
            cy.wrap(cards).eq(card).scrollIntoView().should("be.visible").then(card => {
                cy.wrap(card).find('.card-title')
                    .invoke("text").then(text => {
                    cy.wrap(text).as("animalName")
                })
                cy.wrap(card).find('.card-text').first().then((el =>
                        cy.wrap(el.text()).as("animalType")
                ))
            })
            cy.window().then(win => {
                cy.stub(win, 'open').as('open')
            })
            cy.wrap(cards).eq(card).scrollIntoView().should("be.visible").click();
        });
    }

    navigateToSelectedAnimalPage() {
        cy.wait('@openNewWindow').then(interception => {
            cy.log(interception.request.url)
            const urlParts = interception.request.url.split('/');
            const animalId = urlParts[urlParts.length - 1];
            const url = `/animals/animal/${animalId}`;
            cy.visit(url);
        });
    }

    verifyAnimalPageData() {
        cy.get("@animalName").then(animalName => {
            cy.get("@animalType").then(animalType => {
                cy.get('h1').should("be.visible").and("contain.text", animalName)
                cy.get('h2').should("be.visible").and("contain.text", animalType)
            })
        })
    }

}

export default new AnimalsBoardClientPage();
