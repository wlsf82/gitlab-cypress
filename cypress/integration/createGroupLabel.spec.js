const faker = require("faker");

describe("Create Group Label", () => {
    const group = {
        name: faker.random.uuid(),
        description: faker.random.words(5)
    };

    beforeEach(() => {
        cy.login();
        cy.createPublicGroup(group);
    });

    it("successfully creates a group label", () => {
        const label = {
            group: group.name,
            title: faker.random.word()
        };

        cy.createGroupLabel(label);

        cy.url().should("be.equal", `${Cypress.config().baseUrl}groups/${group.name}/-/labels`);
        cy.get(".manage-labels-list").should("contain", label.title);
    });
});
