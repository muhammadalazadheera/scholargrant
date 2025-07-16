import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const AddScholar = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const axios = useAxios();
  const {user} = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!imageFile) return alert("Please select an image first.");
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();
    const formData = new FormData(e.target);
    const payload = {
      scholarshipName: formData.get("scholarshipName"),
      universityName: formData.get("universityName"),
      universityImage: imageUrl,
      country: formData.get("country"),
      city: formData.get("city"),
      worldRank: formData.get("worldRank"),
      subjectCategory: formData.get("subjectCategory"),
      scholarshipCategory: formData.get("scholarshipCategory"),
      degree: formData.get("degree"),
      tuitionFees: formData.get("tuitionFees"),
      applicationFees: formData.get("applicationFees"),
      serviceCharge: formData.get("serviceCharge"),
      deadline: formData.get("deadline"),
      postDate: formData.get("postDate"),
      postedBy: formData.get("postedBy"),
    };
    console.log("Scholarship Data:", payload);
    // Submit payload to backend
    axios.post('/add-scholarship',payload,{
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    })
    .then((res) => {
        toast.success(`${res.data.message}`)
        e.target.reset()
    })
    .catch(error => {
        toast.error(`${error.message}`)
    })
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-sm border border-black/5"
    >
      <h2 className="text-2xl font-bold mb-6">Add Scholarship</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="scholarshipName"
          placeholder="Scholarship Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="universityName"
          placeholder="University Name"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="country"
          placeholder="University Country"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="University City"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="worldRank"
          placeholder="University World Rank"
          className="input input-bordered w-full"
          required
        />

        {/* Subject Category */}
        <select
          name="subjectCategory"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Subject Category</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Engineering">Engineering</option>
          <option value="Doctor">Doctor</option>
        </select>

        {/* Scholarship Category */}
        <select
          name="scholarshipCategory"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Scholarship Category</option>
          <option value="Full fund">Full fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>

        {/* Degree */}
        <select
          name="degree"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Degree</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>

        <input
          type="text"
          name="tuitionFees"
          placeholder="Tuition Fees (optional)"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="applicationFees"
          placeholder="Application Fees"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="serviceCharge"
          placeholder="Service Charge"
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          name="deadline"
          placeholder="Application Deadline"
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          name="postDate"
          placeholder="Scholarship Post Date"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="postedBy"
          placeholder="Posted User Email"
          className="input input-bordered w-full"
          required
          readOnly
          defaultValue={user.email}
        />
      </div>
      {/* Image upload */}
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 rounded w-32 h-32 object-cover"
            />
          )}
        </div>

      <button className="btn btn-primary mt-4">Submit Scholarship</button>
    </form>
  );
};

export default AddScholar;
