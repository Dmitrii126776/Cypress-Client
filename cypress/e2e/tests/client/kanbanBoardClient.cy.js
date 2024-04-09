import kanbanBoardClientPage from "../../../pages/client/kanbanBoardClient.page";

describe('Client KanbanBoard Tests', () => {
    beforeEach('Successfully loads to KanbanBoard Page', () => {
        cy.visit('/')
        kanbanBoardClientPage.interceptGetNumbers();
        kanbanBoardClientPage.navigateToKanbanBoard();
        kanbanBoardClientPage.verifyKanbanBoard();
    });

    it('TC-11 - Update card data', () => {
        kanbanBoardClientPage.selectRandomCardFromBoard();
        kanbanBoardClientPage.selectRandomAssigneeStatusPriorityAndSave();
        cy.reload()
        kanbanBoardClientPage.verifyKanbanBoard();
        kanbanBoardClientPage.verifyNewAssigneeStatusPriorityOnBoard();
    });
});
