import React, { useState } from "react";
import { View, Dimensions, Image, StatusBar, TextInput } from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Input/Button";

const { height, width } = Dimensions.get("window");

export default function SignUpTwo({ navigation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [upload, setUpload] = useState("");

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
          style={{
            height: 38,
            width: 134,
            alignSelf: "center",
            marginTop: 15,
          }}
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
          placeholder="Business Name"
          marginTop={15}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Business Address"
          marginTop={15}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder="Email Id"
          marginTop={15}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Phone Id"
          marginTop={18}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          placeholder="Upload Sales Tax Id"
          style={{
            width: width * 0.82,
            height: 115,
            backgroundColor: "#6F6F6F",
            borderRadius: 10,
            marginTop: 21,
            alignSelf: "center",
            fontSize: 18,
            textAlign: "center",
            fontWeight: "300",
          }}
          placeholderTextColor="#BDBDBD"
          value={upload}
          onChangeText={(text) => setUpload(text)}
        />
        <Button
          title="SUBMIT"
          marginTop={height * 0.052}
          onPress={() => navigation.navigate("Sign Up Final")}
        />
      </View>
    </View>
  );
}
