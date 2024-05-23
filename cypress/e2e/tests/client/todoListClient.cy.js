import todoListClientPage from "../../../pages/client/todoListClient.page";

const url = Cypress.env('URL_SERVER');
describe('Client TodoList Tests', () => {
    /*
        before('Login function', () => {
            cy.api('POST', `${url}/login`, {
                email: 'cypress@mail.com',
                password: '1234'
            }).then((response) => {
                cy.log(response.body)
                process.env.ACCESS_TOKEN = response.body.accessToken;
                expect(response).property('status').to.equal(200);
                expect(response).property('statusText').to.equal("OK");
                localStorage.setItem('token', response.body.accessToken);
            });
        });

        beforeEach('Successfully loads to TodoList Page', () => {
            cy.log(process.env.ACCESS_TOKEN)
            cy.visit('/')
            todoListClientPage.interceptGetTasks();
            todoListClientPage.navigateTodoList();
            todoListClientPage.verifyTodoListGroup();
        });
    */
    beforeEach('Successfully loads to TodoList Page', () => {
        cy.api('POST', `${url}/login`, {
            email: 'cypress@mail.com',
            password: Cypress.env('USER_PASSWORD')
        }).then((response) => {
            // process.env.ACCESS_TOKEN = response.body.accessToken;
            expect(response).property('status').to.equal(200);
            expect(response).property('statusText').to.equal("OK");
            localStorage.setItem('token', response.body.accessToken);
        });
        cy.visit('/')
        todoListClientPage.interceptGetTasks();
        todoListClientPage.navigateTodoList();
        todoListClientPage.verifyTodoListGroup();
    });

    after('Logout', () => {
        cy.api('POST', `${url}/logout`).then(() => {
            localStorage.removeItem('token')
        })
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
