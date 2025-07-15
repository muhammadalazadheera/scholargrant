import React, { use } from "react";
import { NavLink } from "react-router";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../pages/Loding";

function SideLinks() {
  const { roleLoading, role } = useUserRole();

  if (roleLoading) {
    return <Loading />;
  }

  /**
   * ADMIN MENUS
   */
  if (role === "admin") {
    return (
      <>
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/dashboard" end>
              <span className="mr-2">🔲</span>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <span className="mr-2">🪪</span>Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <span className="mr-2">📋</span>Add Scholarship
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <span className="mr-2">🧾</span>Manage Scholarships
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <span className="mr-2">📑</span>Applied Applications
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/users">
              <span className="mr-2">🧑🏻‍🎓</span>Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <span className="mr-2">👍🏻</span>Reviews
            </NavLink>
          </li>
        </ul>
      </>
    );
  }

  /**
   * MODERATOR MENUS
   */
  if (role === "moderator") {
    return (
      <>
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/dashboard" end>
              <span className="mr-2">🏠</span> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <span className="mr-2">🏠</span> Moderator Profile
            </NavLink>
          </li>
        </ul>
      </>
    );
  }

  /**
   * USER MENUS
   */
  if (role === "user") {
    return (
      <>
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/dashboard" end>
              <span className="mr-2">🏠</span> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <span className="mr-2">🏠</span> User Profile
            </NavLink>
          </li>
        </ul>
      </>
    );
  }
}

export default SideLinks;
