import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { View } from "native-base";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Avatar,
  Button,
  DataTable,
  Divider,
} from "react-native-paper";
import tailwind from "twrnc";
import { getOrderDetails } from "../../../api";
import { updateProfile } from "../../../api/user/authUser";
import {
  Loading,
  MessageModal,
  StyledButton,
  StyledText,
} from "../../../components";
import COLOR from "../../../constants/COLOR";
import { useImage } from "../../../hooks";
import { useAuth } from "../../../hooks/useAuth";
import { useModal } from "../../../hooks/useModal";
import { formatNumbers } from "../../../utils/formatNumbers";
import { groupByOrder } from "../../../utils/groupByOrder";
import { Style, log } from "../../../utils/log";
import { trycatch } from "../../../utils/trycatch";

const addressInput = [
  {
    id: 0,
    label: "বিভাগ*",
    placeholder: "বিভাগ সিলেক্ট করুন",
    type: "select",
    items: [
      { key: "ঢাকা", value: "ঢাকা" },
      { key: "চট্টগ্রাম", value: "চট্টগ্রাম" },
      { key: "রাজশাহী", value: "রাজশাহী" },
      { key: "খুলনা", value: "খুলনা" },
      { key: "বরিশাল", value: "বরিশাল" },
      { key: "রংপুর", value: "রংপুর" },
      { key: "সিলেট", value: "সিলেট" },
      { key: "ময়মনসিংহ", value: "ময়মনসিংহ" },
    ],
  },
  {
    id: 1,
    label: "জেলা*",
    placeholder: "জেলা সিলেক্ট করুন",
    type: "sub-select",
    items: {
      ঢাকা: [
        { key: "ঢাকা", value: "ঢাকা" },
        { key: "গাজীপুর", value: "গাজীপুর" },
        { key: "কিশোরগঞ্জ", value: "কিশোরগঞ্জ" },
        { key: "মুন্সিগঞ্জ", value: "মুন্সিগঞ্জ" },
        { key: "নারায়ণগঞ্জ", value: "নারায়ণগঞ্জ" },
        { key: "নরসিংদী", value: "নরসিংদী" },
        { key: "ফরিদপুর", value: "ফরিদপুর" },
        { key: "টাঙ্গাইল", value: "টাঙ্গাইল" },
        { key: "মানিকগঞ্জ", value: "মানিকগঞ্জ" },
        { key: "রাজবাড়ি", value: "রাজবাড়ি" },
      ],
      চট্টগ্রাম: [
        { key: "চট্টগ্রাম", value: "চট্টগ্রাম" },
        { key: "বান্দরবান", value: "বান্দরবান" },
        { key: "ব্রাহ্মণবাড়িয়া", value: "ব্রাহ্মণবাড়িয়া" },
        { key: "চট্টগ্রাম", value: "চট্টগ্রাম" },
        { key: "বান্দরবান", value: "বান্দরবান" },
        { key: "ব্রাহ্মণবাড়িয়া", value: "ব্রাহ্মণবাড়িয়া" },
      ],
      রাজশাহী: [
        { key: "রাজশাহী", value: "রাজশাহী" },
        { key: "বগুড়া", value: "বগুড়া" },
        { key: "যশোর", value: "যশোর" },
        { key: "নাটোর", value: "নাটোর" },
        { key: "পাবনা", value: "পাবনা" },
        { key: "সিরাজগঞ্জ", value: "সিরাজগঞ্জ" },
      ],
      খুলনা: [
        { key: "খুলনা", value: "খুলনা" },
        { key: "বগুড়া", value: "বগুড়া" },
        { key: "যশোর", value: "যশোর" },
        { key: "নাটোর", value: "নাটোর" },
        { key: "পাবনা", value: "পাবনা" },
        { key: "সিরাজগঞ্জ", value: "সিরাজগঞ্জ" },
      ],
      বরিশাল: [
        { key: "বরিশাল", value: "বরিশাল" },
        { key: "বগুড়া", value: "বগুড়া" },
        { key: "যশোর", value: "যশোর" },
      ],
      রংপুর: [
        { key: "রংপুর", value: "রংপুর" },
        { key: "বগুড়া", value: "বগুড়া" },
        { key: "যশোর", value: "যশোর" },
      ],
      সিলেট: [
        { key: "সিলেট", value: "সিলেট" },
        { key: "বগুড়া", value: "বগুড়া" },
        { key: "যশোর", value: "যশোর" },
      ],
      ময়মনসিংহ: [
        { key: "ময়মনসিংহ", value: "ময়মনসিংহ" },
        { key: "বগুড়া", value: "বগুড়া" },
        { key: "যশোর", value: "যশোর" },
      ],
    },
  },
];

