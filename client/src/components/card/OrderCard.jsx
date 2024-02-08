import React, { useState } from "react";
import { Button } from "../button/Button";
import { Text } from "../text/Text";

export const OrderCard = ({
  data,
  onClick,
  onCancel,
  onComplete,
  selectedOrder,
  setViewLoading,
}) => {
  const { status } = data;
  const [isComplete, setIsComplete] = useState(status === "complete" ? true : false);
  const [loading, setLoading] = useState(false);

  //const firstThreeKeys = Object.keys(data).slice(0, 3);

  //see if the selected order is the same as the order card
  const isSelected = selectedOrder === data;

  // logs("OrderCard:", [data, selectedOrder, isSelected], Style.code);

  const handleComplete = () => {
    setLoading(true);
    setViewLoading(true);
    setTimeout(() => {
      setIsComplete(true);
      setLoading(false);
      setViewLoading(false);
    }, 1000);
    onComplete();
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
          loading={loading}
          disabled={isComplete}
          onClick={handleComplete}
        >
          {isComplete ? "Completed" : "Complete"}
        </Button>
        <Button variant="destructive" className="h-8 w-32" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
