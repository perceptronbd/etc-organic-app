import { Info } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { getWithdrawRequestsApi } from "../../api";
import { Button, Container, ContentModal, Text } from "../../components";
import { useModal } from "../../hooks";

export const CashWithdraw = () => {
  const {
    showModal: showEarnings,
    openModal: openEarnings,
    closeModal: closeEarnings,
  } = useModal();

  useEffect(() => {
    const getWithdrawRequests = async () => {
      const response = await getWithdrawRequestsApi();
      //logs("Withdraw Requests", [response], Style.effects);

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    };

    getWithdrawRequests();
  }, []);

  const handleShowEarnings = () => {
    openEarnings();
  };

  return (
    <Container className={"justify-start"}>
      <Text variant="titleMedium" type="m" className={"self-start"}>
        Cash With Request
      </Text>
      <div className="h-screen self-start overflow-y-auto">
        <CashWithdrawCard showEarnings={handleShowEarnings} />
        <CashWithdrawCard showEarnings={handleShowEarnings} />
        <CashWithdrawCard showEarnings={handleShowEarnings} />
      </div>
      <ContentModal isOpen={showEarnings} closeModal={closeEarnings} title="Earning History">
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
        <EarningHistory />
      </ContentModal>
    </Container>
  );
};

const CashWithdrawCard = ({ showEarnings }) => {
  return (
    <>
      <section className="mx-1 my-2 w-[800px] self-start rounded-md bg-foreground px-4 py-2">
        <div>
          <div className="flex gap-6">
            <Text variant="bodySmall" className={"w-20 text-neutral-400"}>
              Username
            </Text>
            <Text variant="bodySmall" type="m">
              : Username
            </Text>
          </div>
          <div className="flex gap-6">
            <Text variant="bodySmall" className={"w-20 text-neutral-400"}>
              User ID
            </Text>
            <Text variant="bodySmall" type="m">
              : User ID
            </Text>
          </div>
          <div className="flex gap-6">
            <Text variant="bodySmall" className={"w-20 text-neutral-400"}>
              Number
            </Text>
            <Text variant="bodySmall" type="m">
              : 01712244605
            </Text>
          </div>
        </div>
        <hr className="mb-2 border" />
        <div className="flex items-center gap-2">
          <Text variant="titleSmall" type="m">
            Amount:
          </Text>
          <Text variant="titleSmall">
            <span className="font-semibold"> 1000</span> TK{" "}
            <Button size="icon" variant="ghost" className="h-5 w-5" onClick={showEarnings}>
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

const EarningHistory = () => {
  return (
    <section className="m-1 w-[800px] self-start rounded-md border-2 bg-foreground px-4 py-2">
      <div className="grid h-32 grid-rows-4 ">
        <div className="flex h-fit justify-between">
          <Text variant="bodyMedium" type="b">
            Refer and Earn program
          </Text>
          <Text variant="bodyMedium" type="b">
            18-04-23
          </Text>
        </div>
        <div className="flex h-fit justify-between">
          <Text variant="bodySmall" type="b" className={"text-neutral-400"}>
            +100 CSB
          </Text>
          <Text variant="bodySmall" type="b" className={"text-neutral-400"}>
            08:44 PM
          </Text>
        </div>
        <div className="row-end-5 flex h-fit justify-between">
          <Text variant="bodySmall" className={"w-80"}>
            A sale was made in the Referral Generation
          </Text>
          <Text variant="bodySmall" type="b">
            10%
          </Text>
        </div>
      </div>
    </section>
  );
};
