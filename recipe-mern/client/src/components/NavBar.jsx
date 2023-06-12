import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <main className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create recipe</Link>
      <Link to="/saved-recipes">Saved recipes</Link>
      <Link to="/user">User</Link>
    </main>
  );
};

export default NavBar;
