import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import tw from "twrnc";
import { ProductCard } from "../cards/ProductCard";
import { StyledText } from "../texts/StyledText";

export function Category({ categoryTitle = "Category 1", products }) {
  return (
    <View style={tw.style(`my-1`)}>
      <StyledText type="b" variant="titleMedium" style={tw`my-2`}>
        {categoryTitle}
      </StyledText>
      <ScrollView horizontal contentContainerStyle={{ gap: 8 }}>
        {products[categoryTitle].map((item) => (
          <ProductCard key={item._id} productData={item} />
        ))}
      </ScrollView>
    </View>
  );
}
