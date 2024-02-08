import React from "react";
import { Skeleton } from "./Skeleton";

export function ListViewSkeleton() {
  return (
    <div className="flex h-full w-[70%] gap-4 p-2">
      <div className="flex h-full w-[60%] flex-col gap-2">
        <Skeleton className={`h-[20%] w-full`} delay={1} />
        <Skeleton className={`h-[20%] w-full`} delay={2} />
        <Skeleton className={`h-[20%] w-full`} delay={3} />
        <Skeleton className={`h-[20%] w-full`} delay={4} />
        <Skeleton className={`h-[20%] w-full`} delay={5} />
      </div>
      <Skeleton className={`h-full w-[40%]`} delay={10} />
    </div>
  );
}
