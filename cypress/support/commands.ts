import { createClient } from "@supabase/supabase-js";
import testUser from "../fixtures/user.json";
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in with a random user. Yields the user and adds an alias to the user
       *
       * @returns {typeof login}
       * @memberof Chainable
       * @example
       *    cy.login()
       * @example
       *    cy.login({ email: 'whatever@example.com' })
       */
      login: typeof login;

      /**
       * Logs in with a random user. Yields the user and adds an alias to the user
       *
       * @returns {typeof cleanUpUser}
       * @memberof Chainable
       * @example
       *    cy.cleanUpUser()
       * @example
       *    cy.cleanUpUser()
       */
      cleanUpUser: typeof cleanUpUser;

      /**
       * Extends the standard visit command to wait for the page to load
       *
       * @returns {typeof visitAndCheck}
       * @memberof Chainable
       * @example
       *    cy.visitAndCheck('/')
       *  @example
       *    cy.visitAndCheck('/', 500)
       */
      visitAndCheck: typeof visitAndCheck;
    }
  }
}

function login() {
  Cypress.log({
    name: "Supabase login",
  });
  // programmatically log us in without needing the UI
  cy.request({
    method: "POST",
    url: "/login",
    form: true,
    body: {
      password: "test1234!",
      email: "test@example.com",
    },
  });

  cy.getCookie("__session").should("exist");
}

async function cleanUpUser() {
  const supabaseUrl = Cypress.env("SUPABASE_URL");
  const supabaseAnonKey = Cypress.env("SUPABASE_ANON_KEY");
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  Cypress.log({
    name: "Restore user defaults",
  });

  const { data, error } = await supabase
    .from("profiles")
    .update({
      email: testUser.email,
      name: testUser.name,
    })
    .eq("id", testUser.id)
    .single();

  if (error) console.error(error);
  if (data) console.log({ "restored data": data });
}

// We're waiting a second because of this issue happen randomly
// https://github.com/cypress-io/cypress/issues/7306
// Also added custom types to avoid getting detached
// https://github.com/cypress-io/cypress/issues/7306#issuecomment-1152752612
// ===========================================================
function visitAndCheck(url: string, waitTime: number = 1000) {
  cy.visit(url);
  cy.location("pathname").should("contain", url).wait(waitTime);
}

Cypress.Commands.add("login", login);
Cypress.Commands.add("visitAndCheck", visitAndCheck);
Cypress.Commands.add("cleanUpUser", cleanUpUser);
