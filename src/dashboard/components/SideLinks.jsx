import React, { use } from "react";
import { NavLink, Link } from "react-router";
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
            <span className="mr-2">🪪</span>My Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/my-applications">
            <span className="mr-2">📑</span>Applied Applications
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/my-reviews">
            <span className="mr-2">👍🏻</span>My Reviews
          </NavLink>
        </li>
        {(role === "admin" || role === "moderator") && (
          <>
            <li>
              <NavLink to="/dashboard/admin/add-scholarship">
                <span className="mr-2">📋</span>Add Scholarship
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/manage-scholarships">
                <span className="mr-2">🧾</span>Manage Scholarships
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/manage-applications">
                <span className="mr-2">📑</span>Manage Applications
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/manage-reviews">
                <span className="mr-2">👍🏻</span>Manage Reviews
              </NavLink>
            </li>
          </>
        )}

        {role === "admin" && (
          <li>
            <NavLink to="/dashboard/admin/users">
              <span className="mr-2">🧑🏻‍🎓</span>Manage Users
            </NavLink>
          </li>
        )}
      </ul>
    </>
  );
}

export default SideLinks;