export default function Page() {
  //const apiUrl = Constants.manifest2.extra.apiUrl;

  const [address, setAddress] = useState({
    division: "",
    district: "",
  });

  const [disabled, setDisabled] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isNIDLoading, setIsNIDLoading] = useState(false);

  const { user, loading } = useAuth();
  const { imageUrl: profileImage, setImage: setProfileImage } = useImage(
    user?.userDetails?.image,
  );
  const { imageUrl: nationalIdImage, setImage: setNationalIdImage } = useImage(
    user?.userDetails?.nationalIdImage,
  );

  const { visible, showModal, hideModal, isError, modalMessage } = useModal();

  const pickAndUploadImage = async () => {
    log("openImagePickerAsync...", [], Style.function);
    try {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

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
            //NOTE: URL Hardcoded
            `https://etc-backend.onrender.com/mobile/update-image`,
            pickerResult.assets[0].uri,
            {
              httpMethod: "POST",
              uploadType: FileSystem.FileSystemUploadType.MULTIPART,
              fieldName: "image",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
            .then((uploadResult) => {
              log("uploadResult:", [uploadResult], Style.success);
              const body = uploadResult.body;
              const imageURL = JSON.parse(body).imagePath;
              log("imageURL:", [imageURL], Style.code);
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
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

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
            //NOTE: URL Hardcoded
            `https://etc-backend.onrender.com/mobile/update-national-image`,
            pickerResult.assets[0].uri,
            {
              httpMethod: "POST",
              uploadType: FileSystem.FileSystemUploadType.MULTIPART,
              fieldName: "nationalIdImage",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          ).then((uploadResult) => {
            const body = uploadResult.body;
            const imageURL = JSON.parse(body).imagePath;
            console.log("uploadResult:", imageURL);
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

  return loading ? (
    <Loading isLoading={loading} />
  ) : (
    <ScrollView style={tailwind`flex-1 px-3 py-4`}>
      <View style={tailwind`flex items-center rounded-xl bg-white p-2`}>
        <Profile
          source={profileImage}
          name={user?.name}
          phone={user?.mobileNumber}
          refCode={user?.referralCode}
          CSB={user?.CSB}
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
        <StyledButton
          disabled={disabled}
          loading={disabled}
          width={"md"}
          onPress={handleSubmit}
        >
          তথ্য সেভ করুন
        </StyledButton>
      </View>
      <Orders />
      <MessageModal
        isError={isError}
        visible={visible}
        hideModal={hideModal}
        modalMessag={modalMessage}
      />
    </ScrollView>
  );
}

const Profile = ({
  source,
  name,
  phone,
  refCode,
  CSB,
  points,
  pickImage,
  isProfileLoading,
}) => {
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
            source={{ uri: source }}
          />
        )}
        <Button
          onPress={pickImage}
          loading={isProfileLoading}
          disabled={isProfileLoading}
          textColor={COLOR.primary}
        >
          Edit <Feather name="edit" size={15} color={COLOR.primary} />
        </Button>
      </View>
      <View style={tailwind`flex gap-1`}>
        <StyledText variant="bodyLarge" type="b">
          {name}
        </StyledText>
        <StyledText>{phone}</StyledText>
        <View
          style={tailwind`flex-row items-center justify-between gap-2 px-2 bg-[${COLOR.primaryLight}] rounded-md`}
        >
          <StyledText variant="bodySmall">Refer Code:</StyledText>
          <StyledText type="b" color={COLOR.primary}>
            {refCode}
          </StyledText>
        </View>
        <View
          style={tailwind`w-32 flex-row items-center justify-between gap-2 px-2 bg-[${COLOR.secondaryLight}] rounded-md`}
        >
          <StyledText variant="bodySmall">CSB:</StyledText>
          <StyledText type="b" color={COLOR.secondary}>
            {CSB === undefined ? 0 : CSB}
          </StyledText>
        </View>
        <View
          style={tailwind`w-32 flex-row items-center justify-between gap-2  px-2 bg-[${COLOR.secondaryLight}] rounded-md`}
        >
          <StyledText variant="bodySmall">Points:</StyledText>
          <StyledText type="b" color={COLOR.secondary}>
            {points === undefined ? 0 : points}
          </StyledText>
        </View>
      </View>
    </View>
  );
};

const NIDandAddress = ({
  pickNID,
  setData,
  nidImage,
  div,
  dist,
  isNIDLoading,
}) => {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      division,
      district,
    }));
  }, [division, district]);

  return (
    <View style={tailwind`w-full justify-between py-4`}>
      <View style={tailwind`flex items-start`}>
        <StyledText variant="bodySmall">জাতীয় পরিচয়পত্রের ছবি</StyledText>
        <Image
          style={tailwind`h-52 w-full rounded-md bg-[${COLOR.neutral}] border bg-opacity-50 border-[${COLOR.neutralDark}]`}
          source={{ uri: nidImage }}
          alt="NID"
        />
        <Button
          onPress={pickNID}
          loading={isNIDLoading}
          disabled={isNIDLoading}
          textColor={COLOR.primary}
        >
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

const Orders = () => {
  //declare state for orders
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //log("...order details...", [], Style.effects);
    setLoading(true);
    const fetchOrderDetails = async () => {
      const [getOrderDetailsRes, getOrderDetailsErr] =
        await trycatch(getOrderDetails());

      if (getOrderDetailsErr) {
        //log("order details:", [getOrderDetailsErr], Style.danger);
        setLoading(false);
        return;
      }

      //log("profile order details:", [getOrderDetailsRes], Style.success);
      const { data, status } = getOrderDetailsRes;
      if (status === 200 || status === 201) {
        log("data:", [data], Style.code);
        const groupedData = groupByOrder(data);
        //log("groupedData:", [groupedData], Style.code);
        setOrders(groupedData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getOrderDetails().then((res) => {
        //console.log("...profile order details:", res);
        const { data, status } = res;
        if (status === 200 || status === 201) {
          log("data:", [data], Style.code);
          const groupedData = groupByOrder(data);
          //log("groupedData:", [groupedData], Style.code);
          setOrders(groupedData);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    }, 10000); // 5000 ms = 5 s

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View>
      <StyledText
        variant="titleMedium"
        type="b"
        style={{
          marginTop: 20,
          marginLeft: 10,
        }}
      >
        অর্ডার সমূহ
      </StyledText>
      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: 10,
          maxHeight: 700,
          rowGap: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator animating color={COLOR.secondary} size={"small"} />
        ) : (
          orders.Pending && (
            <>
              <StyledText
                variant="bodySmall"
                style={{
                  marginBottom: -10,
                }}
              >
                পেন্ডিং অর্ডার
              </StyledText>
              <ScrollView
                contentContainerStyle={{
                  rowGap: 10,
                }}
              >
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
          orders.Completed && (
            <>
              <StyledText
                variant="bodySmall"
                style={{
                  marginBottom: -10,
                }}
              >
                কমপ্লিটেড অর্ডার
              </StyledText>
              <ScrollView
                contentContainerStyle={{
                  rowGap: 10,
                }}
              >
                {orders.Completed?.map((item, index) => (
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
              <StyledText variant="bodySmall">
                {item.product.productName}
              </StyledText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <StyledText variant="bodySmall">
                {formatNumbers(item.quantity)}
              </StyledText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <StyledText variant="bodySmall">
                ৳ {formatNumbers(item.product.salesPrice)}
              </StyledText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <StyledText variant="bodySmall">
                ৳ {formatNumbers(item.product.salesPrice * item.quantity)}
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
