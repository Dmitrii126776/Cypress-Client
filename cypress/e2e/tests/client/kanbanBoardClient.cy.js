import kanbanBoardClientPage from "../../../pages/client/kanbanBoardClient.page";
import userEmail from "../../../fixtures/userEmail.json";

describe('Client KanbanBoard Tests', () => {
    beforeEach('Successfully loads to KanbanBoard Page', () => {
        // cy.session('performLogin', () => {
        //     cy.login(userEmail.cypress, Cypress.env('USER_PASSWORD'));
        // });
        cy.loginSession(userEmail.cypress, Cypress.env('USER_PASSWORD'));
        cy.visit('/')
        kanbanBoardClientPage.interceptGetNumbers();
        kanbanBoardClientPage.navigateToKanbanBoard();
        kanbanBoardClientPage.verifyKanbanBoard();
    });

    after('Logout', () => {
        cy.logout();
        // cy.apiLogout();
    });

    it('TC-10 - Created new Card', () => {
        cy.contains('button', 'AddNewTask').should("be.visible").click();
        cy.contains('Create Task Modal').should("be.visible");
        cy.contains('button', 'Create').should("be.visible").and("not.be.enabled");
    })

    it('TC-11 - Update card data', () => {
        kanbanBoardClientPage.selectRandomCardFromBoard();
        kanbanBoardClientPage.selectRandomAssigneeStatusPriorityAndSave();
        cy.reload()
        kanbanBoardClientPage.verifyKanbanBoard();
        kanbanBoardClientPage.verifyNewAssigneeStatusPriorityOnBoard();
    });

    it('TC-12 - Moving card using drag and drop random', () => {
        kanbanBoardClientPage.findDragAndDropCard();
        kanbanBoardClientPage.moveCardToAnotherBoardRandom();
    });

});
