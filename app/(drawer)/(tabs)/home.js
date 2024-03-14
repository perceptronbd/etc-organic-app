import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, AppState, Dimensions, RefreshControl, ScrollView, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import tw from "twrnc";
import { fetchProducts } from "../../../api";
import { Carousel, Category, Loading, StyledButton, StyledText } from "../../../components";
import COLOR from "../../../constants/COLOR";
import { groupByCategory } from "../../../utils/groupByCategory";

export default function Page() {
	const router = useRouter();

	const { width } = Dimensions.get("window");

	const [visible, setVisible] = useState(false);
	const [products, setProducts] = useState({});
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		try {
			const token = await AsyncStorage.getItem("user-token");
			setLoading(true);
			const res = await fetchProducts(token);
			const groupedData = groupByCategory(res.data);
			setProducts(groupedData);
			setLoading(false);
			setRefreshing(false);
		} catch (error) {
			setRefreshing(false);
			console.log("...onRefresh error:", error);
		}
	}, []);

	useEffect(() => {
		// Check for session expiration on app launch
		checkSessionExpiration();

		// Set up a timer to check for session expiration
		const intervalId = setInterval(() => {
			checkSessionExpiration();
		}, 3 * 60000); // Check every 3 minute

		fetchAPI();

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		const subscription = AppState.addEventListener("change", (nextAppState) => {
			if (nextAppState === "active") {
				// App has come to the foreground, check for session expiration
				checkSessionExpiration();
			}
		});

		return () => {
			subscription.remove();
		};
	}, []);

	const checkSessionExpiration = async () => {
		try {
			const storedSessionExpirationTime = await AsyncStorage.getItem("session-expiration-time");
			if (storedSessionExpirationTime) {
				const currentTime = new Date().getTime();
				const expirationTime = parseInt(storedSessionExpirationTime, 10);

				console.log("Session expiration time:", expirationTime, "Current time:", currentTime);

				if (currentTime > expirationTime) {
					// Session has expired, navigate to login screen
					Alert.alert("Session Expired", "Your session has expired. Please log in again.", [
						{
							text: "OK",
							onPress: () => logOut(),
						},
					]);
				}
			}
		} catch (error) {
			console.error("Error checking session expiration:", error);
		}
	};

	const logOut = async () => {
		await AsyncStorage.removeItem("user-data");
		await AsyncStorage.removeItem("user-token");
		await AsyncStorage.removeItem("session-expiration-time");
		router.replace("login");
	};

	const fetchAPI = useCallback(async () => {
		try {
			const token = await AsyncStorage.getItem("user-token");
			setLoading(true);
			const res = await fetchProducts(token);
			const groupedData = groupByCategory(res.data);
			setProducts(groupedData);
			setLoading(false);
		} catch (error) {
			console.log("...fetchAPI error:", error);
		}
	}, []);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	return (
		<>
			<ScrollView
				style={tw`flex-1 p-2`}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<View style={tw.style(`w-full items-center`, {})}>
					<Carousel />
					<StyledButton width={width - 20} height={"md"} onPress={showModal}>
						Details
					</StyledButton>
					<Portal>
						<Modal
							visible={visible}
							onDismiss={hideModal}
							contentContainerStyle={{
								backgroundColor: "white",
								borderRadius: 10,
								paddingVertical: 40,
								paddingHorizontal: 20,
								margin: 20,
							}}>
							<ScrollView>
								<StyledText variant="titleLarge" type="b" style={{ lineHeight: 30 }}>
									বডি ম্যাসাজিং চেয়ার
								</StyledText>
								<StyledText variant="bodyMedium">
									বডি ম্যাসাজ চেয়ার কোন লাক্সারি নয়, এটি একটি প্রয়োজন।এই স্ট্রেসফুল জীবনে
									কিছুমুহূর্তের জন্য সস্থি পেতে ম্যাসাজ এর নেই কোনো জুড়ি। স্ট্রেস বা মানুসিক চাপ,
									ব্যাকপেইন,মেদ বৃদ্ধি কিংবা শরীরের যেকোনো সমস্যার উপায় হলো বডি ম্যাসাজিং চেয়ার।
									ম্যাসাজ আপনাকে করবে শিথিল এবং স্ট্রেসফ্রি। মাত্র ১৫ মিনিটের বডি ম্যাসাজের সেশনে
									আপনি হয়ে উঠবেন সতেজ এবং প্রাণবন্ত।
								</StyledText>
								<StyledText></StyledText>
								<StyledText variant="bodyLarge" type="b">
									বডি ম্যাসাজিং চেয়ারের উপকারিতা:
								</StyledText>
								<StyledText variant="bodyLarge">
									১. স্ট্রেস বা মানসিক চাপ থেকে মুক্ত করতে সাহায্য করে।
								</StyledText>
								<StyledText variant="bodyLarge"> ২. ব্যাকপেইন নিরাময় করে।</StyledText>
								<StyledText variant="bodyLarge"> ৩. মেদ বৃদ্ধি রোধে সাহায্য করে।</StyledText>
								<StyledText variant="bodyLarge">
									৪. রক্ত চলাচল স্বাভাবিক করতে সাহায্য করে।
								</StyledText>
								<StyledText variant="bodyLarge">
									৫. শীর্ণ ও দুর্বল পেশীর শক্তি বৃদ্ধিতে সাহায্য করে।
								</StyledText>
							</ScrollView>
						</Modal>
					</Portal>
				</View>
				{/* Categories */}
				{loading ? (
					<Loading isLoading={loading} />
				) : products ? (
					Object.keys(products).map((category) => (
						<Category key={category} categoryTitle={category} products={products} />
					))
				) : (
					<View style={tw`h-96 flex-1 items-center justify-center `}>
						<StyledText variant="titleLarge" type="b" color={COLOR.neutral}>
							No products found
						</StyledText>
					</View>
				)}
			</ScrollView>
		</>
	);
}
