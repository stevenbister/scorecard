const { exec } = require("child_process");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

exec(
	`npx openapi-typescript ${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY} --output app/types/supabase.ts`
);
