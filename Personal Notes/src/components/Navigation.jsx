import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiHome, FiPlusCircle, FiArchive, FiLogOut } from "react-icons/fi";

function Navigation({ logout, name }) {
  return (
    <nav className="navigation">
      <ul>
        <li className="icon">
          <Link to="/">
            <FiHome />
          </Link>
        </li>
        <li className="icon">
          <Link to="/archives">
            <FiArchive />
          </Link>
        </li>
        <li className="icon">
          <Link to="/add">
            <FiPlusCircle />
          </Link>
        </li>
        <li className="icon">
          <button className="logout-button" onClick={logout}>
            {name} <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
