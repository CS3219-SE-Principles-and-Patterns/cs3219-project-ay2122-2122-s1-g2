/// <reference types="cypress" />

describe("profile page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:7000");
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
    cy.get("[data-testid=AccountCircleIcon]").should("be.visible").click();
    cy.contains(/^Proficiency$/).should("be.visible");
    cy.contains(/^My Flashcards$/).should("be.visible");
  });
});
