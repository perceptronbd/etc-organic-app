import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, SearchInput, Table, Text } from "../../components";
import { productData } from "../../const/mockData";
import { useFilter } from "../../hooks";

export const ProductList = () => {
  const { filterQuery, handleSearch, filteredData } = useFilter({ data: productData });

  const headers = ["Name", "Sales Price", "CSB", "Points", "Description"];
  const actions = [{ label: "Edit", link: "edit-product" }];
  const ignoreKeys = ["sn", "imgUrl", "otherKey"];

  return (
    <Container className={"flex-col justify-start"}>
      <div className="mb-2 flex w-full items-center justify-between">
        <Text variant="titleSmall" type="m">
          Product List
        </Text>
        <Button variant={"ghost"} asChild>
          <Link to={"add-product"}>Add Product</Link>
        </Button>
      </div>
      <div className="w-full rounded-md bg-foreground p-2">
        <SearchInput value={filterQuery} onChange={handleSearch} />
        <Table data={filteredData} headers={headers} actions={actions} ignoreKeys={ignoreKeys} />
      </div>
    </Container>
  );
};
