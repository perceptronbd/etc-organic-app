import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { authFileURL } from "../instances";

export const createProductApi = async (data, token) => {
  logs("API Call: createProductApi", [], Style.api);
  logs("Data: createProductApi", [data], Style.code);

  const [registerRes, registerErr] = await trycatch(
    authFileURL(token).post("/products/createproduct", data)
  );

  if (registerErr) {
    logs("Error: createProductApi", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: createProductApi", [registerRes], Style.success);

  return registerRes;
};
