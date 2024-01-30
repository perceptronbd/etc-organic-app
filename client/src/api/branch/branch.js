import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { noAuthURL } from "../instances";

export const getBranchApi = async () => {
    logs("API Call: getBranchApi", [], Style.api);
  
    const [registerRes, registerErr] = await trycatch(
        noAuthURL().get("/branch/getBranch")
    );
  
    if (registerErr) {
      logs("Error: getBranchApi", [registerErr.response], Style.danger);
      return registerErr.response;
    }
  
    logs("Success: getBranchApi", [registerRes], Style.success);
  
    return registerRes;
  };
  