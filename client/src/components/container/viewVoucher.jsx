import {  RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Style, logs } from "../../utils/logs";
import { Text } from "../text/Text";
import { VoucherCard } from "../card/voucherCard";
import voucherImage from "../../assets/images/voucher.png"

const TabContent = ({ selectedVoucher, viewLoading }) => {
  const [key, setKey] = useState(0);

  const objSelectedOrder = Object.entries(selectedVoucher);

  logs("TabContent: objSelectedOrder", [objSelectedOrder, viewLoading], Style.code);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [selectedVoucher]);

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
    <article key={key} className="w-[750px] animate-enterFromRight p-4">
    <div className="voucher relative">
        <div className="text absolute bottom-5 right-20">
        <h4 className="text-2xl text-yellow font-bold">Voucher  <span className="text-green-700">{selectedVoucher.voucher}</span></h4>
        <h4 className="text-lg font-semibold my-2 text-green-700">Expire Date {selectedVoucher.expireDate}</h4>
        <h4 className="text-lg font-semibold my-2 text-green-700">Credit {selectedVoucher.credit}</h4>
        </div>

    <img  src={voucherImage} alt="voucherImage" />
    </div>

    </article>
  );
};

export const ViewVoucher = ({ data, setRefresh }) => {
  // logs("ListAndView:", [data], Style.code);
  const sortedData = [...data].reverse();

  const [selectedVoucher, setSelectedVoucher] = useState(sortedData[0] || {});
  const [loading, setLoading] = useState(false);

  const handleVoucherClick = (Voucher) => {
    setSelectedVoucher(Voucher);
    
  };

  return (
    <>
      <div className="flex w-full justify-between gap-4">
        <div className="h-[90vh] w-fit overflow-auto overflow-x-hidden">
          {data.length > 0 &&
            sortedData.map((Voucher, index) => (
              <VoucherCard
                key={index}
                data={Voucher}
                status={Voucher.status}
                onClick={() => {
                  handleVoucherClick(Voucher);
                }}
                selectedVoucher={selectedVoucher}
                setViewLoading={setLoading}
                setRefresh={setRefresh}
              />
            ))}
        </div>
        <TabContent viewLoading={loading} selectedVoucher={selectedVoucher} />
      </div>
    </>
  );
};
