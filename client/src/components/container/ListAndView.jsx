import { GanttChartSquare, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateFormat";
import { Style, logs } from "../../utils/logs";
import { textFormat } from "../../utils/textFormat";
import { OrderCard } from "../card/OrderCard";
import { Text } from "../text/Text";

const TabContent = ({ selectedOrder, viewLoading }) => {
  const [key, setKey] = useState(0);

  const objSelectedOrder = Object.entries(selectedOrder);

  logs("TabContent: objSelectedOrder", [objSelectedOrder, viewLoading], Style.code);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [selectedOrder]);

  return viewLoading ? (
    <div className="w-[450px] rounded-lg bg-foreground p-4">
      <div className="flex items-center gap-2">
        <RefreshCw className="animate-spin text-neutral-400" />
        <Text variant="titleMedium" type="m" className={"text-neutral-400"}>
          Loading...
        </Text>
      </div>
    </div>
  ) : (
    <article key={key} className="w-[450px] animate-enterFromRight rounded-lg bg-foreground p-4">
      {selectedOrder.checkoutDetails ? (
        <div className="flex flex-col justify-between">
          <div>
            <Text variant="titleMedium" type="m" className={"text-neutral-400"}>
              Details
            </Text>
            <hr className="border" />
            <section className="my-4 w-full">
              <section className="h-52">
                <section className="flex justify-between gap-4 font-semibold">
                  <div className="w-40 font-normal text-neutral-400">Name:</div>
                  <div className="w-60 font-medium">
                    {textFormat(selectedOrder?.checkoutDetails?.name)}
                  </div>
                </section>
                <section className="flex justify-between gap-4 font-semibold">
                  <div className="w-40 font-normal text-neutral-400">Mobile:</div>
                  <div className="w-60 font-medium">
                    {textFormat(selectedOrder?.checkoutDetails?.phone)}
                  </div>
                </section>
                <section className="flex justify-between gap-4 font-semibold">
                  <div className="w-40 font-normal text-neutral-400">Address:</div>
                  <div className="w-60 font-medium">
                    {textFormat(selectedOrder?.checkoutDetails?.address)}
                  </div>
                </section>
                <section className="flex justify-between gap-4 font-semibold">
                  <div className="w-40 font-normal text-neutral-400">District:</div>
                  <div className="w-60 font-medium">
                    {textFormat(selectedOrder?.checkoutDetails?.district)}
                  </div>
                </section>
                <section className="flex justify-between gap-4 font-semibold">
                  <div className="w-40 font-normal text-neutral-400">Division:</div>
                  <div className="w-60 font-medium">
                    {textFormat(selectedOrder?.checkoutDetails?.division)}
                  </div>
                </section>
              </section>
              <section className="rounded-md border-2 px-4 py-2">
                <div className="mb-4">
                  <div className="flex w-full items-center justify-between">
                    <Text variant="titleSmall">Orders</Text>

                    <span className="items-start rounded-full px-2 text-sm">
                      {formatDate(selectedOrder.orderDate)}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2 text-sm ${
                      selectedOrder.status === "Complete"
                        ? "bg-green-200 text-green-500"
                        : "bg-yellow-200 text-yellow-500"
                    }`}
                  >
                    {textFormat(selectedOrder.status)}
                  </span>
                </div>
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 border-b-2 bg-foreground">
                    <tr>
                      <th className="whitespace-nowrap p-1 text-left text-xs font-medium uppercase text-neutral-400">
                        Product
                      </th>
                      <th className="whitespace-nowrap p-1 text-left text-xs font-medium uppercase text-neutral-400">
                        P.
                      </th>
                      <th className="whitespace-nowrap p-1 text-left text-xs font-medium uppercase text-neutral-400">
                        Qty.
                      </th>
                      <th className="whitespace-nowrap p-1 text-left text-xs font-medium uppercase text-neutral-400">
                        Sub. T.
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.cart.products.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`h-4 border-b bg-foreground text-sm font-normal `}
                        >
                          <td className="px-1 py-1 text-left text-xs font-normal">
                            <p className="w-44 truncate">{item?.product?.productName}</p>
                          </td>
                          <td className="whitespace-nowrap px-1 py-1 text-left text-xs font-normal">
                            {item?.product?.salesPrice}
                          </td>
                          <td className="whitespace-nowrap px-1 py-1 text-left text-xs font-normal">
                            {item?.quantity}
                          </td>
                          <td className="whitespace-nowrap px-1 py-1 text-left text-xs font-normal">
                            {(item?.product?.salesPrice, item?.quantity)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <section className="mt-4 flex w-full justify-between gap-4 rounded-md bg-neutral-100 p-2 font-semibold">
                  <div className="font-medium text-neutral-400">Grand Total:</div>
                  <div className=" font-medium">
                    {parseFloat(selectedOrder?.cart?.totalPrice).toFixed(2)}
                  </div>
                </section>
              </section>
            </section>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <GanttChartSquare size={200} className="rounded-lg  text-neutral-200" />
          <Text variant="titleMedium" type="sb" className={"text-neutral-400"}>
            Select Order to view details
          </Text>
        </div>
      )}
    </article>
  );
};

export const ListAndView = ({ data, setRefresh }) => {
  // logs("ListAndView:", [data], Style.code);
  const sortedData = [...data].reverse();

  const [selectedOrder, setSelectedOrder] = useState(sortedData[0] || {});
  const [loading, setLoading] = useState(false);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <>
      <div className="flex w-full justify-between gap-4">
        <div className="h-[90vh] w-fit overflow-auto overflow-x-hidden">
          {data.length > 0 &&
            sortedData.map((order, index) => (
              <OrderCard
                key={index}
                data={order}
                status={order.status}
                onClick={() => {
                  console.log("clicked OrderCard");
                  handleOrderClick(order);
                }}
                selectedOrder={selectedOrder}
                setViewLoading={setLoading}
                setRefresh={setRefresh}
              />
            ))}
        </div>
        <TabContent viewLoading={loading} selectedOrder={selectedOrder} />
      </div>
    </>
  );
};
