import { seedUser, cleanUpUser } from "../support/supabase";

before(async () => {
  await seedUser();
  await cleanUpUser();
});

describe("User flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display error messages when the fields are invalid", () => {
    cy.visit("/login");

    cy.get('[type="submit"]').click();
    cy.get("#email-error")
      .should("be.visible")
      .and("have.text", "Email is invalid.");

    cy.get('input[type="email"]').type("test@example.com");
    cy.get('[type="submit"]').click();
    cy.get("#password-error")
      .should("be.visible")
      .and("have.text", "Password is too short");

    cy.get('input[type="password"]').type("thewrongpassword");
    cy.get('[type="submit"]').click();
    cy.get("#email-error")
      .should("be.visible")
      .and("have.text", "Invalid email or password");
  });

  it("should allow you to login from the homepage", () => {
    const loginForm = {
      email: "test@example.com",
      password: "test1234!",
    };

    cy.intercept({
      method: "GET",
      url: "/login?_data=routes%2Flogin",
    }).as("login");

    cy.get('[data-auth="login"]').click();
    cy.get('input[type="email"]').type(loginForm.email);
    cy.get('input[type="password"]').type(loginForm.password);
    cy.get('[type="submit"]').click();

    cy.wait("@login");

    cy.get("p").should("have.text", "You're logged in as Test User");
    cy.getCookie("__session").should("exist");
  });

  it("should log out the user", () => {
    cy.login();
    cy.visitAndCheck("/");

    cy.intercept({
      method: "GET",
      url: "/?_data=root",
    }).as("logout");

    cy.get('[data-auth="signout"]').click();

    cy.wait("@logout");

    cy.get('[data-auth="login"]').should("be.visible");
  });
});
