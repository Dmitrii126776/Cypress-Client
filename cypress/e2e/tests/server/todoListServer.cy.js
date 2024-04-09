/// <reference types="cypress" />

import {createTodayDate, getRandomNumberBetween} from "../../../helpers/utilities";

const url = Cypress.env('urlServer');

describe('Server TodoList Tests', () => {
    const newTask = "New Task # " + getRandomNumberBetween(10000, 99999);
    const updatedTask = "Updated " + newTask;
    const createDate = createTodayDate();
    let taskId;

    it('TC1 - Add a new task', () => {
        cy.api('POST', `${url}/tasks`, {
            name: newTask,
            created: {
                date: createDate,
                status: true,
            },
            completed: {
                date: '',
                status: false,
            },
        }).then((response) => {
            expect(response.headers).to.include({
                'content-type': 'application/json; charset=utf-8',
            });
            expect(response).to.include.keys('headers', 'duration');
            expect(response).property('status').to.equal(201);
            expect(response).property('statusText').to.equal("Created");
            expect(response).property('body').to.contain({
                name: newTask,
            })
            expect(response.body.created).to.have.property('date', createDate)
            expect(response.body).to.have.property('_id')
            taskId = response.body._id;
            cy.log(taskId);
        });
    });

    it('TC2 - Get list of tasks ', () => {
        cy.api('GET', `${url}/tasks`)
            .then(response => {
                expect(response).to.include.keys('headers', 'duration');
                expect(response.status).to.equal(200);
                expect(response.headers).to.have.property('content-type');
                expect(response).property('body')
                    .to.have.property('length')
                    .and.to.be.gt(1);
                const tasksList = response.body;
                const task = tasksList.find(el => el._id === taskId);
                expect(task.name).to.equal(newTask);
            });
    });

    it('TC3 - Update new task', () => {
        cy.api('PATCH', `${url}/tasks/${taskId}`, {
            name: updatedTask,
            completed: {
                date: createDate,
                status: true,
            },
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response).to.include.keys('headers', 'duration');
        });

        cy.api('GET', `${url}/tasks/${taskId}`)
            .then(response => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('name', updatedTask);
                expect(response.body.created).to.have.property('date', createDate);
                expect(response.body.created).to.have.property('status', true);
            });

    });

    it('TC4 - Remove updated task', () => {
        cy.log(taskId);
        cy.api('DELETE', `${url}/tasks/${taskId}`)
            .then((response) => {
                expect(response.status).to.equal(204);
            });
        cy.request({
            url: `${url}/tasks/${taskId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(404);
            expect(response).property('statusText').to.equal("Not Found");
        });
    });
})
