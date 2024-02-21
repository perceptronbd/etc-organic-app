import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { authURL } from "../instances";

export const getWalletHistoryByIdApi = async (id) => {
    logs("API Call: getWalletHistoryByIdApi", [], Style.api);
    const storedUser = sessionStorage.getItem("user");
    const token = JSON.parse(storedUser).token;
  
    const [registerRes, registerErr] = await trycatch(
      authURL(token).get(`/getwallethistoryERP/${id}`, )
    );
  
    if (registerErr) {
      logs("Error: getWalletHistoryByIdApi", [registerErr.response], Style.danger);
      return registerErr.response;
    }
  
    logs("Success: getWalletHistoryByIdApi", [registerRes], Style.success);
  
    return registerRes;
  };
  