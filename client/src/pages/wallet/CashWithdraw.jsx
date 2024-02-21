import { GanttChartSquare, Info, RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  confirmWithdrawRequestApi,
  getWalletHistoryByIdApi,
  getWithdrawRequestsApi,
} from "../../api";
import { Button, Container, ContentModal, ListViewSkeleton, Text } from "../../components";
import { useModal } from "../../hooks";
import { Style, logs } from "../../utils/logs";
import { textFormat } from "../../utils/textFormat";

export const CashWithdraw = () => {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [walletHistory, setWalletHistory] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const [fetchingData, setFetchingData] = useState(false);

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

      // filter out the pending requests
      const requests = response.data.withdrawRequests.filter(
        (request) => request.status === "pending"
      );

      setWithdrawRequests(requests.reverse());
      setFetchingData(false);
    } else {
      setFetchingData(false);
      toast.error(response.data.message);
    }
  };

  const handleShowEarnings = async (id) => {
    // setFetchingHistory(true);
    toast.loading("Fetching wallet history...");

    const response = await getWalletHistoryByIdApi(id);
    console.log("response", id);
    // console.log("walletHistory", response);
    if (response.status === 200 || response.status === 201) {
      setWalletHistory(response.data.data.reverse());
      // setFetchingHistory(false);
      toast.success(`Wallet history fetched successfully!`);
      openEarnings();
    } else {
      // setFetchingHistory(false);
      toast.error(response.data.message);
    }
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  return fetchingData ? (
    <ListViewSkeleton />
  ) : withdrawRequests.length === 0 ? (
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
      <div className="flex w-fit justify-between gap-4 self-start">
        <div className="h-[93vh] w-fit overflow-auto overflow-x-hidden 2xl:h-[95vh]">
          {withdrawRequests.map((item) => (
            <CashWithdrawCard
              key={item._id}
              data={item}
              showEarnings={handleShowEarnings}
              selectedRequest={selectedRequest}
              onViewRequest={() => handleViewRequest(item)}
              getWithdrawRequests={getWithdrawRequests}
            />
          ))}
        </div>
        <TabContent selectedRequest={selectedRequest} />
      </div>
      <ContentModal isOpen={showEarnings} closeModal={closeEarnings} title="Earning History">
        {walletHistory.map((item) => (
          <EarningHistory key={item._id} data={item} />
        ))}
      </ContentModal>
    </Container>
  );
};

