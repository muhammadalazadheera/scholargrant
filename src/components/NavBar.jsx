import React, { use, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../pages/Loding";

function NavBar() {
  const { user, signOutUser, loading } = use(AuthContext);
  
  const location = useLocation();
  const pageClass =
    location.pathname === "/login" || location.pathname === "/register"
      ? "login-page"
      : "";

  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const [mode, setMode] = useState("light");

  const handleMode = () => {
    if (mode === "light") {
      document.querySelector("html").setAttribute("data-theme", "dark");
      setMode("dark");
    } else {
      document.querySelector("html").setAttribute("data-theme", "light");
      setMode("light");
    }
  };

  useEffect(() => {
    console.log(loading)
  }, [loading])

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`absolute top-0 z-10 w-full ${
        isHome ? "" : "border-b border-black/20"
      }`}
    >
      <div
        className={`${pageClass} navbar h-[70px] container mx-auto md:w-[95%] lg:w-[85%] p-0`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden md:pl-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#ffffff] border border-[#7B99FF] z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/all-scholarships">All Scholarships</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              {user && (
                <li>
                  <a className="hover:text-white" onClick={handleSignOut}>
                    Logout
                  </a>
                </li>
              )}
              {!user && (
              <>
                <NavLink to="/login" className="btn btn-outline btn-info mr-3">
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-outline btn-info mr-3 hidden md:grid"
                >
                  Register
                </NavLink>
              </>
            )}
            </ul>
          </div>
          <Link to="/" className="logo-text text-xl lg:text-3xl font-extrabold">
            ScholarGrant
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul
            className={`menu menu-horizontal px-1 ${
              isHome ? "text-white" : "text-black"
            }`}
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-scholarships">All Scholarships</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
            
          </ul>
        </div>
        <div className="navbar-end">
          <>
            <button
              onClick={handleMode}
              className="btn btn-success btn-outline rounded-full mr-2 w-[30px] h-[30px]"
            >
              {mode === "dark" && <i className="fas fa-sun"></i>}
              {mode === "light" && <i className="fas fa-moon"></i>}
            </button>
          </>
          {!user && (
            <>
              <NavLink to="/login" className="btn btn-outline btn-info mr-3">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-outline btn-info mr-3 hidden md:grid"
              >
                Register
              </NavLink>
            </>
          )}
          {user && (
            <div
              className="dropdown dropdown-end tooltip tooltip-left tooltip-primary"
              data-tip={user.displayName}
            >
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm right-menu dropdown-content bg-[#339AF0] border border-[#7B99FF] z-1 mt-4 w-52 p-2 shadow"
              >
                <span className="text-center text-xl text-white">
                  {user.displayName}
                </span>
                <li>
                  <Link to="profile">Profile</Link>
                </li>
                <li>
                  <a className="hover:text-white" onClick={handleSignOut}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
