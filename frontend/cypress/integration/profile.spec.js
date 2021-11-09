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
    cy.get("[data-testid=AccountCircleIcon]")
      .should("be.visible")
      .filter(":visible")
      .click();
    cy.contains(/^Proficiency$/).should("be.visible");
    cy.contains(/^My Flashcards$/).should("be.visible");
  });
  it("flashcard detail", () => {
    cy.contains(/^Vocabulary 1$/)
      .should("be.visible")
      .siblings("div")
      .should("be.visible")
      .click();
    cy.contains(/^Vocabulary 1$/).should("be.visible");
    cy.contains(/^Japanese$/).should("be.visible");
    cy.contains(/^Difficulty:$/).should("be.visible");
    cy.contains("Description:").should("be.visible");
    cy.contains(/^Japanese vocabulary words for lesson$/).should("be.visible");
  });
  it("edit profile", () => {
    cy.contains(/^Edit Profile$/)
      .should("be.visible")
      .click();
    cy.contains(/^Edit Profile$/).should("be.visible");
  });
});
