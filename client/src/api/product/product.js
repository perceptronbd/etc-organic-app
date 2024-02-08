import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { authFileURL, authURL } from "../instances";

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

export const getAllProductsApi = async () => {
  logs("API Call: getAllProductsApi", [], Style.api);
  const storedUser = sessionStorage.getItem("user");
  const token = JSON.parse(storedUser).token;

  const [registerRes, registerErr] = await trycatch(
    authURL(token).get("/products/getproducts")
  );

  if (registerErr) {
    logs("Error: getAllProductsApi", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: getAllProductsApi", [registerRes], Style.success);

  return registerRes;
};

export const getProductByIdApi = async (id) => {
  logs("API Call: getProductByIdApi", [], Style.api);
  const storedUser = sessionStorage.getItem("user");
  const token = JSON.parse(storedUser).token;

  const [registerRes, registerErr] = await trycatch(
    authURL(token).get(`/getproductById/${id}`)
  );

  if (registerErr) {
    logs("Error: getProductByIdApi", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: getProductByIdApi", [registerRes], Style.success);

  return registerRes;
};

export const updateProductApi = async (id, data) => {
  logs("API Call: updateProductApi", [], Style.api);
  logs("Data: updateProductApi", [data], Style.code);
  const storedUser = sessionStorage.getItem("user");
  const token = JSON.parse(storedUser).token;

  const [registerRes, registerErr] = await trycatch(
    authFileURL(token).put(`/updateProducts/${id}`, data)
  );

  if (registerErr) {
    logs("Error: updateProductApi", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: updateProductApi", [registerRes], Style.success);

  return registerRes;
}

export const deleteProductApi = async (id) => {
  logs("API Call: deleteProductApi", [], Style.api);
  const storedUser = sessionStorage.getItem("user");
  const token = JSON.parse(storedUser).token;

  const [registerRes, registerErr] = await trycatch(
    authURL(token).delete(`/deleteProduct/${id}`)
  );

  if (registerErr) {
    logs("Error: deleteProductApi", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: deleteProductApi", [registerRes], Style.success);

  return registerRes;
}
