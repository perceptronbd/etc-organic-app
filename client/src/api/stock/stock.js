import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { authFileURL, authURL } from "../instances";

export const getAllStocksApi = async () => {
  logs("API Call: getAllStockApi", [], Style.api);
  const storedUser = sessionStorage.getItem("user");
  const token = JSON.parse(storedUser).token;

  const [registerRes, registerErr] = await trycatch(authURL(token).get("/stocks/get-all-stocks"));

  if (registerErr) {
    logs("Error: getAllProductsApi", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: getAllProductsApi", [registerRes], Style.success);

  return registerRes;
};
