import { useLocation, Link } from "react-router-dom";
import { Logout } from "./Logout";

export function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  let navLinks;
  if (localStorage.jwt === undefined) {
    navLinks = (
      <nav>
        <h2>MyCare</h2>
      </nav>
    );
  } else {
    if (currentPath === "/") {
      navLinks = (
        <nav>
          <h2>MyCare</h2>
          <div>
            <Logout />
          </div>
        </nav>
      );
    } else {
      navLinks = (
        <nav>
          <h2>MyCare</h2>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Logout />
          </div>
        </nav>
      );
    }
  }

  return <header>{navLinks}</header>;
}
