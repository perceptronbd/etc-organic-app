// useCustomToast.js
import { useToast } from "native-base";
import React from "react";
import { StyledToast } from "../components";

export const useCustomToast = () => {
  const toast = useToast();

  const closeToast = (props) => {
    toast.close(props.id);
  };

  const showToast = ({
    title,
    description,
    variant,
    placement = "bottom",
    duration = 2000,
  }) => {
    const toastOptions = {
      render: (props) => (
        <StyledToast
          {...props}
          title={title}
          description={description}
          variant={variant}
          onClose={closeToast(props)}
        />
      ),
      placement: placement,
      duration: duration,
    };

    toast.show(toastOptions);
  };

  return showToast;
};
