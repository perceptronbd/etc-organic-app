import React from "react";
import { Table } from "./../../components/index";
import { accounts } from "../../utils/mockData";
import { csbReferers } from "../../utils/mockData";
const { referdata } = csbReferers[0];
const { date } = csbReferers[0];

export const Referers = () => {
  const ignoreKeys = ["sn", "_id", "__v", "createdAt", "updatedAt", "units"];
  return (
    <>
      <div className="w-full">
        <h5 className="text-base font-semibold my-4">CSB Holders</h5>
        <Table data={accounts} ignoreKeys={ignoreKeys} />
      </div>
      <div className="mx-2 w-7/12">
          <div className="border-2 border-green-600 rounded-lg bg-white px-4 mt-5">
          <div className="heading my-4 flex justify-between items-center">
            <h5 className="text-base font-semibold">Top 10 Referers</h5>
            <h5 className="text-base font-semibold">{date}</h5>
          </div>
            <Table data={referdata} ignoreKeys={ignoreKeys} />
          </div>
        </div>
    </>
  );
};
