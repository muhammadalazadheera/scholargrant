import {use} from "react";
import { Outlet, useNavigate } from "react-router";
import NavLinks from "./components/NavLinks";
import SideLinks from "./components/SideLinks";
import "../assets/css/dashboard.css";
import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loding";

function DashboardLayout() {
  const {user, loading} = useAuth();
  if(loading) {
    return <Loading />
  }

  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#485696] hidden md:block text-white">
        <div className="h-[65px] flex items-center px-4">
          <NavLink to='/' className="text-xl font-bold">ScholarGrant</NavLink>
        </div>
        <SideLinks />
      </aside>

      <div className="flex-1 flex flex-col">
        <nav className="bg-[#E7E7E7] shadow-sm px-4 h-[65px] flex justify-between items-center">
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
                  <a>Dashboard</a>
                </li>
                <li>
                  <a>Home</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-sm btn-circle avatar">
                <div className="w-8 rounded-full">
                  <img src={user.photoURL} alt="Avatar" />
                </div>
              </label>
              <NavLinks />
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="p-4 flex-1 overflow-y-auto">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
