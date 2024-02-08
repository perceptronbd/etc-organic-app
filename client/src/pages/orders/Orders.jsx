import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllOrdersApi } from "../../api";
import { Container, ListAndView, ListViewSkeleton, Text } from "../../components";
import { Style, logs } from "../../utils/logs";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      const response = await getAllOrdersApi();

      logs("Orders:", [response.data], Style.effects);

      if (response.status === 200) {
        setLoading(false);
        setOrders(response.data);
      } else {
        setLoading(false);
        toast.error("Error fetching orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      {loading ? (
        <ListViewSkeleton />
      ) : (
        <Container className={"w-fit justify-start"}>
          <Text variant="titleSmall" type="m" className={"self-start"}>
            Orders
          </Text>
          <ListAndView data={orders} />
        </Container>
      )}
    </>
  );
};
