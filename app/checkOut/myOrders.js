import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "native-base";
import React from "react";
import { Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import tailwind from "twrnc";
import { OrderCard, StyledText } from "../../components";

const myOrders = () => {
  return (
    <View style={tailwind`px-2 pb-4 pt-8`}>
      <Pressable
        style={tailwind`my-2 flex-row items-center`}
        onPress={() => router.replace("/(drawer)/(tabs)")}
      >
        <Ionicons name="md-chevron-back-sharp" size={24} color="black" />
        <StyledText type="b">অমার অর্ডার</StyledText>
      </Pressable>

      <ScrollView
        contentContainerStyle={{
          columnGap: 10,
          rowGap: 10,
          alignItems: "center",
        }}
      >
        <OrderCard name={"Name"} price={10} image={"img"} quantity={10} />
        <OrderCard name={"Name"} price={10} image={"img"} quantity={10} />
        <OrderCard name={"Name"} price={10} image={"img"} quantity={10} />
        <OrderCard name={"Name"} price={10} image={"img"} quantity={10} />
        <OrderCard name={"Name"} price={10} image={"img"} quantity={10} />
        <OrderCard name={"Name"} price={10} image={"img"} quantity={10} />
        <OrderCard name={"Name"} price={10} image={"img"} quantity={10} />
        <OrderCard name={"Name"} price={10} image={"img"} quantity={10} />
      </ScrollView>
    </View>
  );
};

export default myOrders;
