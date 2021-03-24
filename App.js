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
import { View } from "react-native";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { COLORS, FONTS, SIZES } from "./Assets/theme";
export const DashboardStack = () => {
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
      <Stack.Screen
        name="Selected_Category"
        component={Categories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="lists"
        component={List}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profiles"
        component={Profile}
        options={{ headerShown: false }}
      />
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
};
const tabOptions = {
  showLabel: false,

  style: {
    height: "8%",
    backgroundColor: COLORS.black,
    // borderTopRightRadius: 35, borderTopLeftRadius: 35
  },
};
const App = () => {
  return (
    <NavigationContainer style={{ backgroundColor: COLORS.black }}>
      <Tab.Navigator
        tabBarOptions={tabOptions}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            const tintColor = focused ? COLORS.white : COLORS.black1;

            switch (route.name) {
              case "Dashboard":
                return (
                  <View
                    style={
                      focused
                        ? {
                            borderRedius: "50%",
                            backgroundColor: COLORS.black1,
                            width: "60%",
                            height: "70%",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 50,
                          }
                        : null
                    }
                  >
                    <MaterialCommunityIcons
                      name="home"
                      color={tintColor}
                      size={35}
                      style={
                        {
                          //tintColor: tintColor,
                          // width: 25,
                          // height: 25,
                        }
                      }
                    />
                  </View>
                );
              case "Report":
                return (
                  <View
                    style={
                      focused
                        ? {
                            borderRedius: "50%",
                            backgroundColor: COLORS.black1,
                            width: "60%",
                            height: "70%",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 50,
                          }
                        : null
                    }
                  >
                    <MaterialCommunityIcons
                      name="cart-outline"
                      color={tintColor}
                      size={35}
                      style={{
                        tintColor: tintColor,
                      }}
                    />
                  </View>
                );

              case "Cart":
                return (
                  <View
                    style={
                      focused
                        ? {
                            borderRedius: "50%",
                            backgroundColor: COLORS.black1,
                            width: "60%",
                            height: "70%",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 50,
                          }
                        : null
                    }
                  >
                    <MaterialCommunityIcons
                      name="cart-arrow-right"
                      color={tintColor}
                      size={35}
                      style={{
                        tintColor: tintColor,
                      }}
                    />
                  </View>
                );
              case "Profile":
                return (
                  <View
                    style={
                      focused
                        ? {
                            borderRedius: "50%",
                            backgroundColor: COLORS.black1,
                            width: "60%",
                            height: "70%",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 50,
                          }
                        : null
                    }
                  >
                    <MaterialCommunityIcons
                      name="face"
                      color={tintColor}
                      size={35}
                      style={{
                        tintColor: tintColor,
                      }}
                    />
                  </View>
                );
            }
          },
        })}
      >
        <Tab.Screen
          // options={{
          //   tabBarLabel: "Home",
          //   tabBarIcon: ({ color, size }) => (
          //     <MaterialCommunityIcons name="home" color={color} size={30} />
          //   ),
          // }}
          name="Dashboard"
          component={DashboardStack}
        />

        <Tab.Screen
          // options={{
          //   tabBarLabel: "Repeat",
          //   tabBarIcon: ({ color, size }) => (
          //     <MaterialCommunityIcons
          //       name="cart-outline"
          //       color={color}
          //       size={30}
          //     />
          //   ),
          // }}
          name="Report"
          component={Cart}
        />
        <Tab.Screen
          // options={{
          //   tabBarLabel: "Show All",
          //   tabBarIcon: ({ color, size }) => (
          //     <MaterialCommunityIcons
          //       name="cart-arrow-right"
          //       color={color}
          //       size={30}
          //     />
          //   ),
          // }}
          name="Cart"
          component={Allproduct}
        />
        <Tab.Screen
          // options={{
          //   tabBarLabel: "Profile",
          //   tabBarIcon: ({ color, size }) => (
          //     <MaterialCommunityIcons name="face" color={color} size={30} />
          //   ),
          // }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
