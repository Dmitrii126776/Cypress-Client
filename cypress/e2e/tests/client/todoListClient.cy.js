import todoListClientPage from "../../../pages/client/todoListClient.page";
import userEmail from "../../../fixtures/userEmail.json";

describe('Client TodoList Tests', () => {

    beforeEach('Successfully loads to TodoList Page', () => {
        cy.session('performApiLogin', () => {
            cy.apiLogin(userEmail.selenium, Cypress.env('USER_PASSWORD'));
        });
        // cy.loginSession(userEmail.selenium, Cypress.env('USER_PASSWORD'));
        cy.visit('/')
        todoListClientPage.interceptGetTasks();
        todoListClientPage.navigateTodoList();
        todoListClientPage.verifyTodoListGroup();
    });

    after('Logout', () => {
        cy.logout();
        // cy.apiLogout();
    });

    it('TC-1 - Add a new task', () => {
        todoListClientPage.navigateToCreateModal()
        todoListClientPage.createNewTask();
        todoListClientPage.verifyNameAndDateCreatedTask();
    });

    it('TC-2 - Update task name', () => {
        todoListClientPage.navigateToUpdateModal();
        todoListClientPage.updateTaskAndVerifyName();
    });

    it('TC-3 - Complete updated task', () => {
        todoListClientPage.completeTask();
        todoListClientPage.verifyTaskWasCompleted();
    });

    it('TC-4 - Remove task from todolist', () => {
        todoListClientPage.navigateToDeleteModal();
        todoListClientPage.deleteTaskFromTodoList();
        todoListClientPage.verifyTaskWasDeleted();
    });
})
