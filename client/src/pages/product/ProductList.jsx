import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getAllProductsApi } from "../../api";
import { Button, Container, SearchInput, Table, TableSkeleton, Text } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { useFilter } from "../../hooks";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const { filterQuery, handleSearch, filteredData } = useFilter({ data: products });

  const headers = ["Name", "Sales Price", "CSB", "Points", "Description"];
  const actions = [{ label: "Edit", link: "edit-product" }];
  const ignoreKeys = ["sn", "_id", "__v", "createdAt", "updatedAt", "units"];

  useEffect(() => {
    setLoading(true);

    //logs("ProductList useEffect:", [productsData], Style.effects);

    const getProducts = async () => {
      const response = await getAllProductsApi(user.token);
      // logs("getProducts", [response], Style.effects);
      if (response.status === 200) {
        setProducts(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    };
    getProducts();
  }, []);

  return (
    <Container className={"flex-col justify-start"}>
      <div className="mb-2 flex w-full items-center justify-between">
        <Text variant="titleSmall" type="m">
          Product List
        </Text>
        <Button variant="primary" asChild>
          <Link to={"add-product"}>Add Product</Link>
        </Button>
      </div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="w-full rounded-md bg-foreground p-2">
          <SearchInput value={filterQuery} onChange={handleSearch} />
          <Table data={filteredData} headers={headers} actions={actions} ignoreKeys={ignoreKeys} />
        </div>
      )}
    </Container>
  );
};
