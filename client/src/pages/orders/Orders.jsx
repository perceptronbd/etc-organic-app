import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllOrdersApi } from "../../api";
import { Container, ListAndView, ListViewSkeleton, Text } from "../../components";
import { Style, logs } from "../../utils/logs";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [refresh, setRefresh] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchOrders();
  }, []);

  useEffect(() => {
    //setOrders to orders of status Pending
    // setOrders((prev) => prev.filter((order) => order.status === "Pending"));

    fetchOrders();
  }, [refresh]);

  const fetchOrders = async () => {
    const response = await getAllOrdersApi();

    logs("Orders:", [response.data], Style.effects);

    if (response.status === 200) {
      setLoading(false);
      setOrders(response.data.filter((order) => order.status === "Pending"));
    } else {
      setLoading(false);
      toast.error("Error fetching orders");
    }
  };

  return (
    <>
      {loading ? (
        <ListViewSkeleton />
      ) : orders.length !== 0 ? (
        <Container className={"w-fit justify-start"}>
          <Text variant="titleSmall" type="m" className={"self-start"}>
            Orders
          </Text>
          <ListAndView data={orders} setRefresh={setRefresh} />
        </Container>
      ) : (
        <Container
          className={"flex h-full w-full flex-col items-center justify-center bg-foreground"}
        >
          <Text variant="headerMedium" type="sb" className={"text-neutral-400"}>
            No Penidng Orders
          </Text>
        </Container>
      )}
    </>
  );
};
