import React from "react";
import { View } from "react-native";
import tailwind from "twrnc";
import COLOR from "../../constants/COLOR";
import { StyledText } from "../texts/StyledText";

export const ReferredEarnCard = ({ date, time, csb, percentage }) => {
  return (
    <View
      style={tailwind`flex h-28 justify-between rounded-lg border border-[${COLOR.neutral}] bg-white p-2 px-4`}
    >
      <View>
        <View style={tailwind`flex-row justify-between`}>
          <StyledText type="b">Refer and Earn program</StyledText>
          <StyledText type="b">{date}</StyledText>
        </View>
        <View style={tailwind`flex-row justify-between`}>
          <StyledText variant="bodySmall" type="b" color={COLOR.neutralDark}>
            +{csb}
          </StyledText>
          <StyledText variant="bodySmall" type="b" color={COLOR.neutralDark}>
            {time}
          </StyledText>
        </View>
      </View>
      <View style={tailwind`flex-row items-end justify-between`}>
        <StyledText
          style={{
            width: 200,
          }}
          variant="bodySmall"
        >
          A sale was made in your Referral Generation
        </StyledText>
        <StyledText type="b">{percentage}%</StyledText>
      </View>
    </View>
  );
};
