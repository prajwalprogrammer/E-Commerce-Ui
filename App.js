import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Dashboard from "./Components/Dashboard/Dashboard";
import Report from "./Components/Report/Report";
import Profile from "./Components/Profile/Profile";
import Categories from "./Components/Dashboard/Categories";
import List from "./Components/Dashboard/List";
import Product from "./Components/Dashboard/Product";
import Allproduct from "./Components/Dashboard/Allproduct";
import Cart from "./Screens/Cart/Cart";
import Checkout from "./Screens/Checkout/Checkout";
import Favourites from "./Screens/Favourites/Favourites";
import Finalscreen from "./Screens/Finalscreen/Finalscreen";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/AntDesign";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={Dashboard}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Categories"
        component={Categories}
      />
      <Stack.Screen name="Selected_Category" component={Categories} />
      <Stack.Screen name="lists" component={List} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Profiles" component={Profile} />
      <Stack.Screen
        options={{ title: "MWC Dispensary Depot" }}
        name="Cart"
        component={Cart}
      />
      <Stack.Screen
        options={{ title: "MWC Dispensary Depot" }}
        name="Checkout"
        component={Checkout}
      />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen
        options={{ title: "MWC Dispensary Depot" }}
        name="Finalscreen"
        component={Finalscreen}
      />
    </Stack.Navigator>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
          name="Dashboard"
          component={DashboardStack}
        />

        <Tab.Screen
          options={{
            tabBarLabel: "Repeat",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cart-outline"
                color="blue"
                size={size}
              />
            ),
          }}
          name="Report"
          component={Cart}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Show All",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cart-arrow-right"
                color={color}
                size={size}
              />
            ),
          }}
          name="Cart"
          component={Allproduct}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="face" color={color} size={size} />
            ),
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
