import React from "react";
import { Dimensions, Image, View } from "react-native";
import tailwind from "twrnc";
import COLOR from "../../constants/COLOR";
import { formatNumbers } from "../../utils/formatNumbers";
import { StyledText } from "../texts/StyledText";

export const OrderCard = ({ name, price, image, quantity }) => {
  const { width } = Dimensions.get("window");

  return (
    <View
      style={tailwind.style(`items-end justify-between`, {
        width: width - 20,
        height: 200,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: COLOR.foreground,
        borderColor: COLOR.neutral,
        borderWidth: 1,
      })}
    >
      <View style={tailwind`w-full flex-row gap-5 `}>
        <View style={tailwind`h-24 w-24 rounded-md bg-neutral-100 p-2`}>
          <Image
            alt="Image"
            source={image}
            style={tailwind`h-20 w-20 rounded-none`}
          />
        </View>
        <View style={tailwind` w-64 flex-row justify-between`}>
          <View style={tailwind`w-28`}>
            <StyledText
              variant="bodySmall"
              style={{
                color: "#808080",
              }}
            >
              প্রোডাক্টের নাম
            </StyledText>
            <StyledText
              type="b"
              style={{
                marginBottom: 10,
              }}
            >
              {name}
            </StyledText>
            <StyledText
              variant="bodySmall"
              style={{
                color: "#808080",
              }}
            >
              মূল্য
            </StyledText>
            <StyledText type="b">
              ৳ {formatNumbers(price * quantity)}
            </StyledText>
          </View>
          <View>
            <View>
              <StyledText
                variant="bodySmall"
                style={{
                  color: "#808080",
                }}
              >
                প্রোডাক্টের ক্যাটেগরি
              </StyledText>
              <StyledText
                type="b"
                style={{
                  marginBottom: 10,
                }}
              >
                ঔষধ
              </StyledText>
              <StyledText
                variant="bodySmall"
                style={{
                  color: "#808080",
                }}
              >
                কোয়ান্টীটি
              </StyledText>
              <StyledText type="b">{formatNumbers(quantity)}</StyledText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
