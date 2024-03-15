import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import tw from "twrnc";
import { capitalizeFirstLetter } from "../../utils/capitalizeLetter";
import { ProductCard } from "../cards/ProductCard";
import { StyledText } from "../texts/StyledText";

export function Category({ categoryTitle = "Category 1", products }) {
	const items = products[categoryTitle];
	const scrollThreshold = 2; // Adjust this value based on your needs

	// Function to render items directly without ScrollView
	const renderItemsDirectly = () => (
		<View style={tw.style(`flex-row gap-2`)}>
			{items.map((item) => (
				<ProductCard key={item._id} productData={item} />
			))}
		</View>
	);

	// Function to render items within a ScrollView
	const renderItemsWithScrollView = () => (
		<ScrollView horizontal={true} contentContainerStyle={{ gap: 8 }} style={tw`py-2`}>
			{items.map((item) => (
				<ProductCard key={item._id} productData={item} />
			))}
		</ScrollView>
	);

	return (
		<View style={tw.style(`my-1 pb-2`)}>
			<StyledText type="b" variant="titleMedium" style={tw`my-2`}>
				{capitalizeFirstLetter(categoryTitle)}
			</StyledText>
			{items.length <= scrollThreshold ? renderItemsDirectly() : renderItemsWithScrollView()}
		</View>
	);
}
