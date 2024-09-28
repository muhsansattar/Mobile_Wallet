import React from "react";
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SplashScreen from "./Components/SplashScreen";
import CryptoAuth from "./Components/CryptoAuth";
import RecentTransactions from "./Components/RecentTransactions/RecentTransactions";
import Assets from "./Components/Assets/Assets";
import Transfer from "./Components/Transfer/Transfer.js";
import Profile from "./Components/Profile/Profile";
import Header from "./Components/Header";
import Games from "./Components/Games/Games";
import NFTAssets from "./Components/NFT/NFTAssets";
import GasTracker from "./Components/GasTracker/GasTracker.js";
import Contacts from "./Components/Contacts/Contacts.js";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCreditCard,
  faCoins,
  faUser,
  faPaperPlane,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Moralis from "moralis/types";

LogBox.ignoreAllLogs();

// const Activecolor =
function Home(): JSX.Element {
  return (
      <Drawer.Navigator initialRouteName="Assets">
        <Drawer.Screen
          name="💰 Assets"
          component={Assets}
        />
        <Drawer.Screen
          name="💸 Transactions"
          component={RecentTransactions}
        />
        <Drawer.Screen
          name="🦍 NFTAssets"
          component={NFTAssets}
        />
        <Drawer.Screen
          name="🚀 Transfer"
          component={Transfer}
        />
        <Drawer.Screen 
          name="🎮 Games"
          component={Games}
        />
        <Drawer.Screen
          name="👨‍👩‍👧‍👦 Contacts"
          component={Contacts}
        />
        <Drawer.Screen
          name="👨‍💻 Profile"
          component={Profile}
        />
        <Drawer.Screen
          name="⛽ Gas Tracker"
          component={GasTracker}
        />
      </Drawer.Navigator>
  );
}
const Drawer = createDrawerNavigator();

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  switch (routeName) {
    case "Assets":
      return "Assets";
    case "Transfer":
      return "Transfer";
    case "Transactions":
      return "Transactions";
    case "Profile":
      return "Profile";
    case "Gas Tracker":
      return "Gas Tracker";
  }
}

function App(): JSX.Element {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={CryptoAuth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={Home}
          options={{ headerShown: false }}
          // Hiding header for Navigation Drawer
          //options={{ headerTitle: (props) => <Header /> }}
          // options={({ route }) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
