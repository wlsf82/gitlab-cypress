const faker = require("faker");

describe("Create Project", () => {
    beforeEach(() => cy.login());

    it("successfully creates a project", () => {
        const project = {
            name: faker.random.uuid(),
            description: faker.random.words(5)
        };

        cy.createProject(project);

        cy.url().should("be.equal", `${Cypress.config().baseUrl}${Cypress.env("user_name")}/${project.name}`);
        cy.contains(project.name).should("be.visible");
        cy.contains(project.description).should("be.visible");
    });
});