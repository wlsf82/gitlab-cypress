const faker = require("faker");

describe("Create Issue", () => {
    const project = {
        name: faker.random.uuid(),
        description: faker.random.words(5)
    };

    const issue = {
        project: project.name,
        title: faker.random.uuid(),
        description: faker.random.words(3)
    };

    beforeEach(() => {
        cy.login();
        cy.createProject(project);
    });

    it("successfully creates an issue", () => {
        cy.createIssue(issue);

        cy.get(".issue-details").should("contain", issue.title);
        cy.get(".issue-details").should("contain", issue.description);
    });
});