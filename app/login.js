import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { loginUser } from "../api/user/authUser";
import {
  Loading,
  MessageModal,
  StyledButton,
  StyledInput,
  StyledText,
} from "../components";
import COLOR from "../constants/COLOR";
import { useModal } from "../hooks/useModal";

const inputFeilds = [
  {
    id: "mobileNumber",
    label: "Phone Number",
    mode: "outlined",
  },

  {
    id: "password",
    label: "Password",
    mode: "outlined",
  },
];

const login = () => {
  const [data, setData] = useState({
    mobileNumber: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    visible: isError,
    hideModal: hideError,
    showModal: showError,
  } = useModal();
  const {
    visible: isMessage,
    hideModal: hideMessage,
    showModal: showMessage,
    isError: messageError,
    modalMessage,
  } = useModal();

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user-data");
        const user = JSON.parse(userData);

        if (user !== null) {
          router.push("/(drawer)/(tabs)/home");
        }
      } catch (e) {
        console.log("login error:", e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const validateForm = () => {
      const validationErrors = {};

      if (!data.mobileNumber.trim()) {
        validationErrors.mobileNumber = "Mobile Number is required";
        setError(true);
      } else if (data.mobileNumber.length !== 11) {
        validationErrors.mobileNumber = "Mobile Number must be 11 digits";
        setError(true);
      } else if (data.mobileNumber[0] !== "0" || data.mobileNumber[1] !== "1") {
        validationErrors.mobileNumber = "Invalid Mobile Number";
        setError(true);
      } else {
        validationErrors.mobileNumber = null;
        setError(false);
      }

      if (!data.password.trim()) {
        validationErrors.password = "Password is required";
        setError(true);
      } else if (data.password.length < 6) {
        validationErrors.password = "Password must be at least 6 characters";
        setError(true);
      } else {
        validationErrors.password = null;
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

  const storeUserData = async (userData) => {
    try {
      const { token, user } = userData;
      console.log("storeUserData", token);
      console.log("storeUserData", user);
      const jsonUser = JSON.stringify(user);
      await AsyncStorage.setItem("user-data", jsonUser);
      await AsyncStorage.setItem("user-token", token);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = async () => {
    if (error) return showError();
    console.log("before signUp");
    setLoading(true);
    try {
      loginUser(data).then(async (res) => {
        const { data, status } = res;
        const { data: userData, message } = data;
        if (status === 200 || status === 201) {
          setLoading(false);
          console.log("user data", userData);
          storeUserData(userData);
          router.push("/(drawer)/(tabs)/home");
        } else {
          setLoading(false);
          showMessage(message, true);
        }
      });
    } catch (error) {
      console.log(error);
    }

    // setLoading(true);
    // try {
    //   dispatch(asyncLogin(data));
    //   setLoading(false);
    //   console.log("after signUp", user);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOR.background,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 250,
        }}
      >
        <Avatar.Image
          size={100}
          style={{ backgroundColor: "none " }}
          source={require("../assets/logo/ETC.png")}
        />
        <StyledText type="b" variant="headlineSmall">
          ETC Organic
        </StyledText>
      </View>
      <View>
        <StyledText variant="titleMedium" type="b" className="w-72 ">
          Login
        </StyledText>
        {inputFeilds.map((inputFeild, index) => (
          <StyledInput
            key={index}
            {...inputFeild}
            onChangeText={(text) => handleChange(inputFeild.id, text)}
          />
        ))}
      </View>

      <StyledButton width="md" height={"md"} onPress={onLogin}>
        Login
      </StyledButton>

      <StyledText className="pt-2">
        Don&apos;t have an account?{" "}
        <Link
          replace={true}
          href={"signUp"}
          className={`flex items-center justify-center`}
        >
          <StyledText
            style={{ color: COLOR.secondary }}
            type="b"
            className={`underline`}
          >
            Sign Up
          </StyledText>
        </Link>
      </StyledText>
      <MessageModal
        visible={isError}
        hideModal={hideError}
        modalMessag={errorMessages}
      />
      <MessageModal
        visible={isMessage}
        hideModal={hideMessage}
        isError={messageError}
        modalMessag={modalMessage}
      />
      <Loading isLoading={loading} />
    </View>
  );
};
export default login;
