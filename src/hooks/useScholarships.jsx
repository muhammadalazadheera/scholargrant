// hooks/useScholarships.js
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

export const useScholarships = () => {
  const axios = useAxios();
  const { user } = useAuth(); 

  const fetchScholarships = async () => {
    const res = await axios.get("/scholarships", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    });
    return res.data;
  };

  return useQuery({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
  });
};
