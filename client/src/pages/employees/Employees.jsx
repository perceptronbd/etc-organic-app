import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getAllEmployeesApi } from "../../api";
import { Button, Container, SearchInput, TableSkeleton, Text } from "../../components";
import { useFilter } from "../../hooks";
import { Style, logs } from "../../utils/logs";
import { EmployeeTable } from "./EmployeeTable";

export const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);

  const [loading, setLoading] = useState(false);

  const { filterQuery, handleSearch, filteredData } = useFilter({ data: employeeData });

  useEffect(() => {
    setLoading(true);
    const fetchEmployees = async () => {
      const res = await getAllEmployeesApi();
      logs("fetchEmployees: getAllEmployeesApi res", [res], Style.function);
      if (res?.status === 200) {
        setLoading(false);
        setEmployeeData(res.data);
      } else {
        setLoading(false);
        toast.error("Something went wrong!");
      }
    };
    fetchEmployees();
  }, []);

  return (
    <Container className={"justify-start"}>
      <>
        <div className="mb-2 flex w-full items-center justify-between">
          <Text variant="titleSmall" type="m">
            Employee List
          </Text>
          <Button variant="primary" asChild>
            <Link to={"add-employee"}>Add Employee</Link>
          </Button>
        </div>
        {loading ? (
          <TableSkeleton />
        ) : (
          <div className="w-full rounded-md bg-foreground p-2">
            <SearchInput value={filterQuery} onChange={handleSearch} />
            <EmployeeTable data={filteredData} />
          </div>
        )}
      </>
    </Container>
  );
};
