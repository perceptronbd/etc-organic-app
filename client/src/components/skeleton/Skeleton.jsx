import React from "react";
import { cw } from "../../utils/cw";

export const Skeleton = ({ className, props }) => {
  return <div className={cw("animate-pulse rounded-md bg-muted", className)} {...props} />;
};
