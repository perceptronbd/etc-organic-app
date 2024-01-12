import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image } from "native-base";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import tailwind, { default as tw } from "twrnc";
import COLOR from "../../constants/COLOR";
import { useImage } from "../../hooks";
import { formatNumbers } from "../../utils/formatNumbers";
import { StyledText } from "../texts/StyledText";

export function ProductCard({ productData }) {
  const [isFavorite, setIsFavorite] = useState(productData?.favorite);

  const { imageUrl: productImageUrl } = useImage(productData?.image);

  const handleNavigation = () => {
    router.push({ pathname: "productDetails", params: productData });
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={tw.style(`w-32 bg-[${COLOR.foreground}] rounded-lg py-2`)}>
      {/* Points and Favorite */}
      <View style={tw.style(`flex-row justify-between px-2`)}>
        <View style={tw.style(`flex-row items-center gap-1 `)}>
          <MaterialIcons name="stars" size={20} color={COLOR.tertiary} />
          <StyledText
            type="b"
            variant="titleMedium"
            style={tw`text-[${COLOR.tertiary}]`}
          >
            {formatNumbers(productData.points)}
          </StyledText>
        </View>
        <Ionicons
          name={isFavorite ? "heart-sharp" : "heart-outline"}
          size={20}
          color={isFavorite ? "red" : "black"}
          onPress={handleFavorite}
          disabled={true}
        />
      </View>
      {/* Product Image */}
      <Pressable
        onPress={handleNavigation}
        style={tw`flex h-24 w-32 items-center justify-center`}
      >
        {
          <Image
            size={"md"}
            source={{ uri: productImageUrl }}
            alt={productData.productName}
          />
        }
      </Pressable>
      <View style={tailwind`flex h-20 justify-between px-2`}>
        {/* Product Name */}
        <StyledText type="b" variant="bodySmall" style={tw`mb-1`}>
          {productData.productName}
        </StyledText>
        {/* Product Price and point*/}
        <View style={tw.style(`flex-row items-center justify-between`)}>
          <View>
            <StyledText variant="titleSmall" type="sb">
              ৳ {formatNumbers(productData.salesPrice)}
            </StyledText>
            <StyledText
              variant="bodySmall"
              style={tw`text-[${COLOR.tertiary}]`}
              type="m"
            >
              {formatNumbers(productData.csb)} CSB
            </StyledText>
          </View>
          {/* Add Button */}
          <Ionicons
            name="add-circle"
            size={30}
            color={COLOR.tertiary}
            onPress={handleNavigation}
          />
        </View>
      </View>
    </View>
  );
}
