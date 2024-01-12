import AsyncStorage from "@react-native-async-storage/async-storage";
import { Style, log } from "../../utils/log";
import { authURL } from "../instances/authURL";

export const requestWithdraw = async (data) => {
  log("=======withdraw API=======", [], Style.api);
  log("...withdraw api data:", data);
  try {
    const token = await AsyncStorage.getItem("user-token");
    const res = await authURL(token).post("/withdraw", data);
    log("...withdraw api response:", [res], Style.success);
    return res;
  } catch (error) {
    log("...withdraw api error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};
