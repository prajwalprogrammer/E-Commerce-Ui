import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image,Text } from "react-native";
import Dashboard from "./Components/Dashboard/Dashboard";
import Report from "./Components/Report/Report";
import Profile from "./Components/Profile/Profile";
import List from "./Components/Dashboard/List";
import Product from "./Components/Dashboard/Product";
import Allproduct from "./Components/Dashboard/Allproduct";
import Cart from "./Screens/Cart/Cart";
import Checkout from "./Screens/Checkout/Checkout";
import CheckoutModal from "./Screens/Checkout/CheckoutModal";
import Favourites from "./Screens/Favourites/Favourites";
import Finalscreen from "./Screens/Finalscreen/Finalscreen";
import { ActivityIndicator, StatusBar } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/AntDesign";
import { View, StyleSheet } from "react-native";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { COLORS, FONTS, SIZES } from "./Assets/theme";
import CartProvider from "./Components/GlobalContext/CartProvider";
import RenderItem from "./Components/Dashboard/Daily";
import SignIn from "./Screens/Sign/SignIn";
import SignUpOne from "./Screens/Sign/SignUpOne";
import SignUpTwo from "./Screens/Sign/SignUpTwo";
import SignUpFinal from "./Screens/Sign/SignUpFinal";
import AsyncStorage from "@react-native-community/async-storage";
import {GlobalProvider} from "./Components/Contaxt/GlobalState";
export const DashboardStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUpOne"
        component={SignUpOne}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUpTwo"
        component={SignUpTwo}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FinalPage"
        component={SignUpFinal}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={Dashboard}
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
        name="RenderItem"
        component={RenderItem}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Checkout"
        component={Checkout}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Finalscreen"
        component={Finalscreen}
      />
    </Stack.Navigator>
  );
};

export const AllProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Allproduct"
        component={Allproduct}
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
        options={{ headerShown: false }}
        name="Cart"
        component={Cart}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Checkout"
        component={Checkout}
      />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Finalscreen"
        component={Finalscreen}
      />
    </Stack.Navigator>
  );
};
export const MyCartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyCart"
        component={Cart}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Allproduct"
        component={Allproduct}
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
        options={{ headerShown: false }}
        name="Cart"
        component={Cart}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Checkout"
        component={Checkout}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CheckoutModal"
        component={CheckoutModal}
      />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen
        options={{ headerShown: false }}
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
const AppSTack = () => {
  return (
    <GlobalProvider>
      <CartProvider>
        {/* <NavigationContainer style={{ backgroundColor: COLORS.black }}> */}
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
                              width: "50%",
                              height: "50%",
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
                      <Text style={{color:COLORS.gray,fontSize:10}}>  Home</Text>
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
                        style={
                          {
                            // tintColor: tintColor,
                          }
                        }
                      />
                      <Text style={{color:COLORS.gray,fontSize:10}}>  Cart</Text>
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
                        style={
                          {
                            //  tintColor: tintColor,
                          }
                        }
                      />
                      <Text style={{color:COLORS.gray,fontSize:10}}>Show All</Text>
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
                        style={
                          {
                            //tintColor: tintColor,
                          }
                        }
                      />
                      <Text style={{color:COLORS.gray,fontSize:10}}>  Profile</Text>
                    </View>
                  );
              }
            },
          })}
        >
          <Tab.Screen
             options={{
               tabBarLabel: "Home",
            //   tabBarIcon: ({ color, size }) => (
            //     <MaterialCommunityIcons name="home" color={color} size={30} />
            //   ),
             }}
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
            component={MyCartStack}
          />
          <Tab.Screen
             options={{
               tabBarLabel: "Show All",
            //   tabBarIcon: ({ color, size }) => (
            //     <MaterialCommunityIcons
            //       name="cart-arrow-right"
            //       color={color}
            //       size={30}
            //     />
            //   ),
             }}
            name="Cart"
            component={AllProductStack}
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
        {/* </NavigationContainer> */}
      </CartProvider>
    </GlobalProvider>
  );
};

const AuthSTack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUpOne"
        component={SignUpOne}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUpTwo"
        component={SignUpTwo}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FinalPage"
        component={SignUpFinal}
      />
    </Stack.Navigator>
  );
};

const AuthLoadingScreen = ({ navigation }) => {
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      navigation.navigate(userToken ? "App" : "Auth");
    };
    bootstrapAsync();
  }, []);

  // Fetch the token from storage then navigate to our appropriate place

  // Render any loading content that you like here

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const AppStack = AppSTack;
const AuthStack = AuthSTack;
// export const App = createAppContainer(
//   createSwitchNavigator(
//     {
//       AuthLoading: AuthLoadingScreen,
//       App: AppStack,
//       Auth: AuthStack,
//     },
//     {
//       initialRouteName: 'AuthLoading',
//     }
//   )
// );
const AllAppNavigation = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <AllAppNavigation.Navigator
      initialRouteName="AuthLoad"
      screenOptions={{
        header: () => null,
      }}
    >
      <AllAppNavigation.Screen name="AuthLoad" children={AuthLoadingScreen} />
      <AllAppNavigation.Screen name="Auth" children={AuthStack} />
      <AllAppNavigation.Screen name="App" children={AppStack} />
    </AllAppNavigation.Navigator>
  </NavigationContainer>
);
export default App;
