import React, { use, useEffect, useState } from "react";
import useUserRole from "../../hooks/useUserRole";
import useAuth from "../../hooks/useAuth";
import DashboardStats from "../components/DashboardStats";
import useAxios from "../../hooks/useAxios";

function DashboardHome() {
  const { roleLoading, role } = useUserRole();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const axios = useAxios();

  useEffect(() => {
    axios.get(`/user-stat/${user.email}`).then((res) => {
      setUserData(res.data);
    });
  }, []);

  return (
    <>
      {role === "user" && userData && (
        <div>
          <div className="grid grid-cols-4 bg-base-200 gap-4 shadow p-5 border-b border-black/20">
            <div className="bg-base-100 p-3 shadow">
              <h2 className="text-lg font-light text-green-600">
                Applications
              </h2>
              <p className="text-2xl font-medium">
                {userData?.totalAppliedScholarships}
              </p>
            </div>
            <div className="bg-base-100 p-3 shadow">
              <h2 className="text-lg font-light text-pink-600">
                Complied Applications
              </h2>
              <p className="text-2xl font-medium">
                {userData.totalCompletedScholarships}
              </p>
            </div>
            <div className="bg-base-100 p-3 shadow">
              <h2 className="text-lg font-light text-yellow-600">
                Pending Applications
              </h2>
              <p className="text-2xl font-medium">
                {userData?.totalPendingScholarships}
              </p>
            </div>
            <div className="bg-base-100 p-3 shadow">
              <h2 className="text-lg font-light text-blue-700">
                Processing Applications
              </h2>
              <p className="text-2xl font-medium">
                {userData?.totalProcessingScholarships}
              </p>
            </div>
          </div>
          <div className="overflow-x-auto bg-base-200 shadow border-black/5 p-5">
            <table className="table bg-base-100 shadow rounded-none">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>University Name</th>
                  <th>Degree</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userData?.latestAppliedScholarships.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Applications Found
                    </td>
                  </tr>
                )}
                {userData?.latestAppliedScholarships.map((app) => (
                  <tr key={app._id}>
                    <td>{app.scholarshipName}</td>
                    <td>{app.universityName}</td>
                    <td>{app.applyingDegree}</td>
                    <td
                      className={`capitalize ${
                        app.status === "completed"
                          ? "text-green-600"
                          : app.status === "pending"
                          ? "text-yellow-600"
                          : "text-blue-700"
                      }`}
                    >
                      {app.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(role === "admin" || role === "moderator") && <DashboardStats />}
    </>
  );
}

export default DashboardHome;
