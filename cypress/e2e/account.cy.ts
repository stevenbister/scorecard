import { seedUser, cleanUpUser } from "../support/supabase";

before(async () => {
  await seedUser();
});

beforeEach(() => {
  cy.login();
  cy.visit("/account");
});

after(async () => {
  // Reset our test user data
  await cleanUpUser();
});

it("successfully navigates to the account page", () => {
  cy.visit("/");

  cy.findByRole("link", {
    name: /account/i,
  }).click();

  cy.get("h1").should("have.text", "Account");
});

describe("Updates account", () => {
  it("cannot update the email address", () => {
    cy.get('input[type="email"]')
      .type("test@example123.com", { force: true }) // force it as we want to avoit the error thrown for not being able to type
      .should("not.have.value", "test@example123.com");
  });

  it("successfully updates the username", () => {
    cy.intercept({
      method: "POST",
      url: "/account?_data=routes%2Faccount",
    }).as("updateProfile");

    cy.get('input[name="name"]')
      .clear()
      .type("Test User 123")
      .should("have.value", "Test User 123");

    cy.get('form[action="/account"] button[type="submit"]').click();

    cy.wait("@updateProfile").its("response.statusCode").should("eq", 200);

    cy.get("#toast-success-toast")
      .should("be.visible")
      .and("have.text", "Profile updated.");

    cy.visit("/");
    cy.get("h1").should("have.text", "Scorecard");
  });
});

describe("Deletes account", () => {
  it("successfully backs out of deleting the user account", () => {
    cy.get('button[type="button"]').click();
    cy.get(".chakra-modal__content").should("be.visible");
    cy.get(".chakra-modal__header").should(
      "have.text",
      "Are you sure you want to delete your account?"
    );

    cy.get('button[data-delete="cancel"]').should("be.visible");
    cy.get('button[data-delete="cancel"]').click();
    cy.get(".chakra-modal__content").should("not.exist");
  });

  it("successfully deletes the user account", () => {
    cy.get('button[type="button"]').click();
    cy.get(".chakra-modal__content").should("be.visible");
    cy.get(".chakra-modal__header").should(
      "have.text",
      "Are you sure you want to delete your account?"
    );

    cy.get('button[data-delete="confirm"]').should("be.visible");
    cy.get('button[data-delete="confirm"]').click();
  });
});
