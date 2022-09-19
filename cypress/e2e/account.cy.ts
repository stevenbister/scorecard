describe("Account", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/account");
  });

  after(async () => {
    // Reset our test user data
    await cy.cleanUpUser();
  });

  it("successfully navigates to the account page", () => {
    cy.visit("/");
    cy.get('[data-auth="account"]').click();

    cy.get("h1").should("have.text", "Account");
  });

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

    cy.get('button[type="submit"]').click();

    cy.wait("@updateProfile").its("response.statusCode").should("eq", 200);

    cy.get("#toast-success-toast")
      .should("be.visible")
      .and("have.text", "Profile updated.");

    cy.visit("/");
    cy.get("p").should("have.text", "You're logged in as Test User 123");
  });
});
