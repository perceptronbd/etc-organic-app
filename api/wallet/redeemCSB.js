import AsyncStorage from "@react-native-async-storage/async-storage";
import { Style, log } from "../../utils/log";
import { authURL } from "../instances/authURL";

export const redeemCSB = async () => {
  log("=======redeemCSB API=======", [], Style.api);
  try {
    const token = await AsyncStorage.getItem("user-token");
    const res = await authURL(token).post("/redeemCSB");
    log("...redeemCSB api response:", [res], Style.success);
    return res;
  } catch (error) {
    log("...redeemCSB api error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};
