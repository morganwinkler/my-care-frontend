import { useLocation, Link } from "react-router-dom";
import { Logout } from "./Logout";

export function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  let navLinks;
  if (localStorage.jwt === undefined) {
    navLinks = (
      <nav className="navbar bg-base-300">
        <h2 className="text-5xl">MyCare</h2>
      </nav>
    );
  } else {
    if (currentPath === "/") {
      navLinks = (
        <nav className="navbar bg-base-300">
          <h2 className=" text-5xl">MyCare</h2>
          <div className="navbar-start"></div>
          <div className="navbar-start hover:text-blue-600">
            <Link to="/library">Learn Library</Link>
          </div>
          <div className="navbar-start hover:text-blue-600">
            <Link to="/mylibrary">My Library</Link>
          </div>
          <div className="navbar-end hover:text-blue-600">
            <Logout />
          </div>
        </nav>
      );
    } else {
      navLinks = (
        <nav className="navbar bg-base-300">
          <h2 className=" text-5xl" style={{ paddingRight: "50px" }}>
            MyCare
          </h2>
          <div className="navbar-start hover:text-blue-600">
            <Link to="/">Home</Link>
          </div>
          <div className="navbar-start hover:text-blue-600">
            <Link to="/library">Learn Library</Link>
          </div>
          <div className="navbar-start hover:text-blue-600">
            <Link to="/mylibrary">My Library</Link>
          </div>
          <div className="navbar-end hover:text-blue-600">
            <Logout />
          </div>
        </nav>
      );
    }
  }

  return <header>{navLinks}</header>;
}
