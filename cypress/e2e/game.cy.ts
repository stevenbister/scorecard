import {
  cleanUpGames,
  cleanUpPlayers,
  cleanUpUser,
  seedPlayers,
  seedUser,
} from "../support/supabase";

before(async () => {
  // empty any players created during other testing first
  await cleanUpUser();
  await cleanUpPlayers();
  await seedUser();
  await seedPlayers();
});

beforeEach(() => {
  cy.login();
});

after(async () => {
  // Reset our test user data
  await cleanUpUser();
  await cleanUpPlayers();
  await cleanUpGames();
});

it("successfully creates a new game", () => {
  cy.intercept("/game*").as("createGame");
  cy.visit("/");

  cy.findByRole("button", {
    name: /start a game/i,
  }).click();

  cy.url().should("include", "/game");
  cy.wait("@createGame");
  cy.getCookie("currentGame").should("have.property", "value");

  cy.findByRole("button", {
    name: /add player/i,
  }).should("be.visible");

  cy.findByRole("button", {
    name: /end game/i,
  }).should("be.visible");
});

// describe("game events", () => {
//   beforeEach(() => {
//     cy.createGame();
//     cy.visit("/game");
//   });

//   it("successfully ends an existing game", () => {
//     cy.findByRole("button", {
//       name: /end game/i,
//     }).click();

//     cy.url().should("include", "/");
//     cy.findByRole("heading", {
//       name: /scorecard/i,
//     });
//   });

//   it("adds three players to the game", () => {
//     cy.findByRole("button", {
//       name: /add player/i,
//     })
//       .should("be.visible")
//       .click();

//     cy.get("#add-players label").should("have.length", 3);

//     cy.get("#add-players label").each((el) => {
//       cy.wrap(el).click();
//     });

//     cy.get('button[form="add-players"]').click();

//     cy.get(".chakra-slide").should("not.exist");

//     // TODO: add checks for content to be visible
//   });

//   it("removes players from current game", () => {
//     cy.findByRole("button", {
//       name: /add player/i,
//     })
//       .should("be.visible")
//       .click();

//     // This is bad -- should include this in a seed script or something, really
//     cy.get("#add-players label").each((el) => {
//       cy.wrap(el).click();
//     });
//     cy.get('button[form="add-players"]').click();

//     cy.findByRole("button", {
//       name: /add player/i,
//     })
//       .should("be.visible")
//       .click();

//     cy.get("#add-players input[type='checkbox']").each((el) => {
//       cy.wrap(el).should("be.checked");
//     });

//     cy.get("#add-players label:first-child").click();
//     cy.get('button[form="add-players"]').click();

//     // TODO: add checks for content to be visible
//   });
// });
