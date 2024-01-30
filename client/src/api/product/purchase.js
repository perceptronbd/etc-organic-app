import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { authURL } from "../instances";

export const createPurchaseApi = async (data) => {
    logs("API Call: createPurchaseApi", [data], Style.api);
    
    const storedUser = sessionStorage.getItem("user");
    const token = JSON.parse(storedUser).token;
    
    const [registerRes, registerErr] = await trycatch(
        authURL(token).post("/addPurchase", data)
    );
    
    if (registerErr) {
        logs("Error: createPurchaseApi", [registerErr.response], Style.danger);
        return registerErr.response;
    }
    
    logs("Success: createPurchaseApi", [registerRes], Style.success);
    
    return registerRes;
    
}

export const getAllPurchasesApi = async () => {
    logs("API Call: getAllPurchasesApi", [], Style.api);

    const storedUser = sessionStorage.getItem("user");
    const token = JSON.parse(storedUser).token;
  
    const [registerRes, registerErr] = await trycatch(
      authURL(token).get("/getallPurchase")
    );
  
    if (registerErr) {
      logs("Error: getAllPurchasesApi", [registerErr.response], Style.danger);
      return registerErr.response;
    }
  
    logs("Success: getAllPurchasesApi", [registerRes], Style.success);
  
    return registerRes;
  }