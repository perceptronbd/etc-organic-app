import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CustomDrawerContent } from "../../components";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => CustomDrawerContent(props)}
        screenOptions={{
          headerTitle: "",
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="referEarn"
          options={{
            headerShown: true,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
