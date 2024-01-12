import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SelectList } from "react-native-dropdown-select-list";
import tailwind from "twrnc";
import {
  MessageModal,
  StyledButton,
  StyledInput,
  StyledText,
} from "../../components";
import COLOR from "../../constants/COLOR";
import { useModal } from "../../hooks";

const userInfoInputFields = [
  {
    id: "name",
    label: "নাম*",
    placeholder: "আপনার নাম",
  },
  {
    id: "phone",
    label: "ফোন নাম্বার*",
    placeholder: "আপনার ফোন নাম্বার",
  },
  {
    id: "division",
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
    id: "district",
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
  {
    id: "address",
    label: "বিস্তারিত ঠিকানা*",
    placeholder: "আপনার বিস্তারিত ঠিকানা",
  },
  // {
  //   id: 6,
  //   label: "তথ্য গুলো সেভ করুন",
  //   type: "checkbox",
  // },
];

const userInfo = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    division: "",
    district: "",
    address: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState(false);

  const {
    visible: isMessage,
    hideModal: hideMessage,
    showModal: showMessage,
    isError: messageError,
    modalMessage,
  } = useModal();

  useEffect(() => {
    const validateForm = () => {
      const validationErrors = {};

      if (!data.phone.trim()) {
        validationErrors.phone = "Mobile Number is required";
        setError(true);
      } else if (data.phone.length !== 11) {
        validationErrors.phone = "Mobile Number must be 11 digits";
        setError(true);
      } else if (data.phone[0] !== "0" || data.phone[1] !== "1") {
        validationErrors.phone = "Invalid Mobile Number";
        setError(true);
      } else {
        validationErrors.phone = null;
        setError(false);
      }

      if (!data.name.trim()) {
        validationErrors.name = "Name is required";
        setError(true);
      } else if (data.name.length < 3) {
        validationErrors.name = "Name must be at least 3 characters";
        setError(true);
      } else {
        validationErrors.name = null;
        setError(false);
      }

      if (!data.division.trim()) {
        validationErrors.newPassword = "Division is required";
        setError(true);
      } else {
        validationErrors.newPassword = null;
        setError(false);
      }

      if (!data.district.trim()) {
        validationErrors.confirmPassword = "District is required";
        setError(true);
      } else {
        validationErrors.confirmPassword = null;
        setError(false);
      }

      if (!data.address.trim()) {
        validationErrors.address = "Address is required";
        setError(true);
      } else {
        validationErrors.address = null;
        setError(false);
      }

      setErrorMessages((prev) => ({
        ...prev,
        ...validationErrors,
      }));
    };
    validateForm();
  }, [data]);

  const handleChange = (id, text) => {
    setData((prev) => ({
      ...prev,
      [id]: text,
    }));
  };

  const handleSaveAndContinue = () => {
    console.log("... userInfo Save and continue...");

    console.log("...userInfo data", data);

    if (error) {
      console.log(errorMessages);
      showMessage(errorMessages, error);
      return;
    }

    router.push({ pathname: "/checkOut/confirmOrder", params: data });
  };

  return (
    <View style={tailwind`flex-1 px-4 py-4`}>
      <StyledText
        style={{
          marginBottom: 20,
        }}
      >
        দয়া করে সঠিক তথ্য দিন, আপনার দেয়া নাম-ঠিকানাতেই আপনার অর্ডার পাঠানো হবে।
      </StyledText>

      <View style={tailwind`flex-1 justify-between`}>
        <View>
          {userInfoInputFields.map((input) => {
            return input.type === "select" ? (
              <SelectList
                key={input.id}
                placeholder={input.placeholder}
                setSelected={(val) => setData({ ...data, division: val })}
                data={input.items}
                save={data.division}
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
                placeholder={input.placeholder}
                setSelected={(val) => setData({ ...data, district: val })}
                data={input.items[data.division] || ["বিভাগ সিলেক্ট করুন"]}
                save={data.district}
                boxStyles={{
                  marginTop: 8,
                  backgroundColor: "#fff",
                }}
                dropdownStyles={{
                  width: 300,
                }}
              />
            ) : input.type === "checkbox" ? (
              <BouncyCheckbox
                key={input.id}
                size={25}
                text="তথ্য গুলো সেভ করুন"
                fillColor={COLOR.tertiary}
                style={{
                  marginTop: 10,
                  alignSelf: "flex-end",
                }}
                iconStyle={{
                  borderRadius: 5,
                }}
                innerIconStyle={{
                  borderWidth: 2,
                  borderRadius: 5,
                  // borderColor: isSelected ? COLOR.tertiary : COLOR.neutral,
                }}
                textStyle={{
                  textDecorationLine: "none",
                }}
                onPress={(isChecked) => {
                  //  setSelection(isChecked);
                }}
              />
            ) : (
              <StyledInput
                key={input.id}
                mode="outlined"
                label={input.label}
                placeholder={input.placeholder}
                style={{
                  width: "100%",
                }}
                onChangeText={(text) => handleChange(input.id, text)}
              />
            );
          })}
        </View>
        <StyledButton height={"md"} onPress={handleSaveAndContinue}>
          পরের ধাপ
        </StyledButton>
      </View>
      <MessageModal
        visible={isMessage}
        hideModal={hideMessage}
        isError={messageError}
        modalMessag={modalMessage}
      />
    </View>
  );
};

export default userInfo;
