import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { StyledText } from "../components";
import { CartProvider } from "../contexts/CartContext";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-m": require("../assets/fonts/Montserrat-Medium.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <CartProvider>
      <PaperProvider>
        <NativeBaseProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signUp" options={{ headerShown: false }} />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen
              name="productDetails"
              options={{
                headerShown: true,
                headerTitle: () => (
                  <StyledText variant="titleMedium" type="b">
                    বিস্তারিত
                  </StyledText>
                ),
              }}
            />
            <Stack.Screen
              name="checkOut/index"
              options={{
                headerShown: true,
                headerTitle: () => (
                  <StyledText variant="titleMedium" type="b">
                    চেকআউট
                  </StyledText>
                ),
              }}
            />
            <Stack.Screen
              name="checkOut/confirmOrder"
              options={{
                headerShown: true,
                headerTitle: () => (
                  <StyledText variant="titleMedium" type="b">
                    চেকআউট
                  </StyledText>
                ),
              }}
            />
            <Stack.Screen
              name="checkOut/myOrders"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </NativeBaseProvider>
      </PaperProvider>
    </CartProvider>
  );
}
