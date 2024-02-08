import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { authURL } from "../instances";

export const getAllOrdersApi = async () => {
    logs("API Call: getAllOrdersApi", [], Style.api);
    const storedUser = sessionStorage.getItem("user");
    const token = JSON.parse(storedUser).token;
  
    const [registerRes, registerErr] = await trycatch(
      authURL(token).get("/displayOrders")
    );
  
    if (registerErr) {
      logs("Error: getAllOrdersApi", [registerErr.response], Style.danger);
      return registerErr.response;
    }
  
    logs("Success: getAllOrdersApi", [registerRes], Style.success);
  
    return registerRes;
  };
  