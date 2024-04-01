import React from "react";
import { Table } from "./../../components/index";
import { accounts } from "../../utils/mockData";
import { csbReferers } from "../../utils/mockData";
const { data } = csbReferers[0];
const { date } = csbReferers[0];

export const Referers = () => {
  const ignoreKeys = ["sn", "_id", "__v", "createdAt", "updatedAt", "units"];
  return (
    <>
      <div className="w-full">
        <h5 className="text-base font-semibold my-4">CSB Holders</h5>
        <Table data={accounts} ignoreKeys={ignoreKeys} />
      </div>
      <div className="mx-1 w-7/12">
        <div className="p-4 border-1">
        <div className="heading my-4 flex justify-between items-center">
          <h5 className="text-base font-semibold">Top 10 Referers</h5>
          <h5 className="text-base font-semibold">{date}</h5>
        </div>
        <Table data={data} ignoreKeys={ignoreKeys} />
        </div>
        
        
      </div>
    </>
  );
};
