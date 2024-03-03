import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import tailwind from "twrnc";
import { getCSBandTaka, getWalletHistory, redeemCSB } from "../../../../api";
import {
  ContentModal,
  Loading,
  MessageModal,
  ReferredEarnCard,
  StyledButton,
  StyledText,
} from "../../../../components";
import COLOR from "../../../../constants/COLOR";
import { useModal } from "../../../../hooks";
import { formatNumbers } from "../../../../utils/formatNumbers";
import { trycatch } from "../../../../utils/trycatch";

export default function Page() {
  const { width } = Dimensions.get("window");

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [csbAndTaka, setCsbAndTaka] = useState({ csb: 0, taka: 0 });
  const [earnedCSB, setEarnedCSB] = useState([]);

  const {
    visible: visibleRedeem,
    showModal: showRedeem,
    hideModal: hideRedeem,
    modalMessage: redeemMessage,
    isError: redeemError,
  } = useModal();

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const onRefresh = async () => {
    setLoading(true);
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const fetchData = async () => {
    await fetchWalletHistory();
    await fetchCSBandTaka();
    setLoading(false);
  };

  const fetchCSBandTaka = async () => {
    const [res, err] = await trycatch(getCSBandTaka());

    if (err) {
      console.log("...index redeem fetchCSBandTaka err", err);
      return;
    }

    console.log("...index redeem fetchCSBandTaka res", res);

    if (res.status === 200) {
      console.log("...index redeem fetchCSBandTaka res.data", res.data);
      setCsbAndTaka({
        csb: res.data?.CSB ||0,
        taka: res.data?.taka||0,
      });
    }
  }

  

  const fetchWalletHistory = async () => {

    const [res,err] = await trycatch( getWalletHistory());

    if (err) {
      console.log("...index redeem fetchWalletHistory err", err);
      return;
    }

    console.log("...index redeem fetchWalletHistory res", res);

    if (res.status === 200) {
      console.log("...index redeem fetchWalletHistory res.data", res.data);
      setEarnedCSB(res.data.data.reverse());
    }


  }

  const onRedeem = async () => {
    setLoading(true);
    try {
      redeemCSB().then((res) => {
        console.log(res);
        setLoading(false);
        if (res.status === 200) {
          AsyncStorage.mergeItem("user-data", JSON.stringify(res.data)).then(
            (res) => console.log("...index redeem mergeItem", res),
          );
          fetchCSBandTaka()
          showRedeem();
        } else {
          const { message } = res.data;
          showRedeem(message || "দয়া করে পুনরায় চেষ্টা করুন", true);
          console.log("error");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onWithdraw = () => {
    //router.push("/withdraw");
    console.log("withdraw");
    router.push("/withdraw");
  };

  return (
    <View style={tailwind.style(`flex-1 gap-4  p-4`, {})} >
      <View style={tailwind`gap-2`}>
        <StyledText type="b">বর্তমান CSB ব্যালেন্স</StyledText>
        {/* CSB and BDT */}
        <View style={tailwind`flex-row justify-between`}>
          <View style={tailwind`flex-row gap-2`}>
            <StyledText type="b" variant="displaySmall">
              {formatNumbers(csbAndTaka.csb)}
            </StyledText>
            <StyledText variant="bodySmall">CSB</StyledText>
          </View>
          <View style={tailwind`flex-row gap-2`}>
            <StyledText type="b" variant="displaySmall">
              {formatNumbers(csbAndTaka.taka)}
            </StyledText>
            <StyledText variant="bodySmall">BDT</StyledText>
          </View>
        </View>
        {/* instrucitons */}
        <StyledText variant="bodySmall" color={COLOR.neutralDark}>
          টাকা তে রুপান্তর করতে Redeem করুন
        </StyledText>
        {/* Buttons */}
        <View style={tailwind`flex-row justify-between gap-2`}>
          <StyledButton width={(width/5)*2-20} onPress={onRedeem} disabled={csbAndTaka.csb<=0}>
            Redeem
          </StyledButton>
          <StyledButton width={(width/5)*3-20} onPress={onWithdraw} disabled={csbAndTaka.taka <= 0}>
            Request to Withdraw
          </StyledButton>
        </View>
      </View>

      {/* Refer and Earn program */}
      <Divider />
      <ScrollView
        contentContainerStyle={{
          columnGap: 10,
          rowGap: 8,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      >
        {earnedCSB.length === 0 ? (
          <View
            style={tailwind`h-96 w-full flex-1 items-center justify-center`}
          >
            <StyledText variant="titleLarge" type="b" color={COLOR.neutralDark}>
              কোন Wallet History নেই
            </StyledText>
          </View>
        ) : (
          earnedCSB?.map((item) => (
            <ReferredEarnCard
              key={item._id}
              date={item.date}
              time={item.time}
              csb={item.csb}
              percentage={item.percentage}
            />
          ))
        )}
      </ScrollView>

      {redeemError && (
        <MessageModal
          visible={visibleRedeem}
          hideModal={hideRedeem}
          modalMessag={redeemMessage}
          isError={redeemError}
        />
      )}
      {!redeemError && (
        <ContentModal visible={visibleRedeem} hideModal={hideRedeem}>
          <View style={tailwind`flex items-center justify-between`}>
            <StyledText
              variant="titleMedium"
              type="b"
              style={{ marginBottom: 10, textAlign: "center" }}
            >
              অভিনন্দন!!
            </StyledText>
            <StyledText
              variant="titleMedium"
              type="b"
              style={{ marginBottom: 20, textAlign: "center" }}
            >
              আপনার CSB রিডিম করার মাধ্যমে টাকা তে রুপান্তর হয়েছে
            </StyledText>
            <StyledText style={{ marginBottom: 20, textAlign: "center" }}>
              আপনি এখন Cash Withdraw এর জন্য Request পাঠানোর উপযোগী
            </StyledText>
            <StyledButton width={"md"} onPress={hideRedeem}>
              ঠিক আছে
            </StyledButton>
          </View>
        </ContentModal>
      )}
      <Loading isLoading={loading} />
    </View>
  );
}
