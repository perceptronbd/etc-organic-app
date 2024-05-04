import React, { useEffect, useState } from "react";
import { Container } from "./../../components/container/Container";
import { Table, TableSkeleton } from "./../../components/index";
import { getAllStocksApi } from "../../api/stock/stock";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export const StockQuantity = () => {
  const [stockQuantityData, setStockQuantityData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const headers = ["PRODUCT NAME", "BRANHMANBARIA", "RANGPUR", "DINAJPUR", "NOAKHALI", "TOTAL"];

  const ignoreKeys = ["sn", "_id", "__v", "createdAt", "updatedAt", "units", "productId"];

  function transformData(apiResponse) {
    return apiResponse.map((item) => {
      const { productId, productName, stock, ...rest } = item;
      return {
        productId,
        productName,
        ...stock,
        ...rest,
      };
    });
  }

  useEffect(() => {
    setLoading(true);

    //logs("stockList useEffect:", [stocksData], Style.effects);

    const getStocks = async () => {
      const response = await getAllStocksApi(user.token);
      if (response.status === 200) {
        const transformedData = transformData(response.data.data);
        setStockQuantityData(transformedData);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    };
    getStocks();
  }, []);

  return (
    <>
      <Container className={"flex-col justify-start"}>
        {loading ? (
          <TableSkeleton />
        ) : (
          <div className="max-h-screen w-full overflow-y-auto">
            <Table data={stockQuantityData} headers={headers} ignoreKeys={ignoreKeys} />
          </div>
        )}
      </Container>
    </>
  );
};
