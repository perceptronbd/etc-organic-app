import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Divider, RadioButton } from "react-native-paper";
import tailwind from "twrnc";
import {
  addBankAccount,
  deleteBankAccount,
  getBankAccounts,
  requestWithdraw,
} from "../../../../api";
import {
  BankInfoCard,
  ContentModal,
  GoBack,
  Loading,
  StyledButton,
  StyledInput,
  StyledText,
} from "../../../../components";
import COLOR from "../../../../constants/COLOR";
import { useCustomToast } from "../../../../hooks";
import { useModal } from "../../../../hooks/useModal";

const bankInputFeilds = [
  {
    id: "bankName",
    label: "Bank Name",
    mode: "outlined",
  },
  {
    id: "branch",
    label: "Branch",
    mode: "outlined",
  },
  {
    id: "accountNumber",
    label: "Account Number",
    mode: "outlined",
  },
];

const withdraw = () => {
  const [balance, setBalance] = useState(0); //state value for balance fetched from the server for the logged in user

  const [withdrawAmount, setWithdrawAmount] = useState(""); //state value for withdraw amount
  const [paymentType, setPaymentType] = useState(""); //state value for payment type selection for withdraw
  const [bankId, setBankId] = useState(""); //state value for group selection of the bank accounts
  const [phoneNumber, setPhoneNumber] = useState(""); //state value for phone number for bkash and nagad withdraw

  const [loading, setLoading] = useState(false); //state value for loading

  const showToast = useCustomToast();

  const {
    visible: isBkash,
    showModal: showBkash,
    hideModal: hideBkash,
  } = useModal();
  const {
    visible: isNagad,
    showModal: showNagad,
    hideModal: hideNagad,
  } = useModal();
  const {
    visible: isConfirmModal,
    showModal: showConfirmModal,
    hideModal: hideConfirmModal,
  } = useModal();

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      console.log("...index redeem fetching...");
      AsyncStorage.getItem("user-data").then((data) => {
        const userData = JSON.parse(data);
        console.log("...index redeem userData", userData);
        setBalance(userData?.taka);
        setLoading(false);
      });
    }
    fetch();
  }, []);

  const openConfirmModal = async () => {
    if (!withdrawAmount && paymentType === "bank") {
      showToast({
        description: "দয়া করে Withdraw Amount প্রদান করুন​।",
        variant: "warning",
      });
      return;
    }

    if (paymentType === "bkash") {
      showBkash();
    } else if (paymentType === "nagad") {
      showNagad();
    } else if (paymentType === "bank") {
      showConfirmModal();
    } else {
      showToast({
        description: "দয়া করে Payment সিলেক্ট করুন​।",
        variant: "warning",
      });
    }
  };

  const handlePhoneNumber = (value) => {
    console.log(value);
    setPhoneNumber(value);
  };

  const goHome = async () => {
    console.log("...withdraw goHome...");

    try {
      const data = {
        withdrawAmount,
        paymentType,
        phoneNumber,
        bankId,
      };

      if (!withdrawAmount || !paymentType) {
        showToast({
          description: "দয়া করে Withdraw Amount প্রদান করুন​।",
          variant: "warning",
        });
        return;
      }
      if (withdrawAmount <= 0) {
        showToast({
          description: "Withdraw Amount অবশ্যই 0 এর চেয়ে বড় হতে হবে​।",
          variant: "warning",
        });
        return;
      }
      if (
        (paymentType === "bkash" && !phoneNumber) ||
        (paymentType === "nagad" && !phoneNumber)
      ) {
        showToast({
          description: "দয়া করে সব Phone Number প্রদান করুন​।",
          variant: "warning",
        });
        return;
      }

      requestWithdraw(data).then((res) => {
        console.log("...withdraw res:", res);
        const { status } = res;
        if (status === 200 || status === 201) {
          router.replace("/(drawer)/(tabs)/home");
          hideConfirmModal();
          hideBkash();
          hideNagad();
          AsyncStorage.mergeItem("user-data", JSON.stringify(res.data.user));
          showToast({
            description: "আপনার Withdraw সম্পন্ন হয়েছে​।",
            variant: "success",
          });
        } else if (status === 400) {
          const { message } = res.data;
          hideConfirmModal();
          hideBkash();
          hideNagad();
          showToast({
            description: message,
            variant: "warning",
          });
        } else {
          hideConfirmModal();
          hideBkash();
          hideNagad();
          showToast({
            description: "দুঃখিত, আপনার Withdraw সম্পন্ন হয়নি​।",
            variant: "danger",
          });
        }
      });
    } catch (error) {
      console.log("...withdraw goHome error:", error);
    }
  };

  return (
    <View style={tailwind`flex-1 justify-between px-3 pt-4`}>
      <View>
        <GoBack route={"/(drawer)/(tabs)/(wallet)"}>উত্তোলন</GoBack>
        <BalanceWithdraw
          setWithdrawAmount={setWithdrawAmount}
          balance={balance}
        />
        <Divider />
        <PaymentWithdraw
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          bankId={bankId}
          setBankId={setBankId}
        />
      </View>
      <ContentModal visible={isBkash} hideModal={hideBkash}>
        <View style={tailwind`flex items-center justify-center`}>
          <StyledText variant="titleLarge" type="b">
            bKash
          </StyledText>
          <StyledText>আপনার পার্সোনাল বিকাশ নাম্বার ইনপুট করুন</StyledText>
          <StyledInput
            mode={"outlined"}
            label={"Phone No."}
            onChangeText={(text) => {
              handlePhoneNumber(text);
            }}
          />
          <StyledButton width={"md"} onPress={goHome}>
            কনফার্ম
          </StyledButton>
        </View>
      </ContentModal>
      <ContentModal visible={isNagad} hideModal={hideNagad}>
        <View style={tailwind`flex items-center justify-center`}>
          <StyledText variant="titleLarge" type="b">
            Nagad
          </StyledText>
          <StyledText>আপনার পার্সোনাল নগদ নাম্বার ইনপুট করুন</StyledText>
          <StyledInput
            mode={"outlined"}
            label={"Phone No."}
            onChangeText={(text) => handlePhoneNumber(text)}
          />
          <StyledButton width={"md"} onPress={goHome}>
            কনফার্ম
          </StyledButton>
        </View>
      </ContentModal>
      <ContentModal visible={isConfirmModal} hideModal={hideConfirmModal}>
        <View style={tailwind`flex items-center justify-between`}>
          <StyledText
            variant="titleMedium"
            type="b"
            style={{ marginBottom: 20 }}
          >
            Cash Withdraw এর জন্য রিকুয়েস্ট আমাদের কাছে এসেছে{" "}
          </StyledText>
          <StyledText style={{ marginBottom: 20 }}>
            আপনার রিকুয়েস্ট টি যাচাই করার পর যত দ্রুত সম্ভব আপনার প্রাপ্য
            ব্যালেন্স পাঠিয়ে দেয়া হবে আপনার দেয়া অ্যাকাউন্ট ইনফরমেশন-এ
          </StyledText>
          <StyledButton width={"md"} onPress={goHome}>
            ঠিক আছে
          </StyledButton>
        </View>
      </ContentModal>
      <StyledButton onPress={openConfirmModal}>Withdraw Request</StyledButton>
      <Loading isLoading={loading} />
    </View>
  );
};

