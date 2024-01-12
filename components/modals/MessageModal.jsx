import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import tailwind from "twrnc";
import { StyledText } from "../texts/StyledText";

export const MessageModal = ({ visible, hideModal, modalMessag, isError }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={tailwind.style(
          "flex flex-row items-center gap-2",
          {
            height: "auto",
            width: "auto",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            margin: 20,
          },
        )}
      >
        {typeof modalMessag === "object" &&
        modalMessag !== null &&
        Object.keys(modalMessag).length > 0 ? (
          <View style={tailwind`flex`}>
            <View style={tailwind`flex-row items-center gap-2 self-center`}>
              <MaterialIcons
                name="error-outline"
                size={24}
                style={tailwind`text-red-500`}
              />
              <StyledText
                variant="bodyLarge"
                type="b"
                style={{
                  color: `red`,
                }}
              >
                Error!
              </StyledText>
            </View>
            {Object.values(modalMessag).map(
              (error, index) =>
                error && (
                  <StyledText key={index} style={tailwind`text-center`}>
                    {error}
                  </StyledText>
                ),
            )}
          </View>
        ) : (
          <>
            {isError ? (
              <MaterialIcons
                name="error-outline"
                size={24}
                style={tailwind`text-red-500`}
              />
            ) : (
              <MaterialIcons
                name="check-circle-outline"
                size={24}
                style={tailwind`text-green-500`}
              />
            )}

            <StyledText>{modalMessag}</StyledText>
          </>
        )}
      </Modal>
    </Portal>
  );
};
