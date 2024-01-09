import AsyncStorage from "@react-native-async-storage/async-storage";
import { Style, log } from "../../utils/log";
import { authURL } from "../instances/authURL";

export const placeOrder = async (data) => {
  log("=======placeOrder API=======", [], Style.api);
  try {
    const token = await AsyncStorage.getItem("user-token");
    const res = await authURL(token).post("/place-order", data);
    log("...placeOrder api response:", [res], Style.success);
    return res;
  } catch (error) {
    log("...placeOrder api error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};

export const getOrderDetails = async () => {
  log("=======getOrderDetails API=======", [], Style.api);
  try {
    const token = await AsyncStorage.getItem("user-token");
    const res = await authURL(token).get("/get-user-order-details");
    log("...getOrderDetails api response:", [res], Style.success);
    return res;
  } catch (error) {
    log("...getOrderDetails api error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};
