const faker = require("faker");

describe("Create Group", () => {
    beforeEach(() => cy.login());

    it("successfully creates a group", () => {
        const group = {
            name: faker.random.uuid(),
            description: faker.random.words(5)
        };

        cy.createPublicGroup(group);

        cy.url().should("be.equal", `${Cypress.config().baseUrl}${group.name}`);
        cy.contains(group.name).should("be.visible");
    });
});