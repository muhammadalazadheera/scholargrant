import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Loading from "./Loding";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

const ApplyScholarship = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const axios = useAxios();
  const { user } = useAuth();
  const [scholarship, setScholarship] = useState([]);
  const [fee, setFee] = useState("$0");
  const [stuId, setStuId] = useState(null);

  const id = params.get("id");
  const [paid, setPaid] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    photo: null,
    address: "",
    gender: "",
    applyingDegree: "",
    sscResult: "",
    hscResult: "",
    studyGap: "",
  });

  const degrees = ["Diploma", "Bachelor", "Masters"];
  const genders = ["Male", "Female", "Other"];
  const studyGapOptions = ["No gap", "1 year", "2 years", "3+ years"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      scholarshipCategory: scholarship.scholarshipCategory,
      subjectCategory: scholarship.subjectCategory,
      scholarshipId: id,
      studentName: user.displayName,
      studentEmail: user.email,
      studentId: stuId,
      appliedAt: new Date(),
      status: "pending",
    };

    try {
      const res = await axios.post("/apply-scholarship", dataToSubmit, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (res.data.success) {
        alert("Application submitted successfully!");
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit application.");
    }
  };

  useEffect(() => {
    axios
      .get("/user-id", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setStuId(res.data.id);
      });
  });

  useEffect(() => {
    axios
      .get(`/scholarship/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setScholarship(res.data);
        setFee(res.data.applicationFees);
      });
  }, []);

  if (scholarship.length === 0) {
    return <Loading />;
  }

  return (
    <div className="w-[85%] mx-auto mt-[70px] py-10">
      <h2 className="text-2xl text-primary font-bold">
        {scholarship.scholarshipName}
      </h2>
      <p className="text-xl">
        Application Fee: {scholarship?.applicationFees} -{" "}
        {paid ? "Paid" : "Unpaid"}
      </p>
      {!paid ? (
        <div className="border p-4 my-5 w-[50%] rounded-sm py-7">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={parseFloat(fee)}
              onSuccess={() => {
                setPaid(true)
                toast.success('Payment Successfull')
            }}
            />
          </Elements>
        </div>
      ) : (
        <div className="mt-5">
          <form
            className=" p-6 bg-gray-50 rounded-md shadow-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold mb-4">
              Scholarship Application Form
            </h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+8801XXXXXXXXX"
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Applicant Photo</label>
              <input
                type="text"
                name="photo"
                required
                defaultValue={user.photoURL}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Address (Village, District, Country)
              </label>
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your full address"
                className="textarea textarea-bordered w-full"
                rows={3}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Gender</label>
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select gender</option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Applying Degree</label>
              <select
                name="applyingDegree"
                required
                value={formData.applyingDegree}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select degree</option>
                {degrees.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">SSC Result</label>
              <input
                type="text"
                name="sscResult"
                required
                value={formData.sscResult}
                onChange={handleChange}
                placeholder="e.g., GPA 5.00"
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">HSC Result</label>
              <input
                type="text"
                name="hscResult"
                required
                value={formData.hscResult}
                onChange={handleChange}
                placeholder="e.g., GPA 4.75"
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Study Gap (Optional)
              </label>
              <select
                name="studyGap"
                value={formData.studyGap}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select if any</option>
                {studyGapOptions.map((gap) => (
                  <option key={gap} value={gap}>
                    {gap}
                  </option>
                ))}
              </select>
            </div>

            {/* Read-only fields */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">University Name</label>
              <input
                type="text"
                value={scholarship.universityName}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Scholarship Category
              </label>
              <input
                type="text"
                value={scholarship.scholarshipCategory}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Subject Category</label>
              <input
                type="text"
                value={scholarship.subjectCategory}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-6">
              Submit Application
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ApplyScholarship;
