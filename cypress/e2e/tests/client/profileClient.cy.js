import userEmail from "../../../fixtures/userEmail.json";

describe('Navigate to navBar', () => {
    it('verify user name  and avatar', () => {
        cy.login(userEmail.cypress, Cypress.env('USER_PASSWORD'));
        cy.getElByTestIdAndClick("nav-link-profile")
        cy.get(".weather-item").last().should("be.visible")
        cy.logout();
        // cy.apiLogout();
    });
})
