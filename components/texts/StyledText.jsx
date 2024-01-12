import React from "react";
import { Text } from "react-native-paper";

export function StyledText({
  children,
  style,
  variant = "bodyMedium",
  type = "regular",
  color,
}) {
  return (
    <Text
      variant={variant}
      style={{
        fontFamily: type === "b" ? "mon-b" : type === "m" ? "mon-m" : "mon",
        color: color ? color : "black",
        ...style,
      }}
    >
      {children}
    </Text>
  );
}
