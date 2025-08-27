import { useState } from "react";
import { NavLink } from "react-router";
import useUserRole from "../../hooks/useUserRole";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const {role} = useUserRole();

  return (
    <div>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="btn btn-square btn-ghost text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#485696] shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/dashboard" end onClick={() => setOpen(false)}>
              <span className="mr-2">🔲</span>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile" onClick={() => setOpen(false)}>
              <span className="mr-2">🪪</span>My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-applications"
              onClick={() => setOpen(false)}
            >
              <span className="mr-2">📑</span>Applied Applications
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-reviews" onClick={() => setOpen(false)}>
              <span className="mr-2">👍🏻</span>My Reviews
            </NavLink>
          </li>

          {(role === "admin" || role === "moderator") && (
            <>
              <li>
                <NavLink
                  to="/dashboard/admin/add-scholarship"
                  onClick={() => setOpen(false)}
                >
                  <span className="mr-2">📋</span>Add Scholarship
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/manage-scholarships"
                  onClick={() => setOpen(false)}
                >
                  <span className="mr-2">🧾</span>Manage Scholarships
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/manage-applications"
                  onClick={() => setOpen(false)}
                >
                  <span className="mr-2">📑</span>Manage Applications
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/manage-reviews"
                  onClick={() => setOpen(false)}
                >
                  <span className="mr-2">👍🏻</span>Manage Reviews
                </NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <li>
              <NavLink
                to="/dashboard/admin/users"
                onClick={() => setOpen(false)}
              >
                <span className="mr-2">🧑🏻‍🎓</span>Manage Users
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
