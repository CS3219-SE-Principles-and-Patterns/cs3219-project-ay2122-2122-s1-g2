/// <reference types="cypress" />

describe("login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:7000");
  });
  it("switch to register component", () => {
    cy.contains(/^Sign Up$/).should("not.exist");
    cy.contains(/^Already have an Account?$/).should("not.exist");
    cy.contains(/^Register$/)
      .should("be.visible")
      .click();
    cy.contains(/^Sign Up$/).should("be.visible");
    cy.contains(/^Register$/).should("be.visible");
    cy.contains("Already have an Account?").should("be.visible");
  });
  it("switch to forget password", () => {
    cy.contains(/^Reset Password$/).should("not.exist");
    cy.contains("Forget Password?").should("be.visible");
    cy.contains(/^Click Here$/)
      .should("be.visible")
      .click();
    cy.contains(/^Forget Password$/).should("be.visible");
    cy.contains(/^Reset Password$/).should("be.visible");
  });
  it("login", () => {
    cy.get('input[name="username"]')
      .should("be.visible")
      .should("not.have.value")
      .type("passwordis1234")
      .should("have.value", "passwordis1234");
    cy.get('input[name="password"]')
      .should("be.visible")
      .should("not.have.value")
      .type("1234")
      .should("have.value", "1234");
    cy.contains(/^Log In$/)
      .should("be.visible")
      .click();
    cy.contains(/^Language Learners$/).should("be.visible");
  });
});
