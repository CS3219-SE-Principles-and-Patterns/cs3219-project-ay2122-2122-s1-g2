/// <reference types="cypress" />

describe("page latency check", () => {
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
  });
  it("profile page", () => {
    cy.contains(/^Proficiency$/).should("not.be.visible");
    cy.contains(/^My Flashcards$/).should("not.be.visible");
    cy.get("[data-testid=AccountCircleIcon]").should("be.visible").click();
    cy.contains(/^Proficiency$/).should("be.visible");
    cy.contains(/^My Flashcards$/).should("be.visible");
  });
  it("create flashcard page", () => {
    cy.contains(/^Create Flashcard Set$/).should("not.be.visible");
    cy.contains(/^Add Card to Set$/).should("not.be.visible");
    cy.get("[data-testid=ViewCarouselIcon]").should("be.visible").click();
    cy.contains(/^Create Flashcard Set$/).should("be.visible");
    cy.contains(/^Add Card to Set$/).should("be.visible");
  });
});
