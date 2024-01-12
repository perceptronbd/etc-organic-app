import { useState } from "react";

export const useModal = () => {
  const [visible, setVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message, error = false) => {
    setVisible(true);
    setIsError(error);
    setModalMessage(message);
  };
  const hideModal = () => {
    setVisible(false);
    setIsError(false);
    setModalMessage("");
  };

  return { visible, showModal, hideModal, isError, modalMessage };
};
