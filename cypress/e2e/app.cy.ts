/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress
// import AcceptQuoteDialog from '../../src/components/accept-quote-dialog';

describe("AcceptQuoteDialog", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.sandbox.bvnk.com/api/v1/pay/*/summary", {
      merchantName: "Test Merchant",
      amount: 100,
      currency: "EUR",
      reference: "TEST123",
    }).as("getSummary");

    cy.intercept(
      "PUT",
      "https://api.sandbox.bvnk.com/api/v1/pay/*/update/summary",
      {
        merchantName: "Test Merchant",
        amount: 0.005,
        currency: "BTC",
        reference: "TEST123",
      },
    ).as("updateQuote");
  });

  it("loads and displays quote information", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/payin/uuid", { failOnStatusCode: false });
    cy.wait("@getSummary");

    cy.contains("Test Merchant").should("be.visible");
    cy.contains("100").should("be.visible");
    cy.contains("TEST123").should("be.visible");
  });

  it("allows currency selection", () => {
    cy.visit("http://localhost:3000/payin/uuid", { failOnStatusCode: false });
    cy.wait("@getSummary");

    cy.get('[data-testid="currency-select"]').select("BTC");
    cy.wait("@updateQuote");

    cy.contains("0.005").should("be.visible");
    cy.contains("BTC").should("be.visible");
  });

  it("displays all currency options", () => {
    cy.visit("http://localhost:3000/payin/uuid", { failOnStatusCode: false });
    cy.get('[data-testid="currency-select"]').within(() => {
      cy.contains("Bitcoin BTC").should("exist");
      cy.contains("Ethereum ETH").should("exist");
      cy.contains("Litecoin LTC").should("exist");
    });
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
