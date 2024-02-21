import React, { useState } from "react";
import { toast } from "sonner";
import { cancelOnlineOrderApi, completeOnlineOrderApi } from "../../api";
import { Button } from "../button/Button";
import { Text } from "../text/Text";

export const OrderCard = ({ data, onClick, setViewLoading, setRefresh, selectedOrder }) => {
  const [completing, setCompleting] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  //const firstThreeKeys = Object.keys(data).slice(0, 3);

  //see if the selected order is the same as the order card
  const isSelected = selectedOrder === data;

  // logs("OrderCard:", [data, selectedOrder, isSelected], Style.code);

  const handleComplete = async () => {
    setCompleting(true);
    // setViewLoading(true);

    console.log("handleComplete data", data);

    const res = await completeOnlineOrderApi(data._id, {
      customerId: data.user._id,
      products: data.cart.products,
    });
    console.log("completeOnlineOrderApi res", res);
    if (res.status === 200 || res.status === 201) {
      setCompleting(false);
      setViewLoading(false);
      setRefresh((prev) => prev + 1);

      toast.success("Order completed successfully");
    } else {
      setCompleting(false);
      setViewLoading(false);

      toast.error(res.data.message || "Error completing order!");
    }
  };

  const handleCancel = async () => {
    setCancelling(true);
    setViewLoading(true);

    const res = await cancelOnlineOrderApi(data._id);
    console.log("cancelOnlineOrderApi res", res);
    if (res.status === 200 || res.status === 201) {
      setCancelling(false);
      setViewLoading(false);
      setRefresh((prev) => prev + 1);

      toast.success("Order cancelled successfully");
    } else {
      setCancelling(false);
      setViewLoading(false);

      toast.error(res.data.message || "Error cancelling order!");
    }
  };

  return (
    <div
      onClick={onClick}
      className={`my-2 flex h-28 justify-between rounded-md border-2 ${
        isSelected ? "border-accent" : "border-neutral-200"
      } bg-foreground p-6`}
    >
      <div className="grid w-80 grid-rows-3">
        <div className="flex">
          <Text className={"w-20 text-sm text-textColor-light"}>Mobile: </Text>
          <Text className={"w-36 text-sm font-semibold"}>{data?.user?.mobileNumber}</Text>
        </div>
        <div className="flex">
          <Text className={"w-20 text-sm text-textColor-light"}>Name: </Text>

          <Text className={"w-36 text-sm font-semibold"}>{data?.user?.name}</Text>
        </div>
        <div className="flex items-center">
          <Text className={"w-20 text-sm text-textColor-light"}>Ref Code: </Text>{" "}
          <span className="w-fit rounded-lg border border-accent bg-accent-light bg-opacity-20 px-2">
            <Text className={"text-xs font-semibold text-accent"}>{data?.user?.referralCode}</Text>
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-2">
        <Button
          className="h-8 w-32"
          loading={completing}
          disabled={completing}
          onClick={handleComplete}
        >
          Complete
        </Button>
        <Button
          variant="destructive"
          className="h-8 w-32"
          loading={cancelling}
          disabled={cancelling}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
