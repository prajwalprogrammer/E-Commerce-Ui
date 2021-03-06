import React, { useState } from "react";
import { View, Dimensions, StatusBar, Image, Text } from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Input/Button";
import { SignIn123 } from "../../Components/Dashboard/AxiosUrl";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../Assets/theme";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-community/async-storage";

const { height, width } = Dimensions.get("window");

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState("AC-");
  const [password, setPassword] = useState("");
  const SignIn1 = async () => {
    await SignIn123(username, password).then(async(res) => {
      if (res === password) {
       // alert("Sucess");
        await AsyncStorage.setItem("UserID", `${username}`);

        await AsyncStorage.setItem("userToken", "abc");
        navigation.navigate("App");
      } else if (res === "undefined") {
        alert("Username does not exist");
      } else {
        alert("Wrong Username or Password");
      }
    });
  };
  return (
    <LinearGradient
      colors={[COLORS.black, "#202020", "#474747"]}
      style={{ flex: 1 }}
      start={{ x: 1.5, y: 0.5 }}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black1} />
      <View
        style={{ flex: 0.5, alignSelf: "center", justifyContent: "flex-end" }}
      >
        <Text style={{ fontSize: 40, fontWeight: "bold", color: COLORS.font }}>
          Sign In
        </Text>
      </View>
      <LinearGradient
        colors={["#333333", "#202020", "#191919", COLORS.black]}
        style={{
          height: height * 0.7,
          width: width * 0.88,

          alignSelf: "center",
          borderRadius: 10,
          marginTop: height * 0.077,
          borderColor: COLORS.black,
          borderWidth: 1,
          //flex:7
        }}
        /// start={{ x: 1.5, y: 0.5 }}
      >
        <Animatable.View animation="fadeInUpBig">
          {/* <Image
              source={require("../../Assets/mwc-title.png")}
              style={{ height: 38, width: 134, alignSelf: "center", marginTop: 34 }}
            /> */}
          {/* <Image
              source={require("../../Assets/mwc-text.png")}
              style={{
                height: 21.36,
                width: 300,
                alignSelf: "center",
                marginTop: 13,
              }}
            /> */}
          <Text
            style={{
              color: COLORS.font,
              fontSize: 18,
              fontWeight: "bold",
              alignSelf: "flex-start",
              marginLeft: 20,
              marginTop: 80,
            }}
          >
            Enter Username
          </Text>
          <Input
            placeholder="Username"
            marginTop={10}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <Input
            placeholder="Password"
            marginTop={34}
            value={password}
            onChangeText={(text) => setPassword(text)}
            Pass={true}
          />
          <Text
            style={{
              color: "#D80000",
              fontSize: 18,
              fontWeight: "bold",
              alignSelf: "flex-end",
              marginRight: 10,
              marginTop: 10,
            }}
          >
            Forgot Password?
          </Text>
          {/* <Button title="SIGN IN" marginTop={60} onPress={() => SignIn1()} /> */}
          <TouchableWithoutFeedback
            style={{
              zIndex: 1,
              marginTop: 50,
              marginLeft: "5%",
              marginRight: "10%",
              width: "65%",
              alignItems: "center",
              alignSelf: "center",
              borderRadius: 10,
              padding: 15,
              // backgroundColor: getRandomColor(),
              borderWidth: 1,
              borderColor: COLORS.font,
            }}
            onPress={() => SignIn1()}
          >
            {/* <Text style={styles.texts}>{item.category_name}</Text> */}
            <Text style={styles.texts}>Sign In</Text>
          </TouchableWithoutFeedback>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
              marginTop: 40,
              color: COLORS.font,
            }}
          >
            Don't have an account ?
            <Text
              style={{ color: "#D80000" }}
              onPress={() => navigation.navigate("SignUpOne")}
            >
              Sign Up
            </Text>
          </Text>
        </Animatable.View>
      </LinearGradient>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  TextInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  texts: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.font,
  },
});
