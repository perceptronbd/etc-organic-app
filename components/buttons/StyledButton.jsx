import React from "react";
import { Button } from "react-native-paper";
import tw from "twrnc";
import COLOR from "../../constants/COLOR";

export const StyledButton = ({
  variant,
  color = COLOR.secondary,
  width,
  height,
  size,
  rounded = "xl",
  children,
  disabled,
  loading,
  ...props
}) => {
  const textColor =
    variant === "outline" ? "black" : variant === "ghost" ? color : "white";
  const textSize = (height === "sm") | (size === "sm") ? "text-xs" : "";

  const determineWidth = () => {
    if (width) {
      switch (width) {
        case "md":
          return "w-72";
        case "sm":
          return "w-48";
        default:
          return `w-${width}`;
      }
    }

    if (size) {
      switch (size) {
        case "md":
          return "w-72";
        case "sm":
          return "w-48";
        default:
          return "w-96";
      }
    }

    return "w-96";
  };

  const determineHeight = () => {
    if (height) {
      switch (height) {
        case "md":
          return "h-10";
        case "sm":
          return "h-8";
        default:
          return `h-${height}`;
      }
    }

    if (size) {
      switch (size) {
        case "md":
          return "h-10";
        case "sm":
          return "h-8";
        default:
          return "h-12";
      }
    }

    return "h-12";
  };

  const determineSize = () => {
    if (size) {
      switch (size) {
        case "md":
          return "h-10 w-72";
        case "sm":
          return "h-8 w-48";
        default:
          return "h-12 w-96";
      }
    }

    return "";
  };

  return (
    <Button
      loading={loading}
      disabled={disabled}
      style={tw.style(
        `mt-2 items-center justify-center rounded-${rounded} `,
        variant === "outline" || variant === "ghost"
          ? ""
          : disabled
            ? `bg-[${COLOR.neutral}]`
            : `bg-[${color}]`,
        determineWidth(),
        determineHeight(),
        determineSize(),
        {
          "border border-black": variant === "outline",
          "border-none": variant === "ghost",
        },
      )}
      contentStyle={tw.style(
        determineWidth(),
        determineHeight(),
        determineSize(),
      )}
      textColor={textColor}
      maxFontSizeMultiplier={1}
      labelStyle={tw.style(textSize, { fontFamily: "mon" })}
      rippleColor={COLOR.tertiary}
      {...props}
    >
      {children}
    </Button>
  );
};
