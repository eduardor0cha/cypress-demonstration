describe("Primeiro teste", () => {
  it("fazer login", () => {
    cy.visit("http://localhost:3000");

    cy.get(".input-email").type("teste@teste.com");
    cy.get(".input-password").type("123456");
    cy.contains("Entrar").click();

    cy.url().should("include", "/home");
  });
});
