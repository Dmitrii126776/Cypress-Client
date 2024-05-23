import BasePage from "../base.page";
import {todoList} from "../../helpers/selectors";
import {createTodayDate, getRandomNumberBetween} from "../../helpers/utilities";

const url = Cypress.env('URL_SERVER');
const newTask = "New Task # " + getRandomNumberBetween(10000, 99999);
const updatedTask = "Updated " + newTask;
const createDate = createTodayDate();

class TodoListClientPage extends BasePage {

    interceptGetTasks() {
        cy.intercept({method: "GET", url: `${url}/tasks`}).as("todolist");
    }

    verifyTodoListGroup() {
        cy.wait("@todolist")
        cy.url().should("include", "tasks");
        cy.get(todoList.listGroup).should("be.visible");
    }

    navigateToCreateModal() {
        cy.get(todoList.addNewTaskButton).should("be.visible").click();
        cy.contains("Create New Task").should("be.visible");
        cy.get(todoList.saveTaskButton).should("be.visible").and("not.be.enabled");
    }

    navigateToUpdateModal() {
        cy.contains(newTask).parentsUntil(todoList.taskItem)
            .should("be.visible")
            .find('button')
            .contains('Update')
            .should("be.visible").click();
        cy.get(todoList.modalHeader).contains("Update Task")
            .should("be.visible");
    }

    navigateToDeleteModal() {
        cy.contains(updatedTask).parentsUntil(todoList.taskItem)
            .should("be.visible")
            .find('button')
            .contains('Remove')
            .should("be.visible").click();
        cy.get(todoList.modalHeader).contains("Remove Task")
            .should("be.visible");
    }

    createNewTask() {
        cy.get(todoList.inputCreateTask).clear().type(newTask);
        cy.contains('button', 'Save').should("be.enabled").click();
    }

    completeTask() {
        cy.contains(updatedTask).parentsUntil(todoList.taskItem)
            .should("be.visible").find('input')
            .should("not.be.checked").click();
    }

    deleteTaskFromTodoList() {
        cy.get('.modal-body').should("contain.text", updatedTask);
        cy.get(todoList.modalFooter).find("button")
            .contains("Remove").should("be.enabled").click();
    }


    verifyNameAndDateCreatedTask() {
        cy.contains(newTask).parentsUntil(todoList.taskItem)
            .should("be.visible").find(todoList.taskCreateDate)
            .should("be.visible")
            .and("contain.text", "Created")
            .and("contain.text", createDate);
    }

    updateTaskAndVerifyName() {
        cy.get('.input-group').find("input").clear().type(updatedTask)
        cy.get(todoList.modalFooter).find("button")
            .contains("Save").should("be.enabled").click();
        cy.contains(updatedTask).parentsUntil(todoList.taskItem)
            .should("be.visible");
    }

    verifyTaskWasCompleted() {
        cy.contains(updatedTask).parentsUntil(todoList.taskItem)
            .should("be.visible").find(todoList.taskCompletedDate)
            .should("be.visible")
            .and("contain.text", "Completed")
            .and("contain.text", createDate);
    }

    verifyTaskWasDeleted() {
        this.verifyTodoListGroup();
        cy.contains(updatedTask).should("not.exist");
    }
}

export default new TodoListClientPage();
