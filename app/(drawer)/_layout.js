import { NavigationContainer } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { CustomDrawerContent } from "../../components";

export default function Layout() {
  return (
    <NavigationContainer>
      <Drawer
        drawerContent={(props) => CustomDrawerContent(props)}
        screenOptions={{
          headerTitle: "",
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="points"
          options={{
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="tutorials"
          options={{
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="referEarn"
          options={{
            headerShown: true,
          }}
        />
      </Drawer>
    </NavigationContainer>
  );
}
