import { Link } from "react-router";
function MainNavigation() {
  return (
    <>
      <header>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/posts">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}

export default MainNavigation;
