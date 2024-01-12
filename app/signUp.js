import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { registerUser } from "../api/user/authUser";
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
    id: "name",
    label: "Name",
    mode: "outlined",
  },
  {
    id: "newPassword",
    label: "New Password",
    mode: "outlined",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    mode: "outlined",
  },
  {
    id: "givenCode",
    label: "Enter Ref Code",
    mode: "outlined",
  },
];

const signUp = () => {
  const [data, setData] = useState({
    mobileNumber: "",
    name: "",
    newPassword: "",
    confirmPassword: "",
    givenCode: "",
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

  const handleChange = (id, text) => {
    setData((prev) => ({
      ...prev,
      [id]: text,
    }));
  };

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

      if (!data.newPassword.trim()) {
        validationErrors.newPassword = "New Password is required";
        setError(true);
      } else if (data.newPassword.length < 6) {
        validationErrors.newPassword = "Password must be at least 6 characters";
        setError(true);
      } else {
        validationErrors.newPassword = null;
        setError(false);
      }

      if (!data.confirmPassword.trim()) {
        validationErrors.confirmPassword = "Confirm Password is required";
        setError(true);
      } else if (data.confirmPassword !== data.newPassword) {
        validationErrors.confirmPassword = "Password does not match";
        setError(true);
      } else {
        validationErrors.confirmPassword = null;
        setError(false);
      }
      setErrorMessages((prev) => ({
        ...prev,
        ...validationErrors,
      }));
    };
    validateForm();
  }, [data]);

  const onSignUp = async () => {
    const { mobileNumber, name, newPassword, givenCode } = data;
    const user = {
      mobileNumber,
      name,
      password: newPassword,
      givenCode,
    };

    setLoading(true);

    try {
      if (error) {
        console.log(errorMessages);
        showError(errorMessages, error);
        setLoading(false);
        return;
      }

      registerUser(user)
        .then((res) => {
          console.log("signUp res:", res);
          const { data, status } = res;
          const { message } = data;
          if (status === 200 || status === 201) {
            setLoading(false);
            router.push("login");
            console.log(data);
          } else {
            setLoading(false);
            showMessage(message, true);
            console.log(message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
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
        <StyledText variant="titleMedium" type="b">
          Sign Up
        </StyledText>
        {inputFeilds.map((inputFeild, index) => (
          <StyledInput
            key={index}
            {...inputFeild}
            onChangeText={(text) => handleChange(inputFeild.id, text)}
          />
        ))}
      </View>
      <StyledButton width={"md"} height={"md"} onPress={onSignUp}>
        Sign Up
      </StyledButton>

      <StyledText className="pt-2">
        Already have an account?{" "}
        <Link replace={true} href={"login"}>
          <StyledText
            style={{ color: COLOR.secondary }}
            type="b"
            className={`underline`}
          >
            Login
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
export default signUp;
