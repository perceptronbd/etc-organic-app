import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import tw from "twrnc";
import { fetchProducts } from "../../../api";
import {
  Carousel,
  Category,
  Loading,
  StyledButton,
  StyledText,
} from "../../../components";
import COLOR from "../../../constants/COLOR";
import { useCustomToast } from "../../../hooks";
import { groupByCategory } from "../../../utils/groupByCategory";

export default function Page() {
  const showToast = useCustomToast();

  const [visible, setVisible] = React.useState(false);

  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    // console.log("...onRefresh start...");
    setRefreshing(true);
    try {
      AsyncStorage.getItem("user-token").then((token) => {
        setLoading(true);
        fetchProducts(token).then((res) => {
          const { data } = res;
          const groupedData = groupByCategory(data);
          setProducts(groupedData);
          // console.log("...onRefresh res:", groupedData);
          setLoading(false);
          setRefreshing(false);
        });
      });
      
    } catch (error) {
      setRefreshing(false);
      console.log("...onRefresh error:", error);
    }
  }, []);

  useEffect(() => {
    // console.log("...home useEffect...");
    const startTime = new Date(); // Capture the start time
    console.log(`Start time: ${startTime}`);
  
    setTimeout(() => {
      console.log("...home useEffect setTimeout...  10 minutes have passed...");
      
      const endTime = new Date(); // Capture the end time
      console.log(`End time: ${endTime}`);
      console.log(`Elapsed time: ${endTime - startTime} milliseconds`);
  
      showToast({ description: "Session timeout. Please login again!", variant: "danger" });
      // logOut();
    },  10 *  60 *  1000);
  
    fetchAPI();
  }, []);
  

  const logOut = async() => {
    AsyncStorage.removeItem("user-data").then(() => {
      //console.log("removed");
      router.push("login");
    });
  }


  const fetchAPI = async () => {
    // console.log("...useEffect fetchAPI start...");
    try {
      AsyncStorage.getItem("user-token").then((token) => {
        setLoading(true);
        fetchProducts(token).then((res) => {
          const { data } = res;
          // console.log("useEffect grouping...", data);
          const groupedData = groupByCategory(data);
          setProducts(groupedData);
          // console.log("useEffect groupedData", groupedData);
          // console.log("...fetchAPI res:", res);
          setLoading(false);
        });
      });
    } catch (error) {
      console.log("...fetchAPI error:", error);
    }
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <ScrollView
        style={tw`flex-1 p-2`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={tw.style(`w-full items-center`, {})}>
          <Carousel />

          <StyledButton
            height={"md"}
onPress={showModal}
          >
            Details
          </StyledButton>
          <Portal>
            <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: "white",
              borderRadius: 10,
              paddingVertical: 40,
              paddingHorizontal: 20,
              margin: 20,
            }}
            >
            <ScrollView>
              <StyledText variant="titleLarge" type="b" style={{
                lineHeight: 30,
              }}>বডি ম্যাসাজিং চেয়ার</StyledText>
            <StyledText variant="bodyMedium">
            বডি ম্যাসাজ চেয়ার কোন লাক্সারি নয়, এটি একটি প্রয়োজন।এই স্ট্রেসফুল জীবনে কিছুমুহূর্তের জন্য সস্থি পেতে ম্যাসাজ এর নেই কোনো জুড়ি। স্ট্রেস বা মানুসিক চাপ, ব্যাকপেইন,মেদ বৃদ্ধি কিংবা শরীরের যেকোনো সমস্যার উপায় হলো বডি ম্যাসাজিং চেয়ার। ম্যাসাজ আপনাকে করবে শিথিল এবং স্ট্রেসফ্রি। মাত্র ১৫ মিনিটের বডি ম্যাসাজের সেশনে আপনি হয়ে উঠবেন সতেজ এবং প্রাণবন্ত। 
            </StyledText>
            <StyledText></StyledText>
            <StyledText variant="bodyLarge" type="b">
বডি ম্যাসাজিং চেয়ারের উপকারিতা:
</StyledText>
<StyledText variant="bodyLarge">১. স্ট্রেস বা মানসিক চাপ থেকে মুক্ত করতে সাহায্য করে। </StyledText>
<StyledText variant="bodyLarge">
২. ব্যাকপেইন নিরাময় করে।</StyledText>
<StyledText variant="bodyLarge">
৩. মেদ বৃদ্ধি রোধে সাহায্য করে।</StyledText>
<StyledText variant="bodyLarge">
৪. রক্ত চলাচল স্বাভাবিক করতে সাহায্য করে।</StyledText>
<StyledText variant="bodyLarge">
৫. শীর্ণ ও দুর্বল পেশীর শক্তি বৃদ্ধিতে সাহায্য করে।</StyledText>
          </ScrollView>
            </Modal>
          </Portal>
         
        </View>
        {/* Categories */}
        {loading ? (
          <Loading isLoading={loading} />
        ) : products ? (
          Object.keys(products).map((category) => (
            <Category
              key={category}
              categoryTitle={category}
              products={products}
            />
          ))
        ) : (
          <View style={tw`h-96 flex-1 items-center justify-center `}>
            <StyledText variant="titleLarge" type="b" color={COLOR.neutral}>
              No products found
            </StyledText>
          </View>
        )}
      </ScrollView>
    </>
  );
}
