import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
function TopScholarships() {
  const axios = useAxios();
  const { user } = useAuth();
  const [scholarships, setScholarships] = useState([]);
  useEffect(() => {
    axios.get("/top-scholarships").then((res) => {
      setScholarships(res.data);
    });
  }, []);
  return (
    <div className="bg-primary pb-14 pt-14">
      <div className="mb-14">
        <h1 className="text-4xl text-white text-center uppercase font-extrabold">
          Top Scholarships
        </h1>
      </div>
      <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {scholarships.map((sch) => (
          <div
            key={sch._id}
            className="card bg-base-100 shadow-sm rounded-sm"
          >
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
              <div className="text-sm text-gray-400">Tuition Fees ({sch.tuitionFees})</div>
              <div className="card-actions justify-start mt-4">
                <Link to={`/scholarship-details/${sch._id}`} className="btn btn-sm btn-block btn-outline btn-primary">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5 w-[50%] mx-auto">
        <Link className="btn btn-ghost bg-white border border-black btn-block text-primary" to="/all-scholarships">
          Explore All
        </Link>
      </div>
    </div>
  );
}

export default TopScholarships;
