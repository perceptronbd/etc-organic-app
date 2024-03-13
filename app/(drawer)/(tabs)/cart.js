import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "native-base";
import React, { useContext } from "react";
import { Dimensions, Pressable, ScrollView } from "react-native";
import tailwind from "twrnc";
import {
  CartCard,
  Loading,
  StyledButton,
  StyledText,
} from "../../../components";
import COLOR from "../../../constants/COLOR";
import CartContext from "../../../contexts/CartContext";
import { formatNumbers } from "../../../utils/formatNumbers";

export default function Page() {
  const { loading, products, incQty, decQty } = useContext(CartContext);

  const onCheckout = () => {
    router.push("/checkOut");
  };

  const handleIncreaseQuantity = async (product) => {
    console.log("...cart page handleIncreaseQuantity", product._id);
    incQty(product._id);
  };
  const handleDecreaseQuantity = async (product) => {
    console.log("...cart page handleDecreaseQuantity", product._id);
    decQty(product._id);
  };

  const totalPrice = products.reduce(
    (acc, item) => acc + item.product.salesPrice * item.quantity,
    0,
  );

  return (
    <>
      <View style={tailwind`flex-1`}>
        <Pressable
          style={tailwind`my-2 flex-row items-center px-2`}
          onPress={() => router.replace("/(drawer)/(tabs)/home")}
        >
         <Ionicons name="chevron-back" size={24} color="black" />
          <StyledText type="b">কার্ট</StyledText>
        </Pressable>

        {products.length > 0 ? (
          <ScrollView
            contentContainerStyle={{
              columnGap: 10,
              rowGap: 10,
              alignItems: "center",
            }}
          >
            {products.map(({ product, quantity }) => (
              <CartCard
                key={product._id}
                name={product.productName}
                image={product.image}
                price={product.salesPrice}
                quantity={quantity}
                increment={() => handleIncreaseQuantity(product)}
                decrement={() => handleDecreaseQuantity(product)}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={tailwind`flex-1 items-center justify-center`}>
            <StyledText
              variant="displaySmall"
              type="b"
              style={{
                lineHeight: 50,
                color: COLOR.neutral,
              }}
            >
              কার্টে কোন পণ্য নেই
            </StyledText>
          </View>
        )}
        {products.length > 0 && (
          <Checkout totalPrice={totalPrice} onCheckout={onCheckout} />
        )}
      </View>
      <Loading isLoading={loading} />
    </>
  );
}

const Checkout = ({ totalPrice, onCheckout }) => {
  
  const {width} = Dimensions.get("window");

  return (
    <View style={tailwind`p-4`}>
      <View style={tailwind`flex-row`}>
        <StyledText
          type="b"
          style={{
            color: "#808080",
          }}
        >
          মোটঃ
        </StyledText>
        <StyledText type="b"> ৳ {formatNumbers(totalPrice)}</StyledText>
        <StyledText> +ডেলিভারি চার্জ</StyledText>
      </View>
      <StyledButton  width={width-32} height={"md"} onPress={onCheckout}>
        চেকআউট
      </StyledButton>
    </View>
  );
};
