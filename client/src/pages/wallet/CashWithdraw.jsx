import { Info, LucideLoader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { getWalletHistoryByIdApi, getWithdrawRequestsApi } from "../../api";
import { Button, Container, ContentModal, Text } from "../../components";
import { useModal } from "../../hooks";

export const CashWithdraw = () => {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [walletHistory, setWalletHistory] = useState([]);

  const [fetchingData, setFetchingData] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(false);

  const {
    showModal: showEarnings,
    openModal: openEarnings,
    closeModal: closeEarnings,
  } = useModal();

  useEffect(() => {
    setFetchingData(true);

    getWithdrawRequests();
  }, []);

  const getWithdrawRequests = async () => {
    const response = await getWithdrawRequestsApi();
    //logs("Withdraw Requests", [response], Style.effects);

    if (response.status === 200 || response.status === 201) {
      console.log("withdrawRequests", response.data.withdrawRequests);
      setWithdrawRequests(response.data.withdrawRequests.reverse());
      setFetchingData(false);
    } else {
      setFetchingData(false);
      toast.error(response.data.message);
    }
  };

  const handleShowEarnings = async (id) => {
    setFetchingHistory(true);
    toast.custom((t) => {
      return (
        <div className="flex items-center justify-between gap-4 rounded-lg bg-foreground p-4">
          <div className="flex h-4 w-4 animate-spin items-center justify-center rounded-full">
            <LucideLoader2 />
          </div>
          <Text>Fetching wallet history...</Text>
          <button
            className={
              "group flex h-5 w-5 items-center justify-center rounded bg-red-500 transition-all duration-300 ease-in-out"
            }
            onClick={() => toast.dismiss(t)}
          >
            <X className="text-white" />
          </button>
        </div>
      );
    });

    const response = await getWalletHistoryByIdApi(id);
    console.log("response", id);
    // console.log("walletHistory", response);
    if (response.status === 200 || response.status === 201) {
      setWalletHistory(response.data.data.reverse());
      setFetchingHistory(false);
      toast.success(`Wallet history fetched successfully!`);
      openEarnings();
    } else {
      setFetchingHistory(false);
      toast.error(response.data.message);
    }
  };

  return withdrawRequests.length === 0 ? (
    <Container className={"flex h-full w-full flex-col items-center justify-center bg-foreground"}>
      <Text variant="headerMedium" type="sb" className={"text-neutral-400"}>
        No Withdraw Requests Available!
      </Text>
    </Container>
  ) : (
    <Container className={"justify-start"}>
      <Text variant="titleMedium" type="m" className={"self-start"}>
        Cash Withdraw Request
      </Text>
      <div className="h-screen self-start overflow-y-auto">
        {withdrawRequests.map((item) => (
          <CashWithdrawCard key={item._id} data={item} showEarnings={handleShowEarnings} />
        ))}
      </div>
      <ContentModal isOpen={showEarnings} closeModal={closeEarnings} title="Earning History">
        {walletHistory.map((item) => (
          <EarningHistory key={item._id} data={item} />
        ))}
      </ContentModal>
    </Container>
  );
};

const CashWithdrawCard = ({ data, showEarnings }) => {
  return (
    <>
      <section className="mx-1 my-2 w-[800px] self-start rounded-md bg-foreground px-4 py-2">
        <div>
          <div className="flex gap-6">
            <Text variant="bodySmall" className={"w-20 text-neutral-400"}>
              Username
            </Text>
            <Text variant="bodySmall" type="m">
              : {data.userId.name}
            </Text>
          </div>
          <div className="flex gap-6">
            <Text variant="bodySmall" className={"w-20 text-neutral-400"}>
              Ref Code:
            </Text>
            <Text variant="bodySmall" type="b" className={"text-accent"}>
              : {data.userId.referralCode}
            </Text>
          </div>
          <div className="flex gap-6">
            <Text variant="bodySmall" className={"w-20 text-neutral-400"}>
              Number
            </Text>
            <Text variant="bodySmall" type="m">
              : {data.userId.mobileNumber}
            </Text>
          </div>
        </div>
        <hr className="mb-2 border" />
        <div className="flex items-center gap-2">
          <Text variant="titleSmall" type="m">
            Amount:
          </Text>
          <Text variant="titleSmall">
            <span className="font-semibold"> {data.withdrawAmount}</span> TK{" "}
            <Button
              size="icon"
              variant="ghost"
              className="h-5 w-5"
              onClick={() => showEarnings(data.userId._id)}
            >
              <Info size={16} />
            </Button>
          </Text>
        </div>
        <div className="flex w-full justify-end gap-2">
          <Button variant="outline">Details</Button>
          <Button variant="primary">Mark as Paid</Button>
        </div>
      </section>
    </>
  );
};

const EarningHistory = ({ data }) => {
  return (
    <section className="m-1 w-[800px] self-start rounded-md border-2 bg-foreground px-4 py-2">
      <div className="grid h-32 grid-rows-4 ">
        <div className="flex h-fit justify-between">
          <Text variant="bodyMedium" type="b">
            Refer and Earn program
          </Text>
          <Text variant="bodyMedium" type="b">
            {data.date}
          </Text>
        </div>
        <div className="flex h-fit justify-between">
          <Text variant="bodySmall" type="b" className={"text-neutral-400"}>
            {data.csb} CSB
          </Text>
          <Text variant="bodySmall" type="b" className={"text-neutral-400"}>
            {data.time}
          </Text>
        </div>
        <div className="row-end-5 flex h-fit justify-between">
          <Text variant="bodySmall" className={"w-80"}>
            A sale was made in the Referral Generation
          </Text>
          <Text variant="bodySmall" type="b">
            {data.percentage * 100}%
          </Text>
        </div>
      </div>
    </section>
  );
};
