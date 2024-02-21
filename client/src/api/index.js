export { loginApi } from "./auth/user";
export { getBranchApi } from './branch/branch';
export {
  deleteEmployeeApi,
  getAllEmployeesApi,
  getEmployeeByIdApi,
  registerEmployeeApi,
  updateEmployeeApi
} from "./employee/employee";
export { cancelOnlineOrderApi, completeOnlineOrderApi, getAllOrdersApi } from "./order/order";
export { createProductApi, deleteProductApi, getAllProductsApi, getProductByIdApi, updateProductApi } from "./product/product";
export { createPurchaseApi, getAllPurchasesApi } from './product/purchase';
export { createSaleseApi } from './product/sales';
export { getWalletHistoryByIdApi } from './withdraw/wallet';
export { confirmWithdrawRequestApi, getWithdrawRequestsApi } from './withdraw/withdraw';

