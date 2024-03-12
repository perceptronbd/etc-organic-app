import { Ionicons, Octicons } from "@expo/vector-icons";
import { Input } from "native-base";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import tailwind from "twrnc";
import COLOR from "../../constants/COLOR";
import { StyledText } from "../texts/StyledText";

export const HeaderComponent = ({ imgURL, points }) => {
  return (
    <View
      style={tailwind.style(
        `w-full flex-row items-center justify-between gap-2`,
      )}
    >
      <Input
        placeholder="প্রোডাক্ট খুঁজুন"
        variant="filled"
        width="70%"
        borderRadius="10"
        shadow={1}
        py="1"
        px="2"
        InputLeftElement={
          <Ionicons name="search" size={24} color="gray" />
          // <Icon
          //   ml="2"
          //   size="4"
          //   color="gray.400"
          //   as={<Ionicons name="ios-search" />}
          // />
        }
      />
      <View style={tailwind`flex-row items-center gap-2`}>
        <View style={tailwind`items-center justify-center`}>
          <Octicons name="feed-star" size={20} color={COLOR.tertiary} />
          <StyledText
            variant="bodySmall"
            type="m"
            style={tailwind.style(`text-[${COLOR.tertiary}]`)}
          >
            {points === undefined ? 0 : points}
          </StyledText>
        </View>
        {imgURL === "" || imgURL === undefined || imgURL === null ? (
          <Avatar.Icon
            size={40}
            icon="account"
            color="white"
            style={tailwind`bg-[${COLOR.neutral}]`}
          />
        ) : (
          <Avatar.Image
            size={40}
            style={tailwind`bg-[${COLOR.neutral}] rounded-full`}
            source={{ uri: imgURL }}
          />
        )}
      </View>
    </View>
  );
};
