describe("Login", () => {
    it("successfully logs in", () => {
        cy.login();

        cy.get(".qa-user-avatar").should("exist");
    });
});
