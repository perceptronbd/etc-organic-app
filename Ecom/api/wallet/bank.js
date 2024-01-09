import AsyncStorage from "@react-native-async-storage/async-storage";
import { Style, log } from "../../utils/log";
import { authURL } from "../instances/authURL";

export const addBankAccount = async (data) => {
  log("=======addBankAccount API=======", [], Style.api);
  log("...addBankAccount api data:", [data]);
  try {
    const token = await AsyncStorage.getItem("user-token");
    const res = await authURL(token).post("/addBank", data);
    log("...addBankAccount api response:", [res], Style.success);
    return res;
  } catch (error) {
    log("...addBankAccount api error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};

export const getBankAccounts = async () => {
  log("=======getBankAccounts API=======", [], Style.api);
  try {
    const token = await AsyncStorage.getItem("user-token");
    const res = await authURL(token).get("/getBank");
    log("...getBankAccounts api response:", [res], Style.success);
    return res;
  } catch (error) {
    log("...getBankAccounts api error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};

export const deleteBankAccount = async (bankId) => {
  log("=======deleteBankAccount API=======", [], Style.api);
  log("...deleteBankAccount api data:", [bankId]);
  try {
    const token = await AsyncStorage.getItem("user-token");
    // Pass the bankId within the `data` property of the config object
    const res = await authURL(token).delete("/deleteBank", {
      data: { bankId: bankId },
    });
    log("...deleteBankAccount api response:", [res], Style.success);
    return res;
  } catch (error) {
    log("...deleteBankAccount api error:", [error], Style.danger);
    const errorResponse = error.response;
    return errorResponse;
  }
};
