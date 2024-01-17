import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { noAuthURL } from "../instances";

export const registerEmployeeApi = async (data) => {
  logs("API Call: registerEmployeeApi", [], Style.api);
  logs("Data: registerEmployeeApi", [data], Style.code);

  const [registerRes, registerErr] = await trycatch(noAuthURL().post("/employee/register", data));

  if (registerErr) {
    logs("Error: registerEmployeeApi", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: registerEmployeeApi", [registerRes], Style.success);

  return registerRes;
};
