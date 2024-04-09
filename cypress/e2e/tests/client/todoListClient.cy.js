import todoListClientPage from "../../../pages/client/todoListClient.page";

describe('Client TodoList Tests', () => {

    beforeEach('Successfully loads to TodoList Page', () => {
        cy.visit('/')
        todoListClientPage.interceptGetTasks();
        todoListClientPage.navigateTodoList();
        todoListClientPage.verifyTodoListGroup();
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

    it('TC-2 - Complete updated task', () => {
        todoListClientPage.completeTask();
        todoListClientPage.verifyTaskWasCompleted();
    });

    it('TC-4 - Remove task from todolist', () => {
        todoListClientPage.navigateToDeleteModal();
        todoListClientPage.deleteTaskFromTodoList();
        todoListClientPage.verifyTaskWasDeleted();
    });
})
