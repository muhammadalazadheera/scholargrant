import { useEffect, useState } from "react";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../../hooks/useAxios";

function DashboardStats() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    axios
      .get("/dashboard-stats")
      .then((res) => {
        // Safely get dailyApplications for chart
        const dailyApplications = res?.data?.dailyApplications ?? [];
        setData(dailyApplications);

        // Safely get userData and remove dailyApplications
        const userData = res?.data ?? {};
        const { dailyApplications: _, ...restUserData } = userData; // "_" ignores the key
        setUserData(restUserData);

      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="base-base-100">
        <div>
          <div className="grid grid-cols-4 bg-base-200 gap-4 p-5 shadow">
            <div className="bg-base-100 p-3 shadow border border-green-600/20 rounded">
              <h2 className="text-lg font-light text-green-600">
                Scholarships
              </h2>
              <p className="text-2xl font-medium">
                {userData?.totalScholarships || 0}
              </p>
            </div>
            <div className="bg-base-100 p-3 shadow border border-pink-600/20 rounded">
              <h2 className="text-lg font-light text-pink-600">Applications</h2>
              <p className="text-2xl font-medium">
                {userData.totalAppliedScholarships || 0}
              </p>
            </div>
            <div className="bg-base-100 p-3 shadow border border-yellow-600/20 rounded">
              <h2 className="text-lg font-light text-yellow-600 ">
                Pending Applications
              </h2>
              <p className="text-2xl font-medium">
                {userData?.totalPendingApplications || 0}
              </p>
            </div>
            <div className="bg-base-100 p-3 shadow border border-blue-500/20 rounded">
              <h2 className="text-lg font-light text-blue-500">
                Complited Applications
              </h2>
              <p className="text-2xl font-medium">
                {userData?.totalApprovedScholarships || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-100 p-5 shadow mt-3">
        <h2 className="font-light mb-3">Applications [Last 7 Days]</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto bg-base-100 mt-3 shadow border-black/5 p-5">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border-b p-2 text-left">Name</th>
              <th className="border-b p-2 text-left">Scholarship</th>
              <th className="border-b p-2 text-left">University</th>
              <th className="border-b p-2 text-left">Subject</th>
              <th className="border-b p-2 text-left">Degree</th>
            </tr>
          </thead>
          <tbody>
            {
              !userData?.latestPendingApplications?.length && (
                <tr>
                  <td colSpan={5} className="border-b p-2 text-center">
                    No pending applications
                  </td>
                </tr>
              )
            }
            {(userData?.latestPendingApplications ?? []).map((item) => (
              <tr key={item._id}>
                <td className="border-b p-2">{item.studentName}</td>
                <td className="border-b p-2">{item.scholarshipName}</td>
                <td className="border-b p-2">{item.universityName}</td>
                <td className="border-b p-2">{item.subjectCategory}</td>
                <td className="border-b p-2">{item.applyingDegree}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardStats;
