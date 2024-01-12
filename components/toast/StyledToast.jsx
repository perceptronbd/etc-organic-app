import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, View } from "react-native";
import tailwind from "twrnc";
import { StyledText } from "../texts/StyledText";

export const StyledToast = ({
  title,
  description,
  variant,
  isClosed = false,
  onClose,
}) => {
  const { width } = Dimensions.get("window");

  return (
    <View
      style={tailwind.style(
        `flex-row items-center justify-between gap-4 rounded-md bg-white px-4 py-2 shadow-md`,
        {
          width: width - 32,
        },
        {
          "border-l-2 border-r-2 border-green-500": variant === "success",
          "border-l-2 border-r-2 border-yellow-500": variant === "warning",
          "border-l-2 border-r-2 border-red-500": variant === "danger",
        },
      )}
    >
      <View style={tailwind`flex-row items-center justify-start gap-4`}>
        {/* icon */}
        {variant === "success" && (
          <MaterialIcons
            name="done"
            size={24}
            style={tailwind.style(
              `h-8 w-8 rounded-full border-2 border-green-500 p-1 text-green-500`,
            )}
          />
        )}
        {variant === "warning" && (
          <MaterialIcons
            name="warning"
            size={24}
            style={tailwind.style(`h-8 w-8 rounded-full p-1 text-yellow-500`)}
          />
        )}
        {variant === "danger" && (
          <MaterialIcons
            name="dangerous"
            size={26}
            style={tailwind.style(`h-8 w-8 rounded-full  p-1 text-red-500`, {})}
          />
        )}

        {/* title */}
        <View style={tailwind.style(`mr-2 flex`, {})}>
          {title && (
            <StyledText variant="titleMedium" type="m">
              {title}
            </StyledText>
          )}
          {/* description */}
          <StyledText variant="bodyMedium">{description}</StyledText>
        </View>
      </View>
      {/* close button */}
      {isClosed && (
        <MaterialIcons name="close" size={24} color="black" onPress={onClose} />
      )}
    </View>
  );
};
