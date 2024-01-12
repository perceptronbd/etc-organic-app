import React from "react";
import { ActivityIndicator, Modal } from "react-native-paper";
import COLOR from "../../constants/COLOR";

export const Loading = ({ isLoading }) => {
  return (
    <>
      <Modal
        visible={isLoading}
        contentContainerStyle={{
          height: "auto",
          width: "auto",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          margin: 20,
        }}
      >
        <ActivityIndicator animating color={COLOR.secondary} size={"large"} />
      </Modal>
    </>
  );
};
