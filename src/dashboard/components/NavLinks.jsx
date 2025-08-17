import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

function NavLinks() {
  const {signOutUser} = useAuth();
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };
  return (
    <>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 bg-[#485696] w-40 text-black"
      >
        <li>
          <Link className="text-white" to="/dashboard/profile">Profile</Link>
        </li>
        <li>
          <a className="text-white" onClick={handleSignOut}>Logout</a>
        </li>
      </ul>
    </>
  );
}

export default NavLinks;
