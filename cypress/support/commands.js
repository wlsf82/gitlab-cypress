// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
    cy.visit("users/sign_in");

    cy.get("[data-qa-selector='login_field']").type(Cypress.env("user_name"));
    cy.get("[data-qa-selector='password_field']").type(Cypress.env("user_password"));
    cy.get("[data-qa-selector='sign_in_button']").click();
});

Cypress.Commands.add("createAccessToken", name => {
    cy.visit("profile/personal_access_tokens");

    cy.get(".qa-personal-access-token-name-field").type(name);
    cy.get(".qa-api-radio").check();
    cy.get(".qa-create-token-button").click();

    cy.get(".qa-created-personal-access-token")
      .then($input => $input[0].value);
});

Cypress.Commands.add("createProject", project => {
    cy.visit("projects/new");

    cy.get("#project_name").type(project.name);
    cy.get("#project_description").type(project.description);
    cy.get(".qa-initialize-with-readme-checkbox").check();
    cy.contains("Create project").click();
});

Cypress.Commands.add("createProjectViaApi", (accessToken, name) => {
    cy.request(
        "POST",
        `/api/v4/projects/?private_token=${accessToken}`,
        { name }
    );
})

Cypress.Commands.add("createIssue", issue => {
    cy.visit(`${Cypress.env("user_name")}/${issue.project}/issues/new`);

    cy.get(".qa-issuable-form-title").type(issue.title);
    cy.get(".qa-issuable-form-description").type(issue.description);
    cy.contains("Submit issue").click();
});

Cypress.Commands.add("createPublicGroup", group => {
    cy.visit("groups/new");

    cy.get("#group_name").type(group.name);
    cy.get("#group_description").type(group.description);
    cy.get("#group_visibility_level_20").check();
    cy.contains("Create group").click();
});

Cypress.Commands.add("createGroupLabel", label => {
    cy.visit(`groups/${label.group}/-/labels/new`);

    cy.get(".qa-label-title").type(label.title);
    cy.contains("Create label").click();
});
