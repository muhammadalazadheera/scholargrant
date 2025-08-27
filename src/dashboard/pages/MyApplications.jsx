import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Loading from "../../pages/Loding";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import SortInput from "../components/SortInput";

function MyApplications() {
  const { user } = useAuth();
  const axios = useAxios();
  const [applications, setApplications] = useState([]);
  const [viewApplication, setViewApplication] = useState(null);
  const [reviewForm, setReviewForm] = useState(false);
  const [reviewApp, setReviewApp] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const degrees = ["Diploma", "Bachelor", "Masters"];
  const studyGapOptions = ["No gap", "1 year", "2 years", "3+ years"];
  const [getApplication, setGetApplication] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      ...formData,
      date: new Date().toISOString().slice(0, 10),
      scholarshipName: reviewApp.scholarshipName,
      universityName: reviewApp.universityName,
      scholarshipId: reviewApp.scholarshipId,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL || null,
    };

    axios
      .post("/add-review", reviewData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        toast.success("Review added successfull!");
        setReviewForm(false);
      })
      .catch((err) => {
        console.error(
          "❌ Failed to submit review:",
          err.response?.data || err.message
        );
        // Optional: show error toast
      });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      await axios
        .delete(`/delete-application/${id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then(() => {
          setApplications(
            applications.filter((application) => application._id !== id)
          );
          Swal.fire("Deleted!", "Review has been deleted.", "success");
        });
    }
  };

  const editApp = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const updatedData = {
      phone: formData.get("phone"),
      photo: formData.get("photo"),
      address: formData.get("address"),
      applyingDegree: formData.get("applyingDegree"),
      sscResult: formData.get("sscResult"),
      hscResult: formData.get("hscResult"),
      studyGap: formData.get("studyGap") || "", // optional field fallback
    };

    // Then make PUT request to backend
    axios
      .put(`/edit-application/${reviewApp._id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setGetApplication(getApplication === true ? false : true);
        toast.success("Application successfully edited");
        setEditForm(false); // close form
      })
      .catch((err) => {
        console.error("❌ Error updating:", err);
      });
  };

  useEffect(() => {
    axios
      .get("/my-applications", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setApplications(res.data);
      });
  }, [getApplication]);

  useEffect(() => {
    axios
      .get(`/get-feedback/${viewApplication?._id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setFeedbacks(res.data);
      });
  }, [viewApplication]);

  return (
    <div>
      <h2 className="text-2xl font-light mb-4">My Applications</h2>
      <div className="bg-base-100 border-primary overflow-x-auto border shadow-sm rounded">
        <SortInput
          data={applications}
          date="appliedAt"
          field="scholarshipName"
          setData={setApplications}
        />
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>University Name</th>
              <th>Degree</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No Applications Found
                </td>
              </tr>
            ) : (
              applications.map((application) => (
                <tr key={application._id} className="capitalize">
                  <td>{application?.scholarshipName}</td>
                  <td>{application?.universityName}</td>
                  <td>{application?.applyingDegree}</td>
                  <td>{application?.scholarshipCategory}</td>
                  <td>{application?.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setReviewForm(true);
                        setReviewApp(application);
                      }}
                      className="btn btn-primary btn-sm mx-1"
                    >
                      <i className="fas fa-star"></i>
                    </button>
                    <button
                      onClick={() => setViewApplication(application)}
                      className="btn btn-primary btn-sm mx-1"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      onClick={() => {
                        setReviewApp(application);
                        setEditForm(true);
                      }}
                      disabled={application.status === "pending"}
                      className="btn btn-warning btn-sm mx-1"
                    >
                      <i className="fas fa-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(application._id)}
                      className="btn btn-error btn-sm mx-1"
                    >
                      <i className="fas fa-cancel"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {viewApplication && (
        <div className="fixed inset-0 bg-base-200 z-50 flex items-center justify-center">
          <div className="bg-base-100 rounded shadow-lg w-[70%] p-6 overflow-y-auto max-h-[90vh] relative">
            <button
              className="absolute top-3 right-3 btn btn-sm btn-circle hover:bg-red-400"
              onClick={() => setViewApplication(null)}
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6 bg-base-100">
              {/* Scholarship Info */}
              <div className="flex-1">
                <h2 className="text-xl font-bold">
                  {viewApplication.scholarshipName}
                </h2>
                <p className="text-sm mb-4">
                  Applied At {viewApplication.appliedAt}
                </p>

                <div className="border border-primary/30 rounded">
                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      University:
                    </span>{" "}
                    {viewApplication.universityName}
                  </p>
                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Name:
                    </span>{" "}
                    {viewApplication.studentName}
                  </p>
                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Email:
                    </span>{" "}
                    {viewApplication.studentEmail}
                  </p>

                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Phone:
                    </span>{" "}
                    {viewApplication.phone}
                  </p>

                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Address:
                    </span>{" "}
                    {viewApplication.address}
                  </p>
                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Study Gap:
                    </span>{" "}
                    {viewApplication.studyGap}
                  </p>
                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      SSC:
                    </span>{" "}
                    {viewApplication.sscResult}
                  </p>
                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      HSC:
                    </span>{" "}
                    {viewApplication.hscResult}
                  </p>
                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Scholarship Category:
                    </span>{" "}
                    {viewApplication.scholarshipCategory}
                  </p>

                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Degree:
                    </span>{" "}
                    {viewApplication.applyingDegree}
                  </p>
                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Subject Category:
                    </span>{" "}
                    {viewApplication.subjectCategory}
                  </p>
                  <p className="bg-base-200 p-2 border border-base-100 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Scholarship Category:
                    </span>{" "}
                    {viewApplication.scholarshipCategory}
                  </p>
                </div>
                <div className="my-5">
                  <h2 className="text-xl font-bold">Feedbacks</h2>
                  <div className="my-4">
                    {feedbacks.map((feedback) => {
                      return (
                        <div className="bg-base-200 border border-primary/30 p-4 rounded-sm my-2">
                          <p className="font-thin text-2xl mb-1">
                            {feedback.comment}
                          </p>
                          <div className="flex items-center gap-1">
                            <img
                              className="rounded-full w-[20px]"
                              src={feedback.photo}
                              alt=""
                            />
                            <small>{feedback.userName}</small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editForm && (
        <div className="w-full md:w-[95%] mx-auto">
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box w-full max-w-[80%]">
              <h3 className="font-bold text-lg mb-4">
                Edit Scholarship Application
              </h3>
              <form
                className="p-6 bg-base-200 rounded-md shadow-md"
                onSubmit={editApp} // 🔄 Update function
              >
                {/* Phone */}
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    defaultValue={reviewApp.phone}
                    placeholder="+8801XXXXXXXXX"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Photo */}
                <div className="mb-4">
                  <label className="block mb-1 font-medium">
                    Applicant Photo
                  </label>
                  <input
                    type="text"
                    name="photo"
                    required
                    defaultValue={reviewApp.photo}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label className="block mb-1 font-medium">
                    Address (Village, District, Country)
                  </label>
                  <textarea
                    name="address"
                    required
                    defaultValue={reviewApp.address}
                    placeholder="Enter your full address"
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  ></textarea>
                </div>

                {/* Degree */}
                <div className="mb-4">
                  <label className="block mb-1 font-medium">
                    Applying Degree
                  </label>
                  <select
                    name="applyingDegree"
                    required
                    defaultValue={reviewApp.applyingDegree}
                    className="select select-bordered w-full"
                  >
                    <option defaultValue="">Select degree</option>
                    {degrees.map((d) => (
                      <option key={d} defaultValue={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SSC */}
                <div className="mb-4">
                  <label className="block mb-1 font-medium">SSC Result</label>
                  <input
                    type="text"
                    name="sscResult"
                    required
                    defaultValue={reviewApp.sscResult}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* HSC */}
                <div className="mb-4">
                  <label className="block mb-1 font-medium">HSC Result</label>
                  <input
                    type="text"
                    name="hscResult"
                    required
                    defaultValue={reviewApp.hscResult}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Study Gap */}
                <div className="mb-4">
                  <label className="block mb-1 font-medium">
                    Study Gap (Optional)
                  </label>
                  <select
                    name="studyGap"
                    defaultValue={reviewApp.studyGap}
                    className="select select-bordered w-full"
                  >
                    <option defaultValue="">Select if any</option>
                    {studyGapOptions.map((gap) => (
                      <option key={gap} defaultValue={gap}>
                        {gap}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Update Button */}
                <button type="submit" className="btn btn-primary w-full mt-6">
                  Update Application
                </button>
                <button
                  onClick={() => setEditForm(false)}
                  type="submit"
                  className="btn btn-error w-full mt-6 text-white"
                >
                  Cancel
                </button>
              </form>
            </div>
          </dialog>
        </div>
      )}

      {reviewForm && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  required
                  className="input input-bordered w-full"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="label">Review Comment</label>
                <textarea
                  name="comment"
                  required
                  className="textarea textarea-bordered w-full"
                  value={formData.comment}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setReviewForm(false)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default MyApplications;
