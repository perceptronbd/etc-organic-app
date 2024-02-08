import React, { useEffect, useState } from "react";
import { cw } from "../../utils/cw";

export const Skeleton = ({ className, props, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 5);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible ? (
    <div className={cw("animate-pulse rounded-md bg-white", className)} {...props} />
  ) : null;
};
