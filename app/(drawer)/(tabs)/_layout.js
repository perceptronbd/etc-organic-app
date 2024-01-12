import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";
import { View } from "native-base";
import { useContext } from "react";
import { Text } from "react-native";
import tailwind from "twrnc";
import { HeaderComponent } from "../../../components";
import COLOR from "../../../constants/COLOR";
import CartContext from "../../../contexts/CartContext";
import { useImage } from "../../../hooks";
import { useAuth } from "../../../hooks/useAuth";

const Layout = () => {
  //const [imgUrl, setImgUrl] = useState(null);

  const { products } = useContext(CartContext);
  const { user } = useAuth();
  const { imageUrl } = useImage(user?.userDetails.image);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLOR.tertiary,
          tabBarShowLabel: false,
          headerTitle: () => (
            <HeaderComponent imgURL={imageUrl} points={user?.points} />
          ),
          headerLeft: () => <DrawerToggleButton />,
          tabBarStyle: {
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            margin: 8,
            borderRadius: 10,
            backgroundColor: COLOR.background,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="(wallet)"
          options={{
            headerTitle: "Wallet",
            headerStyle: { backgroundColor: COLOR.background, elevation: 0 },
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="wallet-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            headerTitle: "Favorite",
            headerStyle: { backgroundColor: COLOR.background, elevation: 0 },
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerStyle: { backgroundColor: COLOR.background, elevation: 0 },
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            headerTitle: "Cart",
            headerStyle: { backgroundColor: COLOR.background, elevation: 0 },
            tabBarIcon: ({ size, color }) =>
              products.length > 0 ? (
                <View style={{ position: "relative" }}>
                  <View
                    style={{
                      position: "absolute",
                      top: -10,
                      left: -10,
                      borderRadius: 999,
                      backgroundColor: "red",
                      padding: 0,
                      width: 16,
                      height: 16,
                      zIndex: 1,
                    }}
                  >
                    <Text
                      style={tailwind`m-0 self-center p-0 text-xs text-white`}
                    >
                      {products.length}
                    </Text>
                  </View>

                  <Ionicons name="cart-outline" size={size} color={color} />
                </View>
              ) : (
                <Ionicons name="cart-outline" size={size} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerTitle: "Profile",
            headerStyle: { backgroundColor: COLOR.background, elevation: 0 },
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;
