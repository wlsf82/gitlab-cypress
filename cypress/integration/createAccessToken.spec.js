const faker = require("faker");

describe("Create Access Token", () => {
    beforeEach(() => cy.login());

    it("successfully creates an access token", () => {
        cy.createAccessToken(faker.random.uuid());

        cy.contains("Your new personal access token has been created.")
          .should("be.visible");
    });
});
