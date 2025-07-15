import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
function TopScholarships() {
  const axios = useAxios();
  const { user } = useAuth();
  console.log(user.accessToken);
  const [scholarships, setScholarships] = useState([]);
  useEffect(() => {
    axios
      .get("/top-scholarships", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setScholarships(res.data);
      });
  }, []);
  return (
    <div className="bg-primary pb-28 pt-14">
      <div className="mb-14"><h1 className="text-4xl text-white text-center uppercase font-extrabold">Top Scholarships</h1></div>
      <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {scholarships.map((sch) => (
          <div key={sch._id} className="card bg-base-100 shadow-sm rounded-none">
            <figure>
              <img
                src={
                  sch.universityImage ||
                  "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                }
                alt={sch.scholarshipName}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{sch.scholarshipName}</h2>
              <p className="text-sm text-gray-600">{sch.universityName}</p>
              <div className="text-sm text-gray-400">
                {sch.country}, {sch.city}
              </div>
              <div className="text-sm text-gray-400">
                {sch.tuitionFees}
              </div>
              <div className="card-actions justify-start mt-4">
                <button className="btn btn-sm btn-block btn-outline btn-primary">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopScholarships;
