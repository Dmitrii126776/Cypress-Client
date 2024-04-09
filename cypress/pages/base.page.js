import {navbar} from "../helpers/selectors";

export default class BasePage {
    navigateTodoList() {
        cy.get(navbar.todolist).should("be.visible").click();
    }

    navigateToKanbanBoard() {
        cy.get(navbar.kanbanBoard).should("be.visible").click();
    }

    navigateToBackLogBoard() {
        cy.get(navbar.backlogBoard).should("be.visible").click();
    }

    navigateToAnimalsBoard() {
        cy.get(navbar.animalsBoard).should("be.visible").click();
    }


}
