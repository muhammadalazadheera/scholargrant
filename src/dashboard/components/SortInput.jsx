import sortFunction from "../../lib/sortnfinter";
import { useEffect, useState } from "react";
function SortInput({ data, date, field, setData }) {
  const [sortOption, setSortOption] = useState("newest");
  useEffect(() => {
    const sorted = sortFunction(data, date, field, sortOption);
    setData(sorted);
  }, [sortOption]);
  return (
    <div className="flex justify-end items-center my-10 px-4">
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
  );
}

export default SortInput;
