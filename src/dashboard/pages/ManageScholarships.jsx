import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useScholarships } from "../../hooks/useScholarships";
import Loading from "../../pages/Loding";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useScholarshipsExtend } from "../../hooks/useScholarshipsExtend";
import SortInput from "../components/SortInput"

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const { data, refetch, isLoading } = useScholarshipsExtend()
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [viewingScholarship, setViewingScholarship] = useState(null);
  const axios = useAxios();
  const { user } = useAuth();

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`/delete-scholarship/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      refetch();
      Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const id = e.target.id.value;

    const updatedData = {
      scholarshipName: form.scholarshipName.value,
      universityName: form.universityName.value,
      country: form.country.value,
      city: form.city.value,
      worldRank: form.worldRank.value,
      subjectCategory: form.subjectCategory.value,
      scholarshipCategory: form.scholarshipCategory.value,
      degree: form.degree.value,
      tuitionFees: form.tuitionFees.value,
      applicationFees: form.applicationFees.value,
      serviceCharge: form.serviceCharge.value,
      deadline: form.deadline.value,
      postDate: form.postDate.value,
      postedBy: form.postedBy.value,
    };

    await axios.put(`/edit-scholarship/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    setEditingScholarship(null);
    refetch();
    Swal.fire("Updated!", "Scholarship has been updated.", "success");
  };

  useEffect(() => {
    if (data) {
      setScholarships(data);
    }
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div className="">
      <h2 className="text-2xl mb-4 font-light">Manage Scholarships</h2>
      <div className="overflow-x-auto bg-base-100 border border-primary rounded">
        <SortInput data={scholarships} date="postDate" field="scholarshipName" setData={setScholarships} />
        <table className="table table-zebra w-full text-xs">
          <thead>
            <tr>
              <th>Name</th>
              <th>University</th>
              <th>Subject Category</th>
              <th>Degree</th>
              <th>Application Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((sch) => (
              <tr key={sch._id}>
                <td>{sch.scholarshipName}</td>
                <td>{sch.universityName}</td>
                <td>{sch.subjectCategory}</td>
                <td>{sch.degree}</td>
                <td>{sch.applicationFees}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => setViewingScholarship(sch)}
                  >
                    <i className="fas fa-eye text-white text-lg"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => setEditingScholarship(sch)}
                  >
                    <i className="fas fa-pencil text-white text-lg"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(sch._id)}
                  >
                    <i className="fas fa-trash text-white text-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewingScholarship && (
        <div className="fixed inset-0 bg-base-300 z-50 flex items-center justify-center ">
          <div className="bg-base-200 border border-primary/30 rounded shadow-lg w-[70%] p-6 overflow-y-auto max-h-[90vh] relative">
            <button
              className="absolute top-3 right-3 btn btn-sm btn-circle hover:bg-red-400"
              onClick={() => setViewingScholarship(null)}
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              {/* University Image */}
              <div className="flex-shrink-0 w-full md:w-1/3">
                <img
                  src={viewingScholarship.universityImage}
                  alt="University"
                  className="w-full h-40 object-cover rounded"
                />
              </div>

              {/* Scholarship Info */}
              <div className="flex-1">
                <h2 className="text-xl font-bold">
                  {viewingScholarship.scholarshipName}
                </h2>
                <p className="text-sm text-gray-300 mb-4">
                  Posted on {viewingScholarship.postDate} by{" "}
                  {viewingScholarship.postedBy}
                </p>

                <div className="">
                  <p className="bg-base-100 p-2 border border-black/5 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      University:
                    </span>{" "}
                    {viewingScholarship.universityName}
                  </p>
                  <p className="bg-base-200 p-2 border border-black/5 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Country:
                    </span>{" "}
                    {viewingScholarship.country}
                  </p>
                  <p className="bg-base-100 p-2 border border-black/5 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      City:
                    </span>{" "}
                    {viewingScholarship.city}
                  </p>
                  <p className="bg-base-200 p-2 border border-black/5 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      World Rank:
                    </span>{" "}
                    {viewingScholarship.worldRank}
                  </p>
                  <p className="bg-base-100 p-2 border border-black/5 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Degree:
                    </span>{" "}
                    {viewingScholarship.degree}
                  </p>
                  <p className="bg-base-200 p-2 border border-black/5 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Subject Category:
                    </span>{" "}
                    {viewingScholarship.subjectCategory}
                  </p>
                  <p className="bg-base-100 p-2 border border-black/5 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Scholarship Category:
                    </span>{" "}
                    {viewingScholarship.scholarshipCategory}
                  </p>
                  <p className="bg-base-200 p-2 border border-black/5 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Tuition Fees:
                    </span>{" "}
                    {viewingScholarship.tuitionFees}
                  </p>
                  <p className="bg-base-100 p-2 border border-black/5 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Application Fees:
                    </span>{" "}
                    {viewingScholarship.applicationFees}
                  </p>
                  <p className="bg-base-200 p-2 border border-black/5 shadow-sm block">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Service Charge:
                    </span>{" "}
                    {viewingScholarship.serviceCharge}
                  </p>
                  <p className="bg-base-100 p-2 border border-black/5 shadow-sm">
                    <span className="font-semibold w-[35%] inline-block text-primary">
                      Deadline:
                    </span>{" "}
                    {viewingScholarship.deadline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingScholarship && (
        <div className="fixed inset-0 z-50 bg-base-300 bg-opacity-30 flex items-start justify-center overflow-y-auto py-10 px-4">
          <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-4xl relative p-6">
            <button
              className="btn btn-sm btn-circle absolute top-3 right-3"
              onClick={() => setEditingScholarship(null)}
            >
              ✕
            </button>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Edit Scholarship</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="hidden" name="id" value={editingScholarship._id} />

                <div>
                  <label className="label font-semibold">
                    Scholarship Name
                  </label>
                  <input
                    type="text"
                    name="scholarshipName"
                    defaultValue={editingScholarship.scholarshipName}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label font-semibold">University Name</label>
                  <input
                    type="text"
                    name="universityName"
                    defaultValue={editingScholarship.universityName}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label font-semibold">Country</label>
                  <input
                    type="text"
                    name="country"
                    defaultValue={editingScholarship.country}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label font-semibold">City</label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={editingScholarship.city}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label font-semibold">World Rank</label>
                  <input
                    type="text"
                    name="worldRank"
                    defaultValue={editingScholarship.worldRank}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label font-semibold">
                    Subject Category
                  </label>
                  <select
                    name="subjectCategory"
                    defaultValue={editingScholarship.subjectCategory}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Subject Category</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                </div>

                <div>
                  <label className="label font-semibold">
                    Scholarship Category
                  </label>
                  <select
                    name="scholarshipCategory"
                    defaultValue={editingScholarship.scholarshipCategory}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Scholarship Category</option>
                    <option value="Full fund">Full fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                  </select>
                </div>

                <div>
                  <label className="label font-semibold">Degree</label>
                  <select
                    name="degree"
                    defaultValue={editingScholarship.degree}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                </div>

                <div>
                  <label className="label font-semibold">Tuition Fees</label>
                  <input
                    type="text"
                    name="tuitionFees"
                    defaultValue={editingScholarship.tuitionFees}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label font-semibold">
                    Application Fees
                  </label>
                  <input
                    type="text"
                    name="applicationFees"
                    defaultValue={editingScholarship.applicationFees}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label font-semibold">Service Charge</label>
                  <input
                    type="text"
                    name="serviceCharge"
                    defaultValue={editingScholarship.serviceCharge}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label font-semibold">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    defaultValue={editingScholarship.deadline}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label font-semibold">Post Date</label>
                  <input
                    type="date"
                    name="postDate"
                    defaultValue={editingScholarship.postDate}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label font-semibold">
                    Posted By (Email)
                  </label>
                  <input
                    type="email"
                    name="postedBy"
                    defaultValue={editingScholarship.postedBy}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              {/* Preview only */}
              {editingScholarship.universityImage && (
                <div className="mt-4">
                  <label className="label font-semibold">
                    Current University Image
                  </label>
                  <img
                    src={editingScholarship.universityImage}
                    alt="University"
                    className="rounded w-32 h-32 object-cover mt-2"
                  />
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button type="submit" className="btn btn-success">
                  Update Scholarship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