const CashWithdrawCard = ({
  data,
  showEarnings,
  selectedRequest,
  onViewRequest,
  getWithdrawRequests,
}) => {
  const [acceptingRequest, setAcceptingRequest] = useState(false);

  const handlePayment = async (id) => {
    setAcceptingRequest(true);
    // console.log("handlePayment", request);
    const response = await confirmWithdrawRequestApi(id);

    if (response.status === 200 || response.status === 201) {
      getWithdrawRequests();
      setAcceptingRequest(false);
      toast.success("Marked as paid successfully!");
    } else {
      setAcceptingRequest(false);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <>
      <section
        className="mx-1 my-2 w-[550px]
       self-start rounded-md bg-foreground px-4 py-2"
      >
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
          <Button
            size="sm"
            variant="outline"
            onClick={onViewRequest}
            className={`${
              selectedRequest?._id === data._id ? "bg-secondary-light text-white" : ""
            }`}
          >
            Details
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => handlePayment(data._id)}
            loading={acceptingRequest}
          >
            Mark as Paid
          </Button>
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

const TabContent = ({ viewLoading, selectedRequest }) => {
  // const objSelectedOrder = Object.entries(selectedRequest);

  logs("TabContent: selectedRequest", [selectedRequest], Style.code);

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
    <article
      key={selectedRequest?._id || 0}
      className="w-[450px] animate-enterFromRight rounded-lg bg-foreground p-4"
    >
      {selectedRequest ? (
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
                  <div className="w-60 font-medium">{textFormat(selectedRequest?.userId.name)}</div>
                </section>
                <section className="flex justify-between gap-4 font-semibold">
                  <div className="w-40 font-normal text-neutral-400">Mobile:</div>
                  <div className="w-60 font-medium">{selectedRequest?.userId.mobileNumber}</div>
                </section>
                <section className="flex justify-between gap-4 font-semibold">
                  <div className="w-40 font-normal text-neutral-400">Taka:</div>
                  <div className="w-60 font-medium">
                    {parseFloat(selectedRequest?.userId.taka).toFixed(2)}
                  </div>
                </section>
                <section className="flex justify-between gap-4 font-semibold">
                  <div className="w-40 font-normal text-neutral-400">Total CSB:</div>
                  <div className="w-60 font-medium">
                    {parseFloat(selectedRequest?.userId.totalCSB).toFixed(2)}
                  </div>
                </section>
                <section className="flex justify-between gap-4 font-semibold">
                  <div className="w-40 font-normal text-neutral-400">Refferal Code:</div>
                  <div className="w-60 font-medium">{selectedRequest?.userId.referralCode}</div>
                </section>
              </section>
              <section className="rounded-md border-2 px-4 py-2">
                <div className="mb-4">
                  <div className="flex w-full items-center justify-between">
                    <Text variant="titleSmall">Withdraw Details</Text>

                    <span
                      className={`rounded-full px-2 text-sm ${
                        selectedRequest.paymentType === "bank"
                          ? "bg-neutral-200 text-neutral-500"
                          : " bg-green-200 text-green-500"
                      }`}
                    >
                      {selectedRequest.paymentType === "bank" ? "Bank" : "Mobile"}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2 text-sm ${
                      selectedRequest.status === "pending"
                        ? "bg-yellow-200 text-yellow-500"
                        : " bg-green-200 text-green-500"
                    }`}
                  >
                    {textFormat(selectedRequest.status)}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  {selectedRequest.paymentType === "bank" ? (
                    <section className="w-full">
                      <div className="flex justify-between">
                        <Text variant="bodySmall" type="b" className={"text-neutral-400"}>
                          Bank:
                        </Text>
                        <Text variant="bodySmall" type="m">
                          {selectedRequest.bankName}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text variant="bodySmall" type="b" className={"text-neutral-400"}>
                          Account Holder Name:
                        </Text>
                        <Text variant="bodySmall" type="m">
                          {selectedRequest.userId.name}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text variant="bodySmall" type="b" className={"text-neutral-400"}>
                          Account No:
                        </Text>
                        <Text variant="bodySmall" type="m">
                          {selectedRequest.accountNumber}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text variant="bodyMedium" type="b" className={"text-neutral-400"}>
                          Amount:
                        </Text>
                        <Text variant="bodyMedium" type="b" className={"text-primary"}>
                          {selectedRequest.withdrawAmount} TK
                        </Text>
                      </div>
                    </section>
                  ) : (
                    <section className="w-full">
                      <div className="flex justify-between">
                        <Text variant="bodySmall" type="b" className={"text-neutral-400"}>
                          Payment Type:
                        </Text>
                        <Text variant="bodySmall" type="m">
                          {selectedRequest.paymentType}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text variant="bodySmall" type="b" className={"text-neutral-400"}>
                          Account Holder Name:
                        </Text>
                        <Text variant="bodySmall" type="m">
                          {selectedRequest.userId.name}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text variant="bodySmall" type="b" className={"text-neutral-400"}>
                          Account No:
                        </Text>
                        <Text variant="bodySmall" type="m">
                          {selectedRequest.phoneNumber}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text variant="bodyMedium" type="b" className={"text-neutral-400"}>
                          Amount:
                        </Text>
                        <Text variant="bodyMedium" type="b" className={"text-primary"}>
                          {selectedRequest.withdrawAmount} TK
                        </Text>
                      </div>
                    </section>
                  )}
                </div>
              </section>
            </section>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <GanttChartSquare size={200} className="rounded-lg  text-neutral-200" />
          <Text variant="titleMedium" type="sb" className={"text-neutral-400"}>
            Click Details to view request
          </Text>
        </div>
      )}
    </article>
  );
};
