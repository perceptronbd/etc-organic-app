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

export const cancelOnlineOrderApi = async (id) => {
  logs("API Call: cancelOnlineOrderApi", [], Style.api);
  const storedUser = sessionStorage.getItem("user");
  const token = JSON.parse(storedUser).token;

  const [registerRes, registerErr] = await trycatch(
    authURL(token).put(`/cancelOnlineOrder/${id}`)
  );

  if (registerErr) {
    logs("Error: cancelOnlineOrderApi", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: cancelOnlineOrderApi", [registerRes], Style.success);

  return registerRes;
}
  
export const completeOnlineOrderApi = async (id, data) => {
  logs("API Call: completeOnlineOrderApi", [], Style.api);
  const storedUser = sessionStorage.getItem("user");
  const token = JSON.parse(storedUser).token;

  const [registerRes, registerErr] = await trycatch(
    authURL(token).put(`/confirmOnlineOrder/${id}`, data)
  );

  if (registerErr) {
    logs("Error: completeOnlineOrderApi", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: completeOnlineOrderApi", [registerRes], Style.success);

  return registerRes;
}