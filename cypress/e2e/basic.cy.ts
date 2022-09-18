describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should allow you to login", () => {
    const loginForm = {
      email: "test@example.com",
      password: "test1234!",
    };

    cy.intercept({
      method: "GET",
      url: "/login?_data=routes%2Flogin",
    }).as("login");

    cy.get('[data-auth="login"]').click();
    cy.get('[type="email"]').type(loginForm.email);
    cy.get('[type="password"]').type(loginForm.password);
    cy.get('[type="submit"]').click();

    cy.wait("@login");

    cy.get("p").should("have.text", "You're logged in as test@example.com");
  });
});
