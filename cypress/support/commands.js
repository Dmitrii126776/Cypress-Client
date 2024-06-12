// For more comprehensive examples of custom commands please read more here:
// https://on.cypress.io/custom-commands
// -- This is a parent command --

Cypress.Commands.add('login', (email, password) => {
    cy.intercept("POST", "/login").as("login");
    cy.visit('/');
    cy.getElByTestIdAndClick("nav-button-sign-in");
    cy.url().should('include', 'login');
    cy.getElByTestId("sign-in-form");
    cy.get('input[name="email"]').should("be.visible").type(email);
    cy.get('input[name="password"]').should("be.visible").type(password, {sensitive: true});
    cy.getElByTestIdAndClick("sign-in-button");
    cy.wait('@login').then(xhr => {
        // cy.log(xhr.response.body.user)
        const userName = xhr.response.body.user.firstname;
        expect(xhr.request.body.email).to.equal(email);
        cy.getElByTestId("nav-user-name").and('contain.text', userName);
    });
});

Cypress.Commands.add('apiLogin', (email, password) => {
    cy.api("POST", `${Cypress.env('URL_SERVER')}/login`, {
        email,
        password,
    }).then((response) => {
        Cypress.env('ACCESS_TOKEN', response.body.accessToken);
        expect(response).property('status').to.equal(200);
        expect(response).property('statusText').to.equal("OK");
        localStorage.setItem('token', response.body.accessToken);
    })
});

Cypress.Commands.add('loginSession', (email, password) => {
    cy.session(email, () => {
            cy.apiLogin(email, password)
        }, {cacheAcrossSpecs: true}
    )
})

Cypress.Commands.add('logout', () => {
    cy.getElByTestIdAndClick("nav-user-name");
    cy.getElByTestIdAndClick("logout-link");
    cy.getElByTestId("nav-button-sign-in");
});

Cypress.Commands.add('apiLogout', () => {
    cy.api("POST", `${Cypress.env('URL_SERVER')}/logout`).then((response) => {
        expect(response).property('status').to.equal(200);
        expect(response).property('statusText').to.equal("OK");
    })
});

Cypress.Commands.add('getElByTestId', (textDataId) => {
    cy.get(`[data-testid="${textDataId}"]`).should('be.visible');
});

Cypress.Commands.add('getElByTestIdAndClick', (textDataId) => {
    cy.get(`[data-testid="${textDataId}"]`).should('be.visible').click({force: true});
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        options.log = false;
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        })
    }
    return originalFn(element, text, options);
});
