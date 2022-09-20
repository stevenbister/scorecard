import { defineConfig } from "cypress";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents: (on, config) => {
      const isDev = config.watchForFileChanges;
      const port = process.env.PORT ?? (isDev ? "3000" : "8811");
      const configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: `http://localhost:${port}`,
        video: false,
        screenshotOnRunFailure: !process.env.CI,
      };

      //   Set our environment variables
      config.env.SUPABASE_URL = process.env.SUPABASE_URL;
      config.env.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
      config.env.SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

      // To use this:
      // cy.task('log', whateverYouWantInTheTerminal)
      on("task", {
        log: (message) => {
          console.log(message);

          return null;
        },
      });

      return { ...config, ...configOverrides };
    },
  },
});
