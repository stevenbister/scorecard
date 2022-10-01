import {
  seedUser,
  cleanUpUser,
  seedPlayers,
  cleanUpPlayers,
} from "../support/supabase";

before(async () => {
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

it("adds a new player", () => {
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

  cy.get(".chakra-avatar + .chakra-text").should("have.text", "New player");
});

it("deletes a player", () => {
  cy.findByRole("button", {
    name: /delete/i,
  }).click();

  cy.get(".chakra-avatar").should("not.exist");
});
