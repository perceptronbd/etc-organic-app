import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import tailwind from "twrnc";
import { StyledText } from "../texts/StyledText";

export const GoBack = ({ children, route }) => {
  return (
    <Pressable
      style={tailwind`flex-row items-center`}
      onPress={() => router.push(route)}
    >
      <Ionicons name="md-chevron-back-sharp" size={24} color="black" />
      <StyledText type="b">{children}</StyledText>
    </Pressable>
  );
};
