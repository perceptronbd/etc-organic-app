import { Container, ViewVoucher, Text } from "../../components";
import {vouchers} from "../../utils/mockData"
export const Voucher = () => {

  return (
    <>
        <Container className={"w-fit justify-start"}>
          <Text variant="titleSmall" type="m" className={"self-start"}>
            Voucher
          </Text>
          <ViewVoucher data={vouchers} />
        </Container>
    </>
  );
};
