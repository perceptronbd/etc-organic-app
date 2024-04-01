//DOC: Table Component
//This is a reusable table component that can be used to display data in a table format. It takes in the following props:
// data: an array of objects that contain the data to be displayed
// headers: an array of strings that contain the headers for the table
// actions: an array of objects that contain the label and link for the action button
// ignoreKeys: an array of strings that contain the keys that should be ignored when displaying the data

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components";

export const Table = ({ data, headers, actions, ignoreKeys = [] }) => {
  const sortedData = [...data].reverse();

  return (
    <>
      <div className="max-h-[80vh] w-full overflow-y-auto rounded-lg">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 h-12 border-b-2 bg-foreground">
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key, index) => {
                  if (ignoreKeys.includes(key)) {
                    return null;
                  } else {
                    return (
                      <th
                        className="whitespace-nowrap p-4 text-left text-xs font-medium uppercase text-neutral-400"
                        key={index}
                      >
                        {key}
                      </th>
                    );
                  }
                })}
              {actions && actions.length > 0 && (
                <th className="whitespace-nowrap p-4 text-left text-xs font-medium uppercase text-textColor-light">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={headers.length + (actions ? 1 : 0)}>
                  <div className="my-8 text-xl font-bold text-textColor-light">No Data</div>
                </td>
              </tr>
            ) : (
              sortedData.map((item, index) => (
                <tr
                  key={index}
                  className={`h-4 bg-foreground text-sm font-normal hover:bg-neutral-200`}
                >
                  {Object.keys(item).map((key, i) => {
                    if (ignoreKeys.includes(key)) {
                      return null;
                    }
                    if (key === "image") {
                      return (
                        <td
                          className="flex items-center justify-between whitespace-nowrap px-4 py-1"
                          key={i}
                        >
                          {item[key] ? (
                            <img
                              src={item[key].secure_url}
                              alt="Img"
                              className="h-8 w-8 rounded border"
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>
                      );
                    }
                    return (
                      <td className="max-w-[10px] truncate px-4 py-1" key={i}>
                        {item[key]}
                      </td>
                    );
                  })}
                  {actions && actions.length > 0 && (
                    <td className=" px-2 py-1">
                      {actions.map((action, idx) => (
                        <Button asChild key={idx} className={"h-6"}>
                          <Link to={`${action.link}/${item._id}`}> {action.label} </Link>
                        </Button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
