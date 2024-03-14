import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { View } from "native-base";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Avatar, Button, DataTable, Divider } from "react-native-paper";
import tailwind from "twrnc";
import { getCSBandTaka, getOrderDetails } from "../../../api";
import { updateProfile } from "../../../api/user/authUser";
import { Loading, MessageModal, StyledButton, StyledText } from "../../../components";
import COLOR from "../../../constants/COLOR";
import { useImage } from "../../../hooks";
import { useAuth } from "../../../hooks/useAuth";
import { useModal } from "../../../hooks/useModal";
import { formatNumbers } from "../../../utils/formatNumbers";
import { groupByOrder } from "../../../utils/groupByOrder";
import { addressInput } from "../../../utils/inputs";
import { Style, log } from "../../../utils/log";
import { trycatch } from "../../../utils/trycatch";

export default function Page() {
	//const apiUrl = Constants.manifest2.extra.apiUrl;

	const [csb, setCSB] = useState(0);

	const [orders, setOrders] = useState({});

	const [address, setAddress] = useState({
		division: "",
		district: "",
	});

	const [disabled, setDisabled] = useState(false);
	const [isProfileLoading, setIsProfileLoading] = useState(false);
	const [isNIDLoading, setIsNIDLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [loadingOrder, setLoadingOrder] = useState(false);

	const { user, loading } = useAuth();
	const { imageUrl: profileImage, setImage: setProfileImage } = useImage(
		user?.userDetails?.image?.secure_url
	);
	const { imageUrl: nationalIdImage, setImage: setNationalIdImage } = useImage(
		user?.userDetails?.nationalIdImage?.secure_url
	);

	const { visible, showModal, hideModal, isError, modalMessage } = useModal();

	useEffect(() => {
		getCSB();
		fetchOrderDetails();
	}, []);

	const pickAndUploadImage = async () => {
		log("openImagePickerAsync...", [], Style.function);
		try {
			let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (permissionResult.granted === false) {
				alert("Permission to access camera roll is required!");
				return;
			}
			let pickerResult = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [1, 1],
				quality: 1,
			});
			if (!pickerResult.canceled) {
				setIsProfileLoading(true);
				AsyncStorage.getItem("user-token").then((token) => {
					log("Upload Image API", [], Style.api);
					FileSystem.uploadAsync(
						//NOTE: URL
						`https://etc-backend.onrender.com/mobile/update-image`,
						// `http:/192.168.0.104:5000/mobile/update-image`,
						pickerResult.assets[0].uri,
						{
							httpMethod: "POST",
							uploadType: FileSystem.FileSystemUploadType.MULTIPART,
							fieldName: "image",
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					)
						.then((uploadResult) => {
							log("uploadResult:", [uploadResult], Style.success);
							const body = uploadResult.body;
							const imageURL = JSON.parse(body).imagePath;
							log("imageURL profile image:", [imageURL], Style.code);
							setProfileImage(imageURL);
							setIsProfileLoading(false);
						})
						.catch((err) => {
							log("uploadResult:", [err], Style.danger);
							setIsProfileLoading(false);
						});
				});
			}
		} catch (error) {
			console.log("error:", error);
		}
	};

	const pickAndUploadNID = async () => {
		console.log("openImagePickerAsync...");
		try {
			let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (permissionResult.granted === false) {
				alert("Permission to access camera roll is required!");
				return;
			}
			let pickerResult = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
			if (!pickerResult.canceled) {
				setIsNIDLoading(true);
				console.log("pickerResult:", pickerResult);
				AsyncStorage.getItem("user-token").then((token) => {
					FileSystem.uploadAsync(
						//NOTE: URL
						`https://etc-backend.onrender.com/mobile/update-national-image`,
						// `http://192.168.0.104:5000/mobile/update-national-image`,
						pickerResult.assets[0].uri,
						{
							httpMethod: "POST",
							uploadType: FileSystem.FileSystemUploadType.MULTIPART,
							fieldName: "nationalIdImage",
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					).then((uploadResult) => {
						const body = uploadResult.body;
						const imageURL = JSON.parse(body).imagePath;
						console.log("uploadResult NID Image:", body);
						setNationalIdImage(imageURL);
						setIsNIDLoading(false);
					});
				});
			}
		} catch (error) {
			console.log("error:", error);
			setIsNIDLoading(false);
		}
	};

	const handleSubmit = async () => {
		setDisabled(true);
		console.log("handleSubmit:", address);

		//validate checks before submitting the form
		if (address.division === "") {
			showModal("Please select a division", true);
			setDisabled(false);
			return;
		}
		if (address.district === "") {
			showModal("Please select a district", true);
			setDisabled(false);
			return;
		}

		try {
			AsyncStorage.getItem("user-token").then((token) => {
				try {
					updateProfile(token, address).then((res) => {
						console.log("updateProfile res:", res);
						if (res.status === 200) {
							showModal("প্রোফাইল সফল ভাবে আপডেট করা হয়েছে", false);
							setDisabled(false);
						} else {
							showModal("কিছু সমস্যা হয়েছে", true);
							setDisabled(false);
						}
					});
				} catch (error) {
					setDisabled(false);
					console.log(error);
				}
			});
		} catch (error) {
			setDisabled(false);
			console.log(error);
		}
	};

	const fetchOrderDetails = async () => {
		setLoadingOrder(true);
		const [getOrderDetailsRes, getOrderDetailsErr] = await trycatch(getOrderDetails());

		if (getOrderDetailsErr) {
			//log("order details:", [getOrderDetailsErr], Style.danger);
			setLoadingOrder(false);
			return;
		}

		//log("profile order details:", [getOrderDetailsRes], Style.success);
		const { data, status } = getOrderDetailsRes;
		if (status === 200 || status === 201) {
			log("data:", [data], Style.code);
			const groupedData = groupByOrder(data);
			//log("groupedData:", [groupedData], Style.code);
			setOrders(groupedData);
			setLoadingOrder(false);
		} else {
			setLoadingOrder(false);
		}
	};

	const getCSB = async () => {
		const [res, err] = await trycatch(getCSBandTaka());
		if (err) {
			console.log("...index redeem fetchCSBandTaka err", err);
			return;
		}

		console.log("...index redeem fetchCSBandTaka res", res);

		if (res.status === 200) {
			console.log("...index redeem fetchCSBandTaka res.data", res.data);
			setCSB(res.data?.CSB || 0);
		}
	};

	const onRefresh = async () => {
		setRefreshing(true);
		try {
			console.log("...onRefresh start...");
			getCSB();
			fetchOrderDetails();
			setRefreshing(false);
		} catch (error) {
			setRefreshing(false);
			console.log("...onRefresh error:", error);
		}
	};

	return loading ? (
		<Loading isLoading={loading} />
	) : (
		<ScrollView
			style={tailwind`flex-1 px-3 py-4`}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
			<View style={tailwind`flex items-center rounded-xl bg-white p-2`}>
				<Profile
					source={profileImage}
					name={user?.name}
					phone={user?.mobileNumber}
					refCode={user?.referralCode}
					CSB={csb ? csb : user?.CSB}
					points={user?.points}
					pickImage={pickAndUploadImage}
					isProfileLoading={isProfileLoading}
				/>
				<Divider style={tailwind`w-full border border-[${COLOR.neutral}]`} />
				<NIDandAddress
					pickNID={pickAndUploadNID}
					nidImage={nationalIdImage}
					setData={setAddress}
					div={user?.userDetails?.thana}
					dist={user?.userDetails?.district}
					isNIDLoading={isNIDLoading}
				/>
				<StyledButton disabled={disabled} loading={disabled} width={"md"} onPress={handleSubmit}>
					তথ্য সেভ করুন
				</StyledButton>
			</View>
			<Orders loading={loadingOrder} orders={orders} />
			<MessageModal
				isError={isError}
				visible={visible}
				hideModal={hideModal}
				modalMessag={modalMessage}
			/>
		</ScrollView>
	);
}

const Profile = ({ source, name, phone, refCode, CSB, points, pickImage, isProfileLoading }) => {
	const [profileImage, setProfileImage] = useState(null);

	useEffect(() => {
		setProfileImage({ uri: source });
	}, [source]);

	const handleImageError = () => {
		// console.log("error:Profile Image");
		setProfileImage(require("../../../assets/profile.png"));
	};

	return (
		<View style={tailwind`w-full flex-row items-start gap-8 py-1`}>
			<View style={tailwind`flex`}>
				{source === undefined || source === null ? (
					<Avatar.Icon
						size={80}
						icon="account"
						color="white"
						style={tailwind`bg-[${COLOR.neutral}]`}
					/>
				) : (
					<Avatar.Image
						size={80}
						style={tailwind`bg-[${COLOR.neutral}]`}
						//source={{ uri: `data:image/jpeg;base64,${source}` }}
						// source={{ uri: profileImage }}
						source={profileImage}
						onError={handleImageError}
					/>
				)}
				<Button
					onPress={pickImage}
					loading={isProfileLoading}
					disabled={isProfileLoading}
					textColor={COLOR.primary}>
					Edit <Feather name="edit" size={15} color={COLOR.primary} />
				</Button>
			</View>
			<View style={tailwind`flex gap-1`}>
				<StyledText variant="bodyLarge" type="b">
					{name}
				</StyledText>
				<StyledText>{phone}</StyledText>
				<View
					style={tailwind`flex-row items-center justify-between gap-2 px-2 bg-[${COLOR.primaryLight}] rounded-md`}>
					<StyledText variant="bodySmall">Refer Code:</StyledText>
					<StyledText type="b" color={COLOR.primary}>
						{refCode}
					</StyledText>
				</View>
				<View
					style={tailwind` flex-row items-center justify-between gap-2 px-2 bg-[${COLOR.secondaryLight}] rounded-md`}>
					<StyledText variant="bodySmall">CSB:</StyledText>

					<StyledText type="b" color={COLOR.secondary}>
						{CSB === undefined ? 0 : parseFloat(CSB).toFixed(2)}
					</StyledText>
				</View>
				<View
					style={tailwind`flex-row items-center justify-between gap-2  px-2 bg-[${COLOR.secondaryLight}] rounded-md`}>
					<StyledText variant="bodySmall">Points:</StyledText>
					<StyledText type="b" color={COLOR.secondary}>
						{points === undefined ? 0 : parseFloat(points).toFixed(2)}
					</StyledText>
				</View>
			</View>
		</View>
	);
};

const NIDandAddress = ({ pickNID, setData, nidImage, div, dist, isNIDLoading }) => {
	const [NIDImage, setNIDImage] = useState(null);

	const [division, setDivision] = useState("");
	const [district, setDistrict] = useState("");

	useEffect(() => {
		setData((prev) => ({
			...prev,
			division,
			district,
		}));
	}, [division, district]);

	useEffect(() => {
		setNIDImage({ uri: nidImage });
	}, [nidImage]);

	const handleImageError = () => {
		setNIDImage(require("../../../assets/NID.png"));
	};

	return (
		<View style={tailwind`w-full justify-between py-4`}>
			<View style={tailwind`flex items-start`}>
				<StyledText variant="bodySmall">জাতীয় পরিচয়পত্রের ছবি</StyledText>
				<Image
					style={tailwind`h-52 w-full rounded-md bg-[${COLOR.neutral}] border bg-opacity-50 border-[${COLOR.neutralDark}]`}
					source={NIDImage}
					alt="NID"
					onError={handleImageError}
				/>
				<Button
					onPress={pickNID}
					loading={isNIDLoading}
					disabled={isNIDLoading}
					textColor={COLOR.primary}>
					Upload NID <Feather name="edit" size={15} color={COLOR.primary} />
				</Button>
			</View>
			<View>
				{addressInput.map((input) => {
					return input.type === "select" ? (
						<SelectList
							key={input.id}
							placeholder={div || input.placeholder}
							setSelected={(val) => setDivision(val)}
							data={input.items}
							save={division}
							boxStyles={{
								marginTop: 8,
								backgroundColor: "#fff",
							}}
							dropdownStyles={{
								width: 300,
							}}
						/>
					) : input.type === "sub-select" ? (
						<SelectList
							key={input.id}
							placeholder={dist || input.placeholder}
							setSelected={(val) => setDistrict(val)}
							data={input.items[division] || ["বিভাগ সিলেক্ট করুন"]}
							save={district}
							boxStyles={{
								marginTop: 8,
								backgroundColor: "#fff",
							}}
							dropdownStyles={{
								width: 300,
							}}
						/>
					) : null;
				})}
			</View>
		</View>
	);
};

const Orders = ({ loading, orders }) => {
	return (
		<View>
			{Object.keys(orders).length > 0 && (
				<>
					<StyledText
						variant="titleMedium"
						type="b"
						style={{
							marginTop: 20,
							marginLeft: 10,
						}}>
						অর্ডার সমূহ
					</StyledText>
					<View
						style={{
							paddingHorizontal: 10,
							paddingTop: 10,
							maxHeight: 700,
							rowGap: 20,
						}}>
						{loading ? (
							<ActivityIndicator animating color={COLOR.secondary} size={"small"} />
						) : (
							orders.Pending && (
								<>
									<StyledText
										variant="bodySmall"
										style={{
											marginBottom: -10,
											width: 100,
											padding: 5,
											borderRadius: 5,
											textAlign: "center",
											backgroundColor: "rgb(254 249 195)",
										}}
										color={"rgb(250, 204, 21)"}>
										পেন্ডিং অর্ডার
									</StyledText>
									<ScrollView
										contentContainerStyle={{
											rowGap: 10,
										}}>
										{orders?.Pending?.map((item, index) => (
											<OrderCard
												key={index}
												products={item.cart.products}
												subTotal={item.cart.totalPrice}
											/>
										))}
									</ScrollView>
								</>
							)
						)}

						{loading ? (
							<ActivityIndicator animating color={COLOR.secondary} size={"small"} />
						) : (
							orders.Complete && (
								<>
									<StyledText
										variant="bodySmall"
										style={{
											marginBottom: -10,
											width: 150,
											padding: 5,
											borderRadius: 5,
											textAlign: "center",
											backgroundColor: "rgb(220, 252 ,231)",
										}}
										color={" rgb(34, 197, 94)"}>
										কমপ্লিটেড অর্ডার
									</StyledText>
									<ScrollView
										contentContainerStyle={{
											rowGap: 10,
										}}>
										{orders.Complete?.map((item, index) => (
											<OrderCard
												key={index}
												products={item.cart.products}
												subTotal={item.cart.totalPrice}
											/>
										))}
									</ScrollView>
								</>
							)
						)}
					</View>
				</>
			)}
		</View>
	);
};

const OrderCard = ({ products, subTotal }) => {
	return (
		<View style={tailwind`rounded-md bg-white`}>
			<DataTable>
				<DataTable.Header style={{}}>
					<DataTable.Title style={{ flex: 1.5 }}>
						<StyledText variant="bodySmall">Item Name</StyledText>
					</DataTable.Title>
					<DataTable.Title numeric>
						<StyledText variant="bodySmall">QTY</StyledText>
					</DataTable.Title>
					<DataTable.Title numeric>
						<StyledText variant="bodySmall">Price</StyledText>
					</DataTable.Title>
					<DataTable.Title numeric>
						<StyledText variant="bodySmall">T. Price</StyledText>
					</DataTable.Title>
				</DataTable.Header>
				{products.map((item, index) => (
					<DataTable.Row key={index}>
						<DataTable.Cell style={{ flex: 1.5 }}>
							<StyledText variant="bodySmall">{item.product?.productName}</StyledText>
						</DataTable.Cell>
						<DataTable.Cell numeric>
							<StyledText variant="bodySmall">{formatNumbers(item?.quantity)}</StyledText>
						</DataTable.Cell>
						<DataTable.Cell numeric>
							<StyledText variant="bodySmall">
								৳ {formatNumbers(item.product?.salesPrice)}
							</StyledText>
						</DataTable.Cell>
						<DataTable.Cell numeric>
							<StyledText variant="bodySmall">
								৳ {formatNumbers(item.product?.salesPrice * item.quantity)}
							</StyledText>
						</DataTable.Cell>
					</DataTable.Row>
				))}
			</DataTable>
			<Divider />
			<View style={tailwind`p-4`}>
				<View style={tailwind`mb-4 flex-row justify-between`}>
					<StyledText>Sub Total</StyledText>
					<StyledText type="b">৳ {formatNumbers(subTotal)}</StyledText>
				</View>
				<View style={tailwind`flex-row justify-between`}>
					<StyledText>+Delivery Charge</StyledText>
					<StyledText type="b">৳ {formatNumbers(60)}</StyledText>
				</View>
			</View>
			<Divider />
			<View style={tailwind`p-4`}>
				<View style={tailwind`flex-row justify-between`}>
					<StyledText variant="titleSmall" type="b">
						Grand Total
					</StyledText>
					<StyledText variant="titleMedium" type="b">
						৳ {formatNumbers(subTotal + 60)}
					</StyledText>
				</View>
			</View>
		</View>
	);
};
