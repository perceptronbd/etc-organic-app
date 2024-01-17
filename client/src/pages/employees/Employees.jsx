import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getAllEmployeesApi } from "../../api";
import { Button, Container, Skeleton, Text } from "../../components";
import { Style, logs } from "../../utils/logs";
import { EmployeeTable } from "./EmployeeTable";

export const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);

  const [loading, setLoading] = useState(false);

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
          <Button variant="ghost" asChild>
            <Link to={"add-employee"}>Add Employee</Link>
          </Button>
        </div>
        {loading ? (
          <div className="grid h-full w-full grid-cols-3 grid-rows-6 gap-4">
            <Skeleton className={"row-span-1 h-full w-full grid-rows-1 bg-neutral-100"} />
            <Skeleton className={"col-span-2 h-full w-full grid-rows-1 bg-neutral-100"} />
            <Skeleton
              className={"col-span-3 row-span-6 h-full w-full grid-rows-2 bg-neutral-100"}
            />
          </div>
        ) : (
          <EmployeeTable data={employeeData} />
        )}
      </>
    </Container>
  );
};
