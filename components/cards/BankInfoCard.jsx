import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";
import tailwind from "twrnc";
import COLOR from "../../constants/COLOR";
import { StyledText } from "../texts/StyledText";

export const BankInfoCard = ({ id, bank, branch, acc, deleteBankInfo }) => {
  return (
    <View
      style={tailwind`border bg-white border-[${COLOR.neutral}] h-36 w-60 rounded-lg p-2`}
    >
      <View style={tailwind`flex-row justify-between`}>
        <RadioButton value={id} color={COLOR.tertiary} />
        <AntDesign
          name="close"
          size={20}
          color={COLOR.neutralDark}
          onPress={() => {
            console.log(`deleted ${bank}`);
            deleteBankInfo(id);
          }}
        />
      </View>
      <View style={tailwind`mb-4 flex items-center justify-center`}>
        <StyledText variant="bodyMedium" type="m">
          {bank}
        </StyledText>
        <StyledText variant="bodySmall" type="sb" color={COLOR.neutralDark}>
          Branch: {branch}
        </StyledText>
        <StyledText type="b"> {acc}</StyledText>
      </View>
    </View>
  );
};
