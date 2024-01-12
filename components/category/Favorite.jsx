import React from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";
import { ProductCard } from "../cards/ProductCard";
import { StyledText } from "../texts/StyledText";

export function Favorite({ products }) {
  return (
    <View style={tw.style(`my-1`)}>
      <StyledText type="b" variant="titleMedium" style={tw`my-2`}>
        Favourites
      </StyledText>
      <ScrollView style={tw.style(``)} horizontal>
        {products.map(
          (item) =>
            item.favorite && <ProductCard key={item.id} productData={item} />,
        )}
      </ScrollView>
    </View>
  );
}