const BalanceWithdraw = ({ setWithdrawAmount, balance }) => {
  return (
    <View style={tailwind`py-4`}>
      <View style={tailwind`flex-row items-end justify-between py-1`}>
        <StyledText variant="titleMedium">Available Balance :</StyledText>
        <View style={tailwind`flex-row items-end gap-2`}>
          <StyledText variant="titleLarge" type="b">
            {balance}
          </StyledText>
          <StyledText type="b">BDT</StyledText>
        </View>
      </View>
      <View style={tailwind`flex-row items-center justify-between py-1`}>
        <StyledText variant="titleMedium">Withdraw Amount :</StyledText>
        <View style={tailwind`flex-row items-end gap-2`}>
          <StyledInput
            style={{
              width: 120,
              height: 40,
            }}
            type="number"
            onChangeText={(text) => setWithdrawAmount(text)}
          />
          <StyledText type="b">BDT</StyledText>
        </View>
      </View>
    </View>
  );
};

const PaymentWithdraw = ({
  paymentType,
  setPaymentType,
  bankId,
  setBankId,
}) => {
  const [bankData, setBankData] = useState({
    bankName: "",
    branch: "",
    accountNumber: "",
  });
  const [bankInfo, setBankInfo] = React.useState([]); //state value for bank info fetched from the server for the logged in user
  const [selectedBank, setSelectedBank] = React.useState(null); //state value for selected bank to withdraw

  const [loading, setLoading] = useState(true); //state value for loading

  const showToast = useCustomToast();

  const {
    visible: isAddBank,
    showModal: showAddBank,
    hideModal: hideAddBank,
  } = useModal();

  useEffect(() => {
    setLoading(true);
    getBankAccounts().then((res) => {
      console.log("...withdraw getBankAccounts res:", res);
      console.log("...withdraw getBankAccounts res:", res);
      const { status } = res;
      if (status === 200 || status === 201) {
        setBankInfo(res.data);
        setLoading(false);
      } else {
        console.log("...withdraw getBankAccounts error:", res);
        setLoading(false);
      }
    });
  }, []);

  const onBkash = () => {
    setPaymentType("bkash"); //set the payment type to bkash
    setBankId(""); //set the value of bank to empty string for group selection
  };

  const onNagad = () => {
    setPaymentType("nagad"); //set the payment type to nagad
    setBankId(""); //set the value of bank to empty string for group selection
  };

  const onSelectBank = (id) => {
    //find the bank info from the bankInfo array with the id
    const selectBank = bankInfo?.find((item) => item.id === id);

    setBankId(id); //set the value of bank to the id of the selected bank for group selection

    setSelectedBank((prev) => (prev === selectBank ? null : selectBank)); //set the selected bank to the selectedBank state
    setPaymentType("bank"); //set the payment type to bank
  };

  const deleteBankInfo = async (id) => {
    try {
      setLoading(true);
      deleteBankAccount(id).then((res) => {
        try {
          console.log("...withdraw deleteBankInfo res:", res);
          if (res.status === 201 || res.status === 200) {
            setBankInfo(bankInfo?.filter((item) => item._id !== id));
            if (selectedBank === id) {
              setSelectedBank(null);
            }

            setLoading(false);
            showToast({
              description: "Bank Info সফলভাবে Delete হয়েছে",
              variant: "success",
            });
          } else {
            setLoading(false);
            showToast({
              description: "কিছু সমস্যা হয়েছে",
              variant: "danger",
            });
          }
        } catch (error) {
          setLoading(false);
          console.log("...deleteBankAccount error:", error);
        }
      });
    } catch (error) {
      setLoading(false);
      console.log("...withdraw page deleteBankInfo:");
    }
  };

  const openBankModal = () => {
    showAddBank();
  };

  const handleBankData = async (id, text) => {
    setBankData((prev) => ({
      ...prev,
      [id]: text,
    }));
  };

  const onAddBank = async () => {
    console.log("... onAddBank ...", bankData);
    try {
      setLoading(true);
      hideAddBank();
      addBankAccount(bankData).then((res) => {
        console.log("...onAddBank res:", res);
        if (res.status === 200 || res.status === 201) {
          getBankAccounts().then((res) => {
            console.log("...withdraw getBankAccounts res:", res);
            console.log("...withdraw getBankAccounts res:", res);
            const { status } = res;
            if (status === 200 || status === 201) {
              setBankInfo(res.data);
              setLoading(false);
            } else {
              console.log("...withdraw getBankAccounts error:", res);
              setLoading(false);
            }
          });
          showToast({
            description: "Bank Account যোগ করা হয়েছে",
            variant: "success",
          });
        } else if (res.status === 500) {
          setLoading(false);
          showToast({
            description: "কিছু সমস্যা হয়েছে",
            variant: "danger",
          });
        }
      });
    } catch (error) {
      console.log("...withdraw onAddBank error:", error);
    }
  };

  return (
    <View style={tailwind`flex py-4`}>
      <StyledText variant="titleMedium" type="b">
        পেমেন্ট কিসের মাধ্যমে পেতে চাচ্ছেন?
      </StyledText>
      <View style={tailwind`pb-2 pt-4`}>
        <StyledText variant="bodySmall" type="b" color={COLOR.neutralDark}>
          Digital Withdraw
        </StyledText>
        <View style={tailwind`flex-row gap-4 py-2`}>
          <Pressable onPress={onBkash}>
            <Image
              alt="Image"
              source={require("../../../../assets/img/bKash.png")}
              style={tailwind.style(`h-20 w-28 rounded-lg`, {
                borderWidth: paymentType === "bkash" ? 2 : 0,
                borderColor: COLOR.tertiary,
              })}
            />
          </Pressable>
          <Pressable onPress={onNagad}>
            <Image
              alt="Image"
              source={require("../../../../assets/img/nagad.png")}
              style={tailwind.style(`h-20 w-28 rounded-lg`, {
                borderWidth: paymentType === "nagad" ? 2 : 0,
                borderColor: COLOR.tertiary,
              })}
            />
          </Pressable>
        </View>
      </View>
      <Divider />
      <View style={tailwind`pt-4`}>
        <StyledText variant="bodySmall" type="b" color={COLOR.neutralDark}>
          Bank
        </StyledText>
        <RadioButton.Group onValueChange={onSelectBank} value={bankId}>
          <ScrollView
            horizontal
            contentContainerStyle={{
              gap: 10,
            }}
          >
            {loading ? (
              <ActivityIndicator
                animating
                color={COLOR.secondary}
                size={"small"}
              />
            ) : (
              bankInfo?.map((item) => (
                <BankInfoCard
                  key={item._id}
                  id={item._id}
                  bank={item.bankName}
                  branch={item.branch}
                  acc={item.accountNumber}
                  deleteBankInfo={deleteBankInfo}
                />
              ))
            )}
          </ScrollView>
        </RadioButton.Group>
        <StyledButton variant={"outline"} onPress={openBankModal}>
          Add New Bank Account
        </StyledButton>
      </View>
      <ContentModal visible={isAddBank} hideModal={hideAddBank}>
        <View style={tailwind`flex items-center justify-center`}>
          <StyledText variant="titleLarge" type="b">
            Bank Information
          </StyledText>
          <StyledText>আপনার Bank Account যোগ করুন</StyledText>

          {bankInputFeilds.map((inputFeild, index) => (
            <StyledInput
              mode={"outlined"}
              key={index}
              {...inputFeild}
              onChangeText={(text) => handleBankData(inputFeild.id, text)}
            />
          ))}
          <StyledButton width={"md"} onPress={onAddBank}>
            কনফার্ম
          </StyledButton>
        </View>
      </ContentModal>
    </View>
  );
};

export default withdraw;
