import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { authURL } from "../instances";

export const getWithdrawRequestsApi = async () => {
    logs("API Call: getWithdrawRequestsApi", [], Style.api);
    const storedUser = sessionStorage.getItem("user");
    const token = JSON.parse(storedUser).token;
  
    const [registerRes, registerErr] = await trycatch(
      authURL(token).get(`/getWithdrawRequests`)
    );
  
    if (registerErr) {
      logs("Error: getWithdrawRequestsApi", [registerErr.response], Style.danger);
      return registerErr.response;
    }
  
    logs("Success: getWithdrawRequestsApi", [registerRes], Style.success);
  
    return registerRes;
  };

  export const confirmWithdrawRequestApi = async (id) => {
    logs("API Call: confirmWithdrawRequestApi", [id], Style.api);
    const storedUser = sessionStorage.getItem("user");
    const token = JSON.parse(storedUser).token;
  
    const [registerRes, registerErr] = await trycatch(
      authURL(token).put(`/confirmWithdrawRequest/${id}`)
    );
  
    if (registerErr) {
      logs("Error: confirmWithdrawRequestApi", [registerErr.response], Style.danger);
      return registerErr.response;
    }
  
    logs("Success: confirmWithdrawRequestApi", [registerRes], Style.success);
  
    return registerRes;
  }
  