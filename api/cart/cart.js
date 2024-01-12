import AsyncStorage from "@react-native-async-storage/async-storage";
import { Style, log } from "../../utils/log";
import { authURL } from "../instances/authURL";

export const addToCart = async (productId, quantity) => {
  log("=======addToCart API=======", [], Style.api);
  try {
    const token = await AsyncStorage.getItem("user-token");
    const res = await authURL(token).post("/add-to-cart", {
      productId,
      quantity,
    });
    log("...addToCart api response:", [res], Style.success);
    return res;
  } catch (error) {
    log("...addToCart api error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};

export const getCartDetails = async () => {
  log("=======getCartDetails API=======", [], Style.api);
  try {
    const token = await AsyncStorage.getItem("user-token");
    const res = await authURL(token).get("/get-cart-details");
    log("...getCartDetails api response:", [res], Style.success);
    return res;
  } catch (error) {
    log("...getCartDetails api error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};

export const increaseQuantity = async (productId) => {
  log("=======increaseQuantity API=======", [], Style.api);
  try {
    const token = await AsyncStorage.getItem("user-token");
    const res = await authURL(token).post("/increase-quantity", {
      productId,
    });
    log("...increaseQuantity api response:", [res], Style.success);
    return res;
  } catch (error) {
    log("...increaseQuantity api error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};

export const decreaseQuantity = async (productId) => {
  log("=======decreaseQuantity API=======", [], Style.api);
  try {
    const token = await AsyncStorage.getItem("user-token");
    const res = await authURL(token).post("/decrease-quantity", {
      productId,
    });
    log("...decreaseQuantity api response:", [res], Style.success);
    return res;
  } catch (error) {
    log("...decreaseQuantity api error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};
