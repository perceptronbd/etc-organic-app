import { useState } from "react";
import { Button } from "../button/Button";
import { Text } from "../text/Text";

export const VoucherCard = ({ data, onClick}) => {
  const [serviceState , setServiceState] = useState(data.taken)
  const handleService = ()=>{
    if(serviceState===true){
      setServiceState(false)
    }else{
      setServiceState(false)
    }
    
  }
  return (
    <div
      className={`my-2 flex h-28 justify-between rounded-md border-2 border-accent border-neutral-200
       bg-foreground p-6`}
    >
      <div className="grid w-80 grid-rows-3">
        <div className="flex">
          <Text className={"w-20 text-sm text-textColor-light"}>Mobile: </Text>
          <Text className={"w-36 text-sm font-semibold"}>{data?.mobile}</Text>
        </div>
        <div className="flex">
          <Text className={"w-20 text-sm text-textColor-light"}>Name: </Text>

          <Text className={"w-36 text-sm font-semibold"}>{data?.name}</Text>
        </div>
        <div className="flex items-center">
          <Text className={"w-20 text-sm text-textColor-light"}>Ref Code: </Text>{" "}
          <span className="w-fit rounded-lg border border-accent bg-accent-light bg-opacity-20 px-2">
            <Text className={"text-xs font-semibold text-accent"}>{data?.refcode}</Text>
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-2">
        <Button
          className="h-8 w-32"
          onClick={onClick}
        >
          View Voucher
        </Button>
        <Button
          variant="destructive"
          className="h-8 w-32"
          onClick={handleService}
          disabled={serviceState? false : true}
        >
          {serviceState ? "Take Service" : "Service taken"} 
        </Button>
      </div>
    </div>
  );
};
