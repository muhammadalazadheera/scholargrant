import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://scholargrant.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;