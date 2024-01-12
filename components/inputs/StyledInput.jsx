import React from "react";
import { TextInput } from "react-native-paper";

export const StyledInput = ({ style, ...props }) => {
  const { ...rest } = props;

  return (
    <TextInput
      style={{
        width: 300,
        height: 45,
        marginVertical: 2,
        backgroundColor: "#fff",
        fontSize: 14,
        lineHeight: 21,
        ...style,
      }}
      activeOutlineColor="#0C904D"
      outlineStyle={{
        borderRadius: 10,
        borderWidth: 1,
      }}
      {...rest}
    />
  );
};
