import { Link, Form } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main>
      <div>
        {user ? (
          <>
            <p>You're logged in as {user.email}</p>
            <Form action="/logout" method="post">
              <button type="submit">Logout</button>
            </Form>
          </>
        ) : (
          <div>
            <Link to="/join">Sign up</Link>
            <Link to="/login">Log In</Link>
          </div>
        )}
      </div>
    </main>
  );
}
