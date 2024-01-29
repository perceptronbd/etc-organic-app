import React from "react";
import { Container, Text } from "../../components";
import { Retail } from "./Retail";
import { Tabs } from "./Tabs";

const tabs = [
  {
    label: "Retail",
    content: <Retail />,
  },
  // {
  //   label: "Wholesale",
  //   content: <Wholesale />,
  // },
];

export const Sales = () => {
  return (
    <Container className={"justify-start"}>
      <div className="w-full">
        <Text variant="titleSmall" type="m" className={"mb-2"}>
          Sales
        </Text>
        <section className="flex h-full w-full justify-center">
          <Tabs tabs={tabs} />
        </section>
      </div>
    </Container>
  );
};
