import axios from "axios";
import cogoToast from "cogo-toast";

const baseService = axios.create({
  baseURL: "https://ghibliapi.herokuapp.com",
});

baseService.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    cogoToast.error(error?.response?.data?.message || "Something went wrong");
  }
);

export default baseService;
