import React from "react";
import { Modal, Portal } from "react-native-paper";

export const ContentModal = ({
  visible,
  hideModal,
  children,
  width,
  height,
  style,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          height: height ? height : "auto",
          width: width ? width : "auto",
          backgroundColor: "white",
          borderRadius: 10,
          padding: 20,
          margin: 20,
          ...style,
        }}
      >
        {children}
      </Modal>
    </Portal>
  );
};
