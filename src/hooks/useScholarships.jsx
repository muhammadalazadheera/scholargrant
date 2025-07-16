import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

export const useScholarships = ({ page = 1, limit = 10, search = "" }) => {
  const axios = useAxios();
  const { user } = useAuth();

  const fetchScholarships = async () => {
    const res = await axios.get("/scholarships", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      params: {
        page,
        limit,
        search,
      },
    });
    return res.data;
  };

  return useQuery({
    queryKey: ["scholarships", page, limit, search], // key changes on param changes
    queryFn: fetchScholarships,
    keepPreviousData: true, // for smooth pagination
  });
};
