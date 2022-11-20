import {
  cleanUpPlayers,
  cleanUpUser,
  seedPlayers,
  seedUser,
} from "../support/supabase";

before(async () => {
  // empty any players created during other testing first
  await cleanUpPlayers();
  await seedUser();
  await seedPlayers();
});

beforeEach(() => {
  cy.login();
  cy.visit("/players");
});

after(async () => {
  // Reset our test user data
  await cleanUpUser();
  await cleanUpPlayers();
});

it("successfully navigates to the players page", () => {
  cy.visit("/");
  cy.findByRole("link", { name: /players/i }).click();

  cy.get("h1").should("have.text", "Players");
});

it("adds a new player", () => {
  cy.get(".chakra-stack > li").should("have.length", 4);

  cy.findByRole("button", {
    name: /add new player/i,
  }).click();

  cy.get(".chakra-modal__content").should("be.visible");
  cy.get(".chakra-modal__header").should("have.text", "Add new player");

  cy.get(".chakra-input").should("be.visible").type("New player");

  // cy.get('button[type="submit"]').click();
  cy.findByRole("button", {
    name: /save player/i,
  }).click();

  cy.get(".chakra-stack > li:last-of-type .chakra-text").should(
    "have.text",
    "New player"
  );
});

it("deletes a player", () => {
  cy.get(".chakra-stack > li:last-of-type .chakra-button").click();
  cy.findByText(/new player/i).should("not.exist");
});
