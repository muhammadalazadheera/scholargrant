import React, { useEffect, useState } from "react";
import { useScholarships } from "../hooks/useScholarships";
import Loading from "./Loding";
import { Link } from "react-router";

function AllScholarships() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const limit = 8;
  const [scholarships, setScholarships] = useState([]);

  const { data, isLoading, isError } = useScholarships({ page, limit, search });
  const totalPages = data?.totalPages || 1;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput); // Set actual query
    setPage(1); // Reset page
  };

  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    if (!data || !data.scholarships) return;
    let sorted = [...data?.scholarships];

    if (sortOption === "oldest") {
      sorted.sort((a, b) => new Date(a.postDate) - new Date(b.postDate));
    } else if (sortOption === "newest") {
      sorted.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
    } else if (sortOption === "az") {
      sorted.sort((a, b) =>
        (a.scholarshipName || "").localeCompare(b.scholarshipName || "")
      );
    } else if (sortOption === "za") {
      sorted.sort((a, b) =>
        (b.scholarshipName || "").localeCompare(a.scholarshipName || "")
      );
    }

    setScholarships(sorted);
  }, [data, sortOption]);

  if (isLoading) return <Loading />;

  return (
    <div className="mt-[70px] py-2">
      <div className="w-[85%] mx-auto">
        <h1 className="font-bold uppercase text-primary">All Scholarships</h1>
        <h2 className="font-extralight text-4xl my-3">
          Gateway to Opportunities
        </h2>
        <p className="font-light md:w-[400px]">
          Discover a comprehensive list of scholarships tailored to various
          fields, degrees, and universities.
        </p>
      </div>

      <div className="w-[85%] mx-auto">
        <div className="mt-5">
          <small>
            Search By Scholarship Name, University Name, Country, and Degree.
            Leave Blank And Click Search Button To Get All The Scholarships.
          </small>
          <form onSubmit={handleSearch} className="mb-5">
            <input
              className="input input-primary block md:inline w-[100%] md:w-[80%] border-r-0 rounded-tr-none rounded-br-none focus-within:outline-0"
              type="text"
              name="query"
              id="query"
              placeholder="Search by University Name, Degree, etc."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <input
              className="btn btn-primary btn-block md:btn mt-2 md:mt-0 text-white md:w-[20%] rounded-none"
              type="submit"
              value="Search"
            />
          </form>

          <div className="flex justify-between items-center my-10">
            <h2 className="text-xl font-bold">Scholarships</h2>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="select select-primary"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {scholarships?.map((sch) => (
              <div
                key={sch._id}
                className="card bg-base-300 shadow-sm rounded-sm"
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
                <div className="card-body px-2">
                  <h2 className="card-title">{sch.scholarshipName}</h2>
                  <p className="text-sm text-gray-600">{sch.universityName}</p>
                  <div className="text-sm text-gray-400">
                    {sch.country}, {sch.city}
                  </div>
                  <div className="text-sm text-gray-400">
                    Tuition Fees ({sch.tuitionFees})
                  </div>
                  <div className="text-sm text-gray-400">
                    Degree: {sch.degree}
                  </div>
                  <div className="text-sm text-gray-400">
                    Posted On: {sch.postDate}
                  </div>
                  <div className="card-actions justify-start mt-4">
                    <Link
                      to={`/scholarship-details/${sch._id}`}
                      className="btn btn-sm btn-block btn-outline btn-primary"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex gap-2 mt-4 items-center justify-center flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="btn btn-warning"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`btn btn-sm ${
                    page === pageNum ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {pageNum}
                </button>
              )
            )}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="btn btn-warning"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllScholarships;
