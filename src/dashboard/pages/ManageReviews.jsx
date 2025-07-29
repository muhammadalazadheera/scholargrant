import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router";

function ManageReviews() {
  const axios = useAxios();
  const { user } = useAuth();
  const [editReview, setEditRevies] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState(false);
  const [getApplication, setGetApplication] = useState(false);

  const editReviewFn = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const updatedData = {
      rating: formData.get("rating"),
      comment: formData.get("comment"),
    };

    console.log(updatedData);

    // Then make PUT request to backend
    axios
      .put(`/edit-review/${editReview._id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setGetApplication(getApplication === true ? false : true);
        toast.success("Application successfully edited");
        setReviewForm(false); // close form
      })
      .catch((err) => {
        console.error("❌ Error updating:", err);
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
        .delete(`/delete-review/${id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then(() => {
          setReviews(reviews.filter((application) => application._id !== id));
          Swal.fire("Deleted!", "Review has been deleted.", "success");
        });
    }
  };

  

  useEffect(() => {
    axios
      .get("/my-reviews", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setReviews(res.data);
      });
  }, [getApplication]);

  return (
    <div>
      <div className="overflow-x-auto border shadow-sm border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-3 p-5">
          {reviews.map((application) => (
            <div
              key={application._id}
              className="card bg-base-100 shadow-sm rounded-sm p-2 mx-2 text-center"
            >
              <figure>
                <img
                className="mt-4 rounded-full"
                  src={application.userImage}
                  alt={application.scholarshipName}
                />
              </figure>
              <div className="card-body text-center">
                <h2 className="text-lg text-center text-primary">{application.userName}</h2>
                <p className="text-sm text-gray-600">{application.rating}/5</p>
                <p className="text-sm text-gray-600">{application.comment}</p>
                <div className="card-actions justify-start mt-4">
                  <button
                  onClick={() => handleDelete(application._id)}
                    className="btn btn-sm btn-block btn-outline btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {reviewForm && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add Review</h3>
            <form onSubmit={editReviewFn} className="space-y-4">
              <div>
                <label className="label">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  required
                  className="input input-bordered w-full"
                  defaultValue={editReview.rating}
                />
              </div>

              <div>
                <label className="label">Review Comment</label>
                <textarea
                  name="comment"
                  required
                  className="textarea textarea-bordered w-full"
                  defaultValue={editReview.comment}
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

export default ManageReviews;
