import { Login } from "./Login";
import { Logout } from "./Logout";
import { Signup } from "./Signup";

export function Content() {
  return (
    <div>
      <Signup />
      <Login />
      <Logout />
    </div>
  );
}
