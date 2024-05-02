import React, { useState } from "react";
import { Text } from "../text/Text";
import { SearchInput } from "../input/SearchInput";

export const StockTable = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {data ? (
        <article className="rounded-lg bg-foreground pb-1 pl-1 pt-4">
          <div className="flex items-center justify-between px-4">
            <Text h2>Stock Quantity</Text>
            <SearchInput value={searchQuery} onChange={handleSearch} />
          </div>
          <div className="3xl:max-h-[780px] max-h-[480px] w-full overflow-y-auto rounded-lg">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 border-b-2 border-background bg-foreground text-xs uppercase text-textColor-light">
                <tr className="w-[900px]">
                  {Object.keys(data[0]).map((item, index) =>
                    item === "id" ? (
                      ""
                    ) : (
                      <th className="whitespace-nowrap p-4 text-left font-medium" key={index}>
                        {item}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <div className="my-8 text-xl font-bold text-textColor-light">No Data</div>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={index} className={`border-b-2 border-background font-semibold `}>
                      {Object.keys(item).map((key, index) => {
                        if (key === "id") return "";
                        return (
                          <td className="p-4 text-left" key={index}>
                            {item[key]}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-foreground">
          <Text h1 className={"text-textColor-light"}>
            No Data to Show
          </Text>
        </div>
      )}
    </>
  );
};
