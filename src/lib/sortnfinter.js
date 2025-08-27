const sortFunction = (data, date, field, sortOption) => {
    if (!data) return;
    let sorted = [...data];

    if (sortOption === "oldest") {
      sorted.sort((a, b) => new Date(a[date]) - new Date(b[date]));
    } else if (sortOption === "newest") {
      sorted.sort((a, b) => new Date(b[date]) - new Date(a[date]));
    } else if (sortOption === "az") {
      sorted.sort((a, b) =>
        (a[field] || "").localeCompare(b[field] || "")
      );
    } else if (sortOption === "za") {
      sorted.sort((a, b) =>
        (b[field] || "").localeCompare(a[field] || "")
      );
    }

    return sorted;
}

export default sortFunction;
