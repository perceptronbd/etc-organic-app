import { router, useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
import { View } from "react-native";
import {
  DataTable,
  Divider,
  Modal,
  Portal,
  RadioButton,
} from "react-native-paper";
import tailwind from "twrnc";
import { placeOrder } from "../../api";
import { StyledButton, StyledText } from "../../components";
import COLOR from "../../constants/COLOR";
import CartContext from "../../contexts/CartContext";
import { formatNumbers } from "../../utils/formatNumbers";
import { Style, log } from "../../utils/log";
import { totalPrice } from "../../utils/totalPrice";
import { trycatch } from "../../utils/trycatch";

const confirmOrder = () => {
  const [value, setValue] = React.useState("delivery");
  const [visible, setVisible] = React.useState(false);

  const data = useLocalSearchParams();

  const { products, fetchCartDetails } = useContext(CartContext);

  log("...confirmOrder cart:", [products], Style.code);

  const showModal = () => setVisible(true);

  const onConfirm = async () => {
    const [placeOrderRes, placeOrderErr] = await trycatch(placeOrder(data));

    if (placeOrderErr) {
      log("...confirmOrder onConfirm:", [placeOrderErr], Style.danger);
      return;
    }

    log("...confirmOrder onConfirm:", [placeOrderRes], Style.success);
    const { status } = placeOrderRes;
    if (status === 201) {
      log("...confirmOrder onConfirm status:", [status]);
      fetchCartDetails();
      showModal();
    } else {
      log("...confirmOrder onConfirm status:", [status]);
    }
    fetchCartDetails();
    showModal();
  };

  const navigateToMyOrder = () => {
    router.push("/(drawer)/(tabs)/home");
    setVisible(false);
  };

  return (
    <View style={tailwind`flex-1 justify-between p-4`}>
      <View style={tailwind`gap-4`}>
        <View style={tailwind`rounded-md bg-white`}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 1.5 }}>
                <StyledText variant="bodySmall">Item Name</StyledText>
              </DataTable.Title>
              <DataTable.Title numeric>
                <StyledText variant="bodySmall">QTY</StyledText>
              </DataTable.Title>
              <DataTable.Title numeric>
                <StyledText variant="bodySmall">Price</StyledText>
              </DataTable.Title>
              <DataTable.Title numeric>
                <StyledText variant="bodySmall">T. Price</StyledText>
              </DataTable.Title>
            </DataTable.Header>
            {products?.map((item) => {
              return (
                <DataTable.Row key={item._id}>
                  <DataTable.Cell style={{ flex: 1.5 }}>
                    <StyledText variant="bodySmall">
                      {item.product.productName}
                    </StyledText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <StyledText variant="bodySmall">
                      {formatNumbers(item.quantity)}
                    </StyledText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <StyledText variant="bodySmall">
                      ৳ {formatNumbers(item.product.salesPrice)}
                    </StyledText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <StyledText variant="bodySmall">
                      ৳ {formatNumbers(item.product.salesPrice * item.quantity)}
                    </StyledText>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
          <Divider />
          {/* Total Price */}
          <View style={tailwind`p-4`}>
            <View style={tailwind`mb-4 flex-row justify-between`}>
              <StyledText>Sub Total</StyledText>
              <StyledText type="b">
                ৳ {formatNumbers(totalPrice(products))}
              </StyledText>
            </View>
            <View style={tailwind`flex-row justify-between`}>
              <StyledText>+Delivery Charge</StyledText>
              <StyledText type="b">৳ {formatNumbers(60)}</StyledText>
            </View>
          </View>
          <Divider />
          {/* Grand Total */}
          <View style={tailwind`p-4`}>
            <View style={tailwind`flex-row justify-between`}>
              <StyledText variant="titleMedium">Grand Total</StyledText>
              <StyledText variant="titleLarge" type="b">
                ৳ {formatNumbers(totalPrice(products) + 60)}
              </StyledText>
            </View>
          </View>
        </View>
        {/* Payment type */}
        <View style={tailwind`rounded-md bg-white p-4`}>
          <StyledText type="b">পেমেন্ট-এর মাধ্যম: ক্যাশ অন ডেলিভারি</StyledText>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View style={tailwind`flex-row items-center`}>
              <RadioButton value="delivery" color={COLOR.tertiary} />
              <StyledText>ক্যাশ অন ডেলিভারি</StyledText>
            </View>
            <View style={tailwind`flex-row items-center`}>
              <RadioButton value="advance" color={COLOR.neutral} disabled />
              <StyledText color={COLOR.neutralDark}>অগ্রিম পেমেন্ট</StyledText>
            </View>
          </RadioButton.Group>
        </View>
      </View>
      {/* Confirm Order */}
      <StyledButton onPress={onConfirm}>কনফার্ম অর্ডার</StyledButton>
      <ConfirmationModel
        visible={visible}
        navigateToMyOrder={navigateToMyOrder}
      />
    </View>
  );
};

const ConfirmationModel = ({ visible, hideModal, navigateToMyOrder }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          height: "40%",
          backgroundColor: "white",
          borderRadius: 10,
          padding: 50,
          margin: 20,
          justifyContent: "space-between",
        }}
      >
        <StyledText variant="titleLarge" type="b">
          অর্ডার কনফার্মেশন
        </StyledText>
        <View>
          <StyledText
            variant="titleMedium"
            type="b"
            style={{
              marginBottom: 2,
            }}
          >
            আপনার অর্ডার টি গ্রহণ করা হয়েছে
          </StyledText>
          <StyledText>
            আপনার অর্ডার আগামী ৩ দিনের মধ্যে ডেলিভার করা হবে. অর্ডারের প্রোগ্রেস
            দেখতে প্রোফাইল সেকশনে গিয়ে মাই অর্ডার এ ক্লিক করুন।
          </StyledText>
        </View>
        <StyledButton onPress={navigateToMyOrder} width={"sm"}>
          ঠিক আছে
        </StyledButton>
      </Modal>
    </Portal>
  );
};

export default confirmOrder;
