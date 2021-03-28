import React, { useState } from "react";
import {
  View,
  Dimensions,
  StatusBar,
  Image,
  TextInput,
  Text,
} from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Input/Button";
import { SignIn123 } from "../../Components/Dashboard/AxiosUrl";

const { height, width } = Dimensions.get("window");

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState("AC-");
  const [password, setPassword] = useState("");
  const SignIn1 = async () => {
    await SignIn123(username, password).then((res) => {
      if (res === password) {
        navigation.navigate("Dashboard");
      } else if (res === "undefined") {
        alert("Username does not exist");
      } else {
        alert("Wrong Username or Password");
      }
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "rgba(21, 21, 21, 0.79)" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(21, 21, 21, 0.79)"
      />
      <View
        style={{
          height: height * 0.7,
          width: width * 0.88,
          backgroundColor: "rgba(255, 255, 255, 0.83)",
          alignSelf: "center",
          borderRadius: 10,
          marginTop: height * 0.077,
        }}
      >
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
        <Input
          placeholder="Username"
          marginTop={59.64}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholder="Password"
          marginTop={32}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text
          style={{
            color: "#FF0F0F",
            fontSize: 18,
            fontWeight: "bold",
            alignSelf: "flex-end",
            marginRight: 10,
          }}
        >
          Forgot Password
        </Text>
        <Button title="SIGN IN" marginTop={60} onPress={() => SignIn1()} />
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
            marginTop: 24,
          }}
        >
          Don't have an account ?
          <Text
            style={{ color: "red" }}
            onPress={() => navigation.navigate("SignUpOne")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}
