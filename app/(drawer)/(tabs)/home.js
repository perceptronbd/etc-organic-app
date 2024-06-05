import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "native-base";
import { useRouter } from "expo-router";
const DATA = [
	{
		id: "1",
		title: "হেলথ অ্যান্ড বিউটি প্রোডাক্টস",
		image: require("../../../assets/img/health-beauty.png"),
		route: "/(drawer)/(tabs)/ecom",
	},
	{
		id: "2",
		title: "হেলথ কেয়ার সার্ভিস",
		image: require("../../../assets/img/health-care.png"),
		route: "/(drawer)/(tabs)/home",
	},
	{
		id: "3",
		title: "বডি ম্যাসাজ চেয়ার সার্ভিস",
		image: require("../../../assets/img/chair.png"),
		route: "/(drawer)/(tabs)/home",
	},
	{
		id: "4",
		title: "ডাক্তার সার্ভিস",
		image: require("../../../assets/img/doctor.png"),
		route: "/(drawer)/(tabs)/home",
	},
	{
		id: "5",
		title: "রেফার অ্যান্ড আর্ন",
		image: require("../../../assets/img/reffer.png"),
		route: "/(drawer)/(tabs)/home",
	},
	{
		id: "6",
		title: "হেলথ অ্যান্ড লাইফ ইনস্যুরেন্স",
		image: require("../../../assets/img/insurance.png"),
		route: "/(drawer)/(tabs)/home",
	},
	{
		id: "7",
		title: "হেলথ টিপস",
		image: require("../../../assets/img/health-tips.png"),
		route: "/(drawer)/(tabs)/home",
	},
	{
		id: "8",
		title: "অন্যান্য",
		image: require("../../../assets/img/others.png"),
		route: "/(drawer)/(tabs)/home",
	},
];

// Item component
const Item = ({ title, image, route }) => {
	const router = useRouter();
	const [itemWidth, setItemWidth] = useState(null);

	const onLayout = (event) => {
		const { width } = event.nativeEvent.layout;
		setItemWidth(width);
	};
	return (
		<Pressable style={styles.itemContainer} onPress={() => router.push(route)}>
			<View style={[styles.item, { height: itemWidth }]} onLayout={onLayout}>
				<Image source={image} style={styles.image} />
				<Text style={styles.title}>{title}</Text>
			</View>
		</Pressable>
	);
};

const Page = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={DATA}
				renderItem={({ item }) => <Item title={item.title} image={item.image} route={item.route} />}
				keyExtractor={(item) => item.id}
				numColumns={2}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#F5F5F5",
	},
	list: {
		paddingBottom: 10,
	},
	row: {
		flex: 1,
		justifyContent: "space-between",
	},
	itemContainer: {
		flex: 1,
		margin: 10,
	},
	item: {
		backgroundColor: "#FFFFFF",
		padding: 10,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	image: {
		width: 80,
		height: 80,
		marginBottom: 10,
	},
	title: {
		fontSize: 13,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default Page;
