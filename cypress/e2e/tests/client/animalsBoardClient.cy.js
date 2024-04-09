import animalsBoardClientPage from "../../../pages/client/animalsBoardClient.page";

describe('Animals Board Client Tests', () => {

    beforeEach('Successfully loads to AnimalsBoard Page', () => {
        cy.visit('/')
        animalsBoardClientPage.interceptGetAnimals();
        animalsBoardClientPage.navigateToAnimalsBoard();
        animalsBoardClientPage.verifyAnimalsBoard();
    })

    it('TC-22 - Verify animal card data', () => {

        animalsBoardClientPage.randomSelectAnimal();
        animalsBoardClientPage.navigateToSelectedAnimalPage();
        animalsBoardClientPage.verifyAnimalPageData();
        // cy.go('back')
    });
})
