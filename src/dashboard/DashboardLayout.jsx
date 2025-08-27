import { use, useState } from "react";
import { Outlet, useLocation } from "react-router";
import NavLinks from "./components/NavLinks";
import SideLinks from "./components/SideLinks";
import "../assets/css/dashboard.css";
import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loding";
import { ToastContainer } from "react-toastify";

function DashboardLayout() {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }

  const location = useLocation();
  const pathnames = location.pathname.split("/");
  let currentPage = pathnames[pathnames.length - 1].replace("-", " ");

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-[#485696] hidden md:block text-white h-screen"></div>
      <aside className="w-64 bg-[#485696] hidden md:block text-white fixed h-screen">
        <div className="h-[65px] flex items-center px-4">
          <NavLink to="/" className="text-xl font-bold">
            ScholarGrant
          </NavLink>
        </div>
        <SideLinks />
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="bg-base-100 shadow px-4 h-[65px] flex justify-between items-center">
          <div className="md:hidden">
            <button className="btn btn-square btn-ghost text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="text-lg font-semibold">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <a className="">Dashboard</a>
                </li>
                <li>
                  <a className="capitalize">{currentPage}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <>
              <button
                onClick={handleMode}
                className="btn btn-success btn-outline rounded-full mr-2 w-[30px] h-[30px]"
              >
                {mode === "dark" && <i className="fas fa-sun"></i>}
                {mode === "light" && <i className="fas fa-moon"></i>}
              </button>
            </>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-sm btn-circle avatar">
                <div className="w-8 rounded-full">
                  <img src={user.photoURL} alt="Avatar" />
                </div>
              </label>
              <NavLinks />
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="p-4 flex-1 overflow-y-auto bg-base-300">
          <Outlet></Outlet>
          <ToastContainer></ToastContainer>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
