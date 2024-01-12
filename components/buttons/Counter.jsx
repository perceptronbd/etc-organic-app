import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import tailwind from "twrnc";
import COLOR from "../../constants/COLOR";
import { formatNumbers } from "../../utils/formatNumbers";

export const Counter = ({ value, setValue }) => {
  const increment = () => {
    const newValue = value + 1;
    setValue(newValue);
  };

  const decrement = () => {
    const newValue = value - 1;
    if (newValue > 0) {
      setValue(newValue);
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton
        icon={"minus"}
        iconColor="white"
        size={15}
        style={tailwind`bg-[${COLOR.tertiary}]`}
        onPress={decrement}
      />
      <Text variant="titleLarge" style={{ marginHorizontal: 10 }}>
        {formatNumbers(value)}
      </Text>
      <IconButton
        icon={"plus"}
        iconColor="white"
        size={15}
        style={tailwind`bg-[${COLOR.tertiary}]`}
        onPress={increment}
      />
    </View>
  );
};
