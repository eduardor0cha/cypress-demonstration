import { expect } from "chai";
import AuthAPI from "../../src/api/AuthAPI";

describe("AuthAPI", () => {
  it("deve retornar os dados do usuário ao fazer login", async () => {
    cy.intercept("POST", "https://api-teste.com/api/auth/login", {
      statusCode: 200,
      fixture: "login-response.json",
    });

    const api = new AuthAPI();
    const response = await api.login("teste@teste.com", "123456");
    expect(response);
    expect(response.id);
    expect(response.name);
    expect(response.username);
    expect(response.age);
  });

  it("deve retornar um erro ao tentar logar com dados inválidos", async () => {
    cy.intercept("POST", "https://api-teste.com/api/auth/login", {
      statusCode: 400,
    });

    const api = new AuthAPI();
    expect(await api.login("teste@teste.com", "123456")).not.true;
  });
});
