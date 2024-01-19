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

export const getEmployeeByIdApi = async (id) => {
  logs("API Call: getEmployeeByIdApi", [id], Style.api);

  const [employeeRes, employeeErr] = await trycatch(noAuthURL().get(`/employee/getuserbyid/${id}`));

  if (employeeErr) {
    logs("Error: getEmployeeByIdApi", [employeeErr.response], Style.danger);
    return employeeErr.response;
  }

  logs("Success: getEmployeeByIdApi", [employeeRes], Style.success);

  return employeeRes;
};

export const getAllEmployeesApi = async () => {
  logs("API Call: getAllEmployeesApi", [], Style.api);

  const [employeesRes, employeesErr] = await trycatch(noAuthURL().get("/employee/getallusers"));

  if (employeesErr) {
    logs("Error: getAllEmployeesApi", [employeesErr.response], Style.danger);
    return employeesErr.response;
  }

  logs("Success: getAllEmployeesApi", [employeesRes], Style.success);

  return employeesRes;
};

export const deleteEmployeeApi = async (id) => {
  logs("API Call: deleteEmployeeApi", [id], Style.api);

  const [deleteRes, deleteErr] = await trycatch(noAuthURL().delete(`/employee/deleteuser/${id}`));

  if (deleteErr) {
    logs("Error: deleteEmployeeApi", [deleteErr.response], Style.danger);
    return deleteErr.response;
  }

  logs("Success: deleteEmployeeApi", [deleteRes], Style.success);

  return deleteRes;
};

export const updateEmployeeApi = async (id, data) => {
  logs("API Call: updateEmployeeApi", [], Style.api);
  logs("Data: updateEmployeeApi", [data], Style.code);

  const [updateRes, updateErr] = await trycatch(
    noAuthURL().put(`/employee/update-users/${id}`, data)
  );

  if (updateErr) {
    logs("Error: updateEmployeeApi", [updateErr.response], Style.danger);
    return updateErr.response;
  }

  logs("Success: updateEmployeeApi", [updateRes], Style.success);

  return updateRes;
};
