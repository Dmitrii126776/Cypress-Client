import BasePage from "../base.page";
import {getRandomNumberBetween} from "../../helpers/utilities";
import {kanbanBoard, singleCardPage} from "../../helpers/selectors";

const url = Cypress.env('urlServer');

class KanbanBoardClientPage extends BasePage {
    interceptGetCards() {
        cy.intercept({method: "GET", url: `${url}/cards`}).as("cards");
    }

    interceptGetNumbers() {
        cy.intercept({method: "GET", url: `${url}/numbers`}).as("numbers");
    }

    verifyKanbanBoard() {
        cy.wait("@numbers")
        cy.url().should("include", "kanban");
        cy.get(kanbanBoard.cardGroup).should("be.visible");
    }

    selectRandomCardFromBoard() {
        cy.get(kanbanBoard.cardGroup).should("be.visible").then(items => {
            const item = getRandomNumberBetween(0, items.length - 1)
            cy.wrap(items).eq(item).scrollIntoView()
                .should("be.visible")
                .find(kanbanBoard.cardNumber).then(el => {
                cy.wrap(el).invoke("text").as("cardNumber")
                cy.wrap(el).click();
            })
        });
    }

    selectRandomAssigneeStatusPriorityAndSave() {
        cy.get("@cardNumber").then(cardNumber => {
            cy.get('[data-testid="edit-task-form"]').should("be.visible")
            cy.get(singleCardPage.cardNumber).should("be.visible")
                .and("contain.text", cardNumber)
            cy.log(cardNumber);
            // Select random assignee, status, priority
            cy.get(singleCardPage.assigneeSelectOption).then(option => {
                const assignee = getRandomNumberBetween(0, option.length - 1)
                cy.get(singleCardPage.assigneeSelect).select(assignee)
            })
            cy.get(singleCardPage.statusSelect)
                .should("be.visible").select(getRandomNumberBetween(0, 3))
            cy.get(singleCardPage.prioritySelect)
                .should("be.visible").select(getRandomNumberBetween(0, 9))
            // invoke new assignee, status, priority
            cy.get(singleCardPage.assigneeSelect).should("be.visible")
                .invoke("val").then(value => {
                const text = value.toString();
                cy.log(text);
                cy.wrap(text).as("assignee");
            })
            cy.get(singleCardPage.statusSelect).should("be.visible")
                .invoke("val").then(text => {
                cy.log(text)
                cy.wrap(text).as("status")
            });
            cy.get(singleCardPage.prioritySelect).should("be.visible")
                .invoke("val").then(text => {
                cy.log(text)
                cy.wrap(text).as("priority")
            })
        });
        cy.get('button').contains('Save&Close').click();
    }

    verifyNewAssigneeStatusPriorityOnBoard() {
        cy.get("@cardNumber").then(cardNumber => {
            cy.get("@assignee").then(assignee => {
                cy.get("@status").then(status => {
                    cy.get("@priority").then(priority => {
                        cy.get(kanbanBoard.cardNumber).contains(cardNumber)
                            .parent().parent().should("be.visible").then(el => {
                            cy.wrap(el).find(kanbanBoard.cardNumber)
                                .should("be.visible").and("contain.text", cardNumber);

                            cy.wrap(el).find(kanbanBoard.cardAssignee)
                                .should("be.visible").and("contain.text", assignee);

                            cy.wrap(el).find(kanbanBoard.cardStatus)
                                .should("be.visible").and("contain.text", status);

                            cy.wrap(el).find(kanbanBoard.cardPriority)
                                .should("be.visible").and("contain.text", priority);

                        })
                    })
                })
            });
        });
    }
}

export default new KanbanBoardClientPage();
