import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { authURL } from "../instances";

export const getWithdrawRequestsApi = async () => {
    logs("API Call: getWithdrawRequestsApi", [], Style.api);
    const storedUser = sessionStorage.getItem("user");
    const token = JSON.parse(storedUser).token;
  
    const [registerRes, registerErr] = await trycatch(
      authURL(token).get(`/getwallethistoryERP`)
    );
  
    if (registerErr) {
      logs("Error: getWithdrawRequestsApi", [registerErr.response], Style.danger);
      return registerErr.response;
    }
  
    logs("Success: getWithdrawRequestsApi", [registerRes], Style.success);
  
    return registerRes;
  };
  