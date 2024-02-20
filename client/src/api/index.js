export { loginApi } from "./auth/user";
export { getBranchApi } from './branch/branch';
export {
  deleteEmployeeApi,
  getAllEmployeesApi,
  getEmployeeByIdApi,
  registerEmployeeApi,
  updateEmployeeApi
} from "./employee/employee";
export { cancelOnlineOrderApi, getAllOrdersApi, completeOnlineOrderApi } from "./order/order";
export { createProductApi, deleteProductApi, getAllProductsApi, getProductByIdApi, updateProductApi } from "./product/product";
export { createPurchaseApi, getAllPurchasesApi } from './product/purchase';
export { createSaleseApi } from './product/sales';
export { getWithdrawRequestsApi } from './withdraw/withdraw';
export { getWalletHistoryByIdApi } from './withdraw/wallet';

