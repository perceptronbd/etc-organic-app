import React from "react";
import { Container, Text } from "../../components";
import { Retail } from "./Retail";
import { Tabs } from "./Tabs";
import { MultipleProducts } from "./MultipleProducts";

const tabs = [
  {
    label: "Retail",
    content: <Retail />,
  },
  {
    label: "Multiple Products",
    content: <MultipleProducts />,
  },
];

export const Sales = () => {
  return (
    <Container className={"justify-start"}>
      <div className="max-h-[90vh] w-full">
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
