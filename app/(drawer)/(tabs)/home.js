import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
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

  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    console.log("...onRefresh start...");
    setRefreshing(true);
    try {
      AsyncStorage.getItem("user-token").then((token) => {
        setLoading(true);
        fetchProducts(token).then((res) => {
          const { data } = res;
          const groupedData = groupByCategory(data);
          setProducts(groupedData);
          console.log("...onRefresh res:", groupedData);
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
    console.log("...home useEffect...");
    const startTime = new Date(); // Capture the start time
    console.log(`Start time: ${startTime}`);
  
    // setTimeout(() => {
    //   console.log("...home useEffect setTimeout...  10 minutes have passed...");
      
    //   const endTime = new Date(); // Capture the end time
    //   console.log(`End time: ${endTime}`);
    //   console.log(`Elapsed time: ${endTime - startTime} milliseconds`);
  
    //   showToast({ description: "Session timeout. Please login again!", variant: "danger" });
    //   logOut();
    // },  10 *  60 *  1000);
  
    fetchAPI();
  }, []);
  

  const logOut = async() => {
    AsyncStorage.removeItem("user-data").then(() => {
      //console.log("removed");
      router.push("login");
    });
  }


  const fetchAPI = async () => {
    console.log("...useEffect fetchAPI start...");
    try {
      AsyncStorage.getItem("user-token").then((token) => {
        setLoading(true);
        fetchProducts(token).then((res) => {
          const { data } = res;
          console.log("useEffect grouping...", data);
          const groupedData = groupByCategory(data);
          setProducts(groupedData);
          console.log("useEffect groupedData", groupedData);
          console.log("...fetchAPI res:", res);
          setLoading(false);
        });
      });
    } catch (error) {
      console.log("...fetchAPI error:", error);
    }
  };

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

          >
            Details
          </StyledButton>
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
