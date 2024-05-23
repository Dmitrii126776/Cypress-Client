import kanbanBoardClientPage from "../../../pages/client/kanbanBoardClient.page";
import {kanbanBoard} from "../../../helpers/selectors";

describe('Client KanbanBoard Tests', () => {
    beforeEach('Successfully loads to KanbanBoard Page', () => {
        cy.visit('/')
        kanbanBoardClientPage.interceptGetNumbers();
        kanbanBoardClientPage.navigateToKanbanBoard();
        kanbanBoardClientPage.verifyKanbanBoard();
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
});

describe('Client KanbanBoard Moving card using drag and drop', () => {
    beforeEach('Successfully loads to KanbanBoard Page', () => {
        cy.visit('/')
        kanbanBoardClientPage.interceptGetNumbers();
        kanbanBoardClientPage.navigateToKanbanBoard();
        kanbanBoardClientPage.verifyKanbanBoard();
        cy.get(kanbanBoard.cardGroup).contains("Drag&Drop")
            .parent().should("be.visible").then(item => {
            cy.wrap(item).find(kanbanBoard.cardNumber).invoke("text").as("number")
            cy.wrap(item).find(kanbanBoard.cardStatus).invoke("text").as("priority")
        })
    });

    it('TC-12 - Moving card using drag and drop forward', () => {

        const dataTransfer = new DataTransfer();
        cy.get('.item').contains("Drag&Drop").should("be.visible").trigger('dragstart', {dataTransfer})
        cy.get('[data-testid="board-closed"]').trigger('drop', {dataTransfer, force: true})
        cy.get('.item').contains("Drag&Drop").parent().should("be.visible")
            .find('[data-testid="card-status"]').should("be.visible").and("contain.text", "closed")
    })

    it('TC-13 - Moving card using drag and drop back', () => {
        const dataTransfer = new DataTransfer();
        cy.get('.item').contains("Drag&Drop").should("be.visible").trigger('dragstart', {dataTransfer})
        cy.get('[data-testid="board-new"]').trigger('drop', {dataTransfer, force: true})
        cy.get('.item').contains("Drag&Drop").parent().should("be.visible")
            .find('[data-testid="card-status"]').should("be.visible").and("contain.text", "new")

    })
});
