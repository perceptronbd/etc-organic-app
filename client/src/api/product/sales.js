import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { authURL } from "../instances";

export const createSaleseApi = async (data) => {
    logs("API Call: createSaleseApi", [data], Style.api);
    
    const storedUser = sessionStorage.getItem("user");
    const token = JSON.parse(storedUser).token;
    
    const [registerRes, registerErr] = await trycatch(
        authURL(token).post("/addsales", data)
    );
    
    if (registerErr) {
        logs("Error: createSaleseApi", [registerErr.response], Style.danger);
        return registerErr.response;
    }
    
    logs("Success: createSaleseApi", [registerRes], Style.success);
    
    return registerRes;
    
}
