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

describe("game events", () => {
  beforeEach(() => {
    cy.createGame();
  });

  it("successfully ends an existing game", () => {
    cy.findByRole("button", {
      name: /end game/i,
    }).click();

    cy.url().should("include", "/");
    cy.findByRole("heading", {
      name: /scorecard/i,
    });
  });

  it("adds three players to the game", () => {
    cy.findByRole("button", {
      name: /add player/i,
    })
      .should("be.visible")
      .click();

    cy.get("#add-players label").should("have.length", 4);

    cy.get("#add-players label").each((el) => {
      cy.wrap(el).click();
    });

    cy.get('button[form="add-players"]').click();

    cy.get(".chakra-slide").should("not.exist");
  });

  it("removes players from current game", () => {
    cy.findByRole("button", {
      name: /add player/i,
    })
      .should("be.visible")
      .click();

    // This is bad -- should include this in a seed script or something, really
    cy.get("#add-players label").each((el) => {
      cy.wrap(el).click();
    });
    cy.get('button[form="add-players"]').click();

    cy.findByRole("button", {
      name: /add player/i,
    })
      .should("be.visible")
      .click();

    cy.get("#add-players input[type='checkbox']").each((el) => {
      cy.wrap(el).should("be.checked");
    });

    cy.get("#add-players label:first-child").click();
    cy.get('button[form="add-players"]').click();
  });

  it("tracks player score", () => {
    cy.findByRole("button", {
      name: /add player/i,
    }).click();

    cy.findByText("Test player 1").should("be.visible").click();

    cy.get('button[form="add-players"]').should("be.visible").click();

    cy.get(".chakra-slide").should("not.exist");

    cy.get(".chakra-radio").should("have.length", 2);
    cy.get(".score-input.is-active").type("1\n2\n3");
    cy.findByText("Score: 6").should("be.visible");

    cy.findByText("Test player 1").click();
    cy.findByText("Score: 0").should("be.visible");
    cy.get(".score-input.is-active").type("4\n5\n6");
    cy.findByText("Score: 15").should("be.visible");
  });
});
