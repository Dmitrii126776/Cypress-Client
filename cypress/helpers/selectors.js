export const navbar = {
    todolist: '[data-testid="nav-link-todolist"]',
    kanbanBoard: '[data-testid="nav-link-kanban"]',
    backlogBoard: '[data-testid="nav-link-backlog"]',
    animalsBoard: '[data-testid="nav-link-animals"]'
}
export const todoList = {
    listGroup: '.list-group',
    taskItem: '.list-group-item',
    addNewTaskButton: '[data-testid="add-new-task-button"]',
    saveTaskButton: '[data-testid="save-task-button"]',
    inputCreateTask: '[data-testid="task-name-input"]',
    modalFooter: '.modal-footer',
    modalHeader: '.modal-header',
    taskCreateDate: '[data-testid="task-created-date"]',
    taskCompletedDate: '[data-testid="task-completed-date"]'
}

export const kanbanBoard = {
    cardGroup: '.item',
    cardNumber: '[data-testid="card-number"]',
    cardAssignee: '[data-testid="card-assignee"]',
    cardStatus: '[data-testid="card-status"]',
    cardPriority: '[data-testid="card-priority"]',
}

export const singleCardPage = {
    cardNumber: '[data-testid="task-number"]',
    assigneeSelectOption: '[data-testid="assignee-select"] option',
    assigneeSelect: '[data-testid="assignee-select"]',
    statusSelect: '[data-testid="status-select"]',
    prioritySelect: '[data-testid="priority-select"]',
}

export const animalsBoard = {
    animalsGroup: '.card',
}
