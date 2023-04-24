import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabBar from "./components/BottomTabBar";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import Parkings from "./screens/tabs/parkings";
import Profile from "./screens/tabs/profile";
import About from "./screens/tabs/about";
import Login from "./screens/login";
import Boarding from "./screens/boarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import PhoneConfirm from "./screens/login/phoneConfirm";
import PhoneLogin from "./screens/login/phoneLogin";
import CompleteProfile from "./screens/completeProfile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          title: "Parkings",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="bike-scooter" size={size} color={color} />
          ),
        }}
        name="Parkings"
        component={Parkings}
      />
      <Tab.Screen
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-clock-outline"
              size={size}
              color={color}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
      {/* <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          tabBarIcon: ({ size, color }) => (
            <SimpleLineIcons name="settings" size={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="About"
        component={About}
        options={{
          title: "About us",
          tabBarIcon: ({ size, color }) => (
            <SimpleLineIcons name="info" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  const [isConnected, setIsConnected] = useState(null);
  const checkUser = async () => {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (isConnected == null) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isConnected ? "TabNavigation" : "Boarding"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Boarding" component={Boarding} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="PhoneConfirm"
          component={PhoneConfirm}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="PhoneLogin"
          component={PhoneLogin}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfile}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          options={{ animation: "slide_from_right" }}
          name="TabNavigation"
          component={TabNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
