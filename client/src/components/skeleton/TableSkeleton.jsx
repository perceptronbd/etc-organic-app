import React from "react";
import { Container } from "../container/Container";

export const TableSkeleton = () => {
  return (
    <Container className={"grid h-fit grid-cols-6 grid-rows-6 gap-2 bg-white p-4"}>
      <div className="col-start-1 row-start-1 h-10 w-72 animate-pulse rounded-md bg-neutral-200" />
      <div className="col-span-7 h-10 animate-pulse rounded-md bg-neutral-200" />
      <div className="col-span-7 h-10 animate-pulse rounded-md bg-neutral-200" />
      <div className="col-span-7 h-10 animate-pulse rounded-md bg-neutral-200" />
      <div className="col-span-7 h-10 animate-pulse rounded-md bg-neutral-200" />
      <div className="col-span-7 h-10 animate-pulse rounded-md bg-neutral-200" />
      <div className="col-span-7 h-10 animate-pulse rounded-md bg-neutral-200" />
      <div className="col-span-7 h-10 animate-pulse rounded-md bg-neutral-200" />
      <div className="col-span-7 h-10 animate-pulse rounded-md bg-neutral-200" />
      <div className="col-span-7 h-10 animate-pulse rounded-md bg-neutral-200" />
      <div className="col-span-7 h-10 animate-pulse rounded-md bg-neutral-200" />
      <div className="col-span-7 h-10 animate-pulse rounded-md bg-neutral-200" />
    </Container>
  );
};
