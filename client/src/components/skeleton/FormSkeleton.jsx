import React from "react";
import { Skeleton } from "./Skeleton";

export function FormSkeleton() {
  return (
    <div className="grid h-[500px] w-full grid-cols-2 grid-rows-6 gap-x-8 gap-y-1 rounded-md bg-white p-4">
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
      <Skeleton className={"h-12 w-96 bg-muted"} />
    </div>
  );
}
