import { Style, log } from "../../utils/log";
import { authURL } from "../instances/authURL";

export const fetchProducts = async (token) => {
  log("=======fetchProducts API=======", [], Style.api);
  try {
    const res = await authURL(token).get("/get-products");
    log("=======fetchProducts response=======", [res], Style.success);
    return res;
  } catch (error) {
    log("=======fetchProducts error=======", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};
