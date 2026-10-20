import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import MarketScreen from "./src/screens/MarketScreen";
import CartScreen from "./src/screens/CartScreen";
import AccountVerifiedScreen from "./src/screens/AccountVerifiedScreen";
import CheckingDataScreen from "./src/screens/CheckingDataScreen";
import ConfirmDataScreen from "./src/screens/ConfirmDataScreen";
import CreateAccount from "./src/screens/CreateAccount";
import HelpSupportScreen from "./src/screens/HelpSupportScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import PaymentsScreen from "./src/screens/PaymentsScreen";
import PersonalDataScreen from "./src/screens/PersonalDataScreen";
import PrivacyScreen from "./src/screens/PrivacyScreen";
import VerifyIdentityScreen from "./src/screens/VerifyIdentityScreen";
import PayScreen from "./src/screens/PayScreen";
import PixScreen from "./src/screens/PixScreen";
import ApprovedScreen from "./src/screens/ApprovedScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{
          headerShown: false, // Esconde o cabeçalho padrão superior da navegação
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Market" component={MarketScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="AccVerify" component={AccountVerifiedScreen} />
        <Stack.Screen name="dataCheck" component={CheckingDataScreen} />
        <Stack.Screen name="dataConfirm" component={ConfirmDataScreen} />
        <Stack.Screen name="creatAcc" component={CreateAccount} />
        <Stack.Screen name="helpSup" component={HelpSupportScreen} />
        <Stack.Screen name="Notification" component={NotificationsScreen} />
        <Stack.Screen name="Payment" component={PaymentsScreen} />
        <Stack.Screen name="personalData" component={PersonalDataScreen} />
        <Stack.Screen name="privacy" component={PrivacyScreen} />
        <Stack.Screen name="verifyIden" component={VerifyIdentityScreen} />
        <Stack.Screen name="PayScreen" component={PayScreen} />
        <Stack.Screen name="PixScreen" component={PixScreen} />
        <Stack.Screen name="ApprovedScreen" component={ApprovedScreen} />
        <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
