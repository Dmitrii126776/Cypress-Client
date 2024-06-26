/// <reference types="cypress" />
export {}
declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {
            login(email: string, password: string): Chainable<void>;

            apiLogin(email: string, password: string);

            loginSession(email: string, password: string): Chainable<void>;

            logout(): Chainable<void>;

            apiLogout(): Chainable<void>;

            getElByTestId(textDataId: string): Chainable<void>;

            getElByTestIdAndClick(textDataId: string);
        }
    }
}
