import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const { handleLogout } = useLogout();
  const handleLogoutButton = () => {
    handleLogout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user?.user?.email}</span>
              <button onClick={handleLogoutButton}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/signin">Sign In</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
