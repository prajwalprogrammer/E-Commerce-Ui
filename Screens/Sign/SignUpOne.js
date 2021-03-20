import React, { useState } from "react";
import { View, Dimensions, StatusBar, Image, Text } from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Input/Button";

const { height, width } = Dimensions.get("window");

export default function SignUpOne({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(21, 21, 21, 0.79)" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(21, 21, 21, 0.79)"
      />
      <View
        style={{
          height: height * 0.79,
          width: width * 0.88,
          borderRadius: 10,
          backgroundColor: "rgba(255, 255, 255, 0.83)",
          alignSelf: "center",
          marginTop: 54,
        }}
      >
       /* <Image
          source={require("../../Assets/mwc-title.png")}
          style={{ height: 38, width: 134, alignSelf: "center", marginTop: 34 }}
        />
        <Image
          source={require("../../Assets/mwc-text.png")}
          style={{
            height: 21.36,
            width: 300,
            alignSelf: "center",
            marginTop: 13,
          }}
        />*/
        <Input
          placeholder="Username"
          value={username}
          marginTop={53.64}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholder="Password"
          value={password}
          marginTop={15}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Confirm Password"
          value={cpassword}
          marginTop={13}
          onChangeText={(text) => setCpassword(text)}
        />
        <Button
          title="Go ->"
          marginTop={48}
          onPress={() => navigation.navigate("Sign Up Two")}
        />
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: 18,
            marginTop: 24,
          }}
        >
          Already have an account |{" "}
          <Text
            style={{ color: "red" }}
            onPress={() => navigation.navigate("Sign In")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}
