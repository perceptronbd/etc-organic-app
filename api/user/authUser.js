import { Style, log } from "../../utils/log";
import { authURL } from "../instances/authURL";
import { baseURL } from "../instances/baseURL";

export const registerUser = async (user) => {
  log("=======registerUser API=======", [], Style.api);
  try {
    const res = await baseURL.post("/register", user);
    log("registerUser res:", [res], Style.success);
    return res;
  } catch (error) {
    log("loginUser error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};

export const loginUser = async (user) => {
  log("=======loginUser API=======", [], Style.api);
  try {
    const res = await baseURL.post("/login", user);
    log("loginUser res:", [res], Style.success);
    return res;
  } catch (error) {
    log("loginUser error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};

export const getUserDetails = async (token) => {
  log("=======getUserDetails API=======", [], Style.api);
  try {
    const res = await authURL(token).get("/get-profile");
    log("getUserDetails res:", [res], Style.success);
    return res;
  } catch (error) {
    log("getUserDetails error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};

export const updateProfile = async (token, data) => {
  log("=======updateProfile API=======", [], Style.api);
  try {
    const res = await authURL(token).post(
      "/update-district-and-division",
      data,
    );
    log("updateProfile res:", [res], Style.success);
    return res;
  } catch (error) {
    log("updateProfile error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};
