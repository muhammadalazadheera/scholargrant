import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { Link, useParams } from "react-router";
import ReviewSlider from "../components/DetailsPage/ReviewSlider";

function ScholarshipDetails() {
  const axios = useAxios();
  const { user } = useAuth();
  const { id } = useParams();
  const [scholarship, setScholarship] = useState([]);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get(`/scholarship/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setScholarship(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/scholarship-reviews/6877c0f60ac6419c47b8016e`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setReviews(res.data);
      });
  }, []);

  return (
    <div className="mt-[70px] w-[95%] md:w-[80%] lg:[w-50%] mx-auto">
      <div className="text-center py-5">
        <div className="badge badge-outline badge-primary">Details</div>
        <h1 className="text-5xl my-1 font-thin">
          {scholarship?.scholarshipName}
        </h1>
        <p className="text-sm text-gray-500">
          <span>
            <i className="fas fa-calendar"></i> posted: {scholarship.postDate}{" "}
          </span>
          <span>
            {" "}
            <i className="fas fa-calendar"></i> deadline: {scholarship.deadline}
          </span>
        </p>
      </div>
      <img src={scholarship.universityImage} alt="" />
      <div className="overflow-x-auto mt-6">
        <table className="table table-bordered w-full bg-base-100 shadow border border-black/20 my-5">
          <tbody>
            <tr>
              <th>Scholarship Name</th>
              <td>{scholarship.scholarshipName}</td>
            </tr>
            <tr>
              <th>University</th>
              <td>{scholarship.universityName}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{scholarship.country}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{scholarship.city}</td>
            </tr>
            <tr>
              <th>World Rank</th>
              <td>{scholarship.worldRank}</td>
            </tr>
            <tr>
              <th>Subject Category</th>
              <td>{scholarship.subjectCategory}</td>
            </tr>
            <tr>
              <th>Scholarship Category</th>
              <td>{scholarship.scholarshipCategory}</td>
            </tr>
            <tr>
              <th>Degree</th>
              <td>{scholarship.degree}</td>
            </tr>
            <tr>
              <th>Tuition Fees</th>
              <td>{scholarship.tuitionFees}</td>
            </tr>
            <tr>
              <th>Application Fees</th>
              <td>{scholarship.applicationFees}</td>
            </tr>
            <tr>
              <th>Service Charge</th>
              <td>{scholarship.serviceCharge}</td>
            </tr>
            <tr>
              <th>Deadline</th>
              <td>{scholarship.deadline}</td>
            </tr>
            <tr>
              <th>Posted Date</th>
              <td>{scholarship.postDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="">
        <Link
          to={`/apply-scholarship?id=${scholarship._id}`}
          className="btn btn-primary btn-block rounded-none mb-5"
        >
          Apply
        </Link>
      </div>
      <div className="">
        <h1 className="text-5xl my-2 font-thin">
          Reviews
        </h1>
      </div>
      <div className="mt-2 mb-5">
        <ReviewSlider reviews={reviews} />
      </div>
    </div>
  );
}

export default ScholarshipDetails;
