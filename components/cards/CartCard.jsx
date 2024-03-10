import { Image } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { IconButton } from "react-native-paper";
import tailwind from "twrnc";
import COLOR from "../../constants/COLOR";
import { useImage } from "../../hooks";
import { formatNumbers } from "../../utils/formatNumbers";
import { Style, log } from "../../utils/log";
import { StyledText } from "../texts/StyledText";

export const CartCard = ({
  name,
  price,
  image,
  quantity,
  increment,
  decrement,
}) => {
  const { width } = Dimensions.get("window");

  const { imageUrl } = useImage(image?.secure_url);

  const [imageLink, setImageLink] = useState(null);

  useEffect(() => {
    console.log("CartCard useEffect image", image);
    console.log("CartCard useEffect imageUrl", imageUrl);
    console.log("CartCard useEffect imageLink", imageLink);
  }, []);

  const onError = () => {
    log("CartCard onError for", [imageUrl], Style.error);
    setImageLink(require("../../assets/icon-etc.png"));
  };

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
            source={imageLink ? imageLink : { uri: imageUrl }}
            alt="Product Image"
            style={tailwind`h-20 w-20 rounded-none`}
            onError={onError}
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
                height: 40,
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
            <StyledText
              variant="bodySmall"
              style={{
                color: "#808080",
              }}
            >
              প্রোডাক্টের ক্যাটেগরি
            </StyledText>
            <StyledText type="b">ঔষধ</StyledText>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton
          icon={"minus"}
          iconColor="white"
          size={15}
          style={tailwind`bg-[${COLOR.tertiary}]`}
          onPress={decrement}
        />
        <StyledText variant="titleLarge" style={{ marginHorizontal: 10 }}>
          {formatNumbers(quantity)}
        </StyledText>
        <IconButton
          icon={"plus"}
          iconColor="white"
          size={15}
          style={tailwind`bg-[${COLOR.tertiary}]`}
          onPress={increment}
        />
      </View>
    </View>
  );
};
