import React, { useState } from "react";
import { View, Dimensions, StatusBar, Image, Text } from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Input/Button";
import BcryptReactNative from "bcrypt-react-native";
import { COLORS } from "../../Assets/theme";
import { LinearGradient } from "expo-linear-gradient";
const { height, width } = Dimensions.get("window");
import * as Animatable from "react-native-animatable";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function SignUpOne({ navigation }) {
  const [username, setUsername] = useState(`AC-${Math.floor(Math.random()*100000)}`);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const saltRounds = 10;
  //const myPlaintextPassword = password;
  // const someOtherPlaintextPassword = cpassword;
  const CheckAuth = async () => {
    if((password != "") && (password === cpassword))
    {
      navigation.navigate("SignUpTwo", { useName: username, password: password });
    }
    else{
      alert("Please Enter Correct Password")
    }
    
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
          Sign Up
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
          {/* /* <Image
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
        /> */}
          <Text
            style={{
              color: COLORS.font,
              fontSize: 18,
              fontWeight: "bold",
              alignSelf: "flex-start",
              marginLeft: 20,
              marginTop: 60,
            }}
          >
            Enter Username
          </Text>
          <Input
            placeholder="Username"
            value={username}
            marginTop={10}
            onChangeText={(text) => setUsername(text)}
            editable={false}

          />
          <Input
            placeholder="Password"
            value={password}
            marginTop={34}
            onChangeText={(text) => setPassword(text)}
            Pass={true}

          />
          <Input
            placeholder="Confirm Password"
            value={cpassword}
            marginTop={34}
            onChangeText={(text) => setCpassword(text)}
            Pass={true}

          />
          {/* <Button title="Go ->" marginTop={48} onPress={() => CheckAuth()} /> */}
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
            onPress={() => CheckAuth()}
          >
            {/* <Text style={styles.texts}>{item.category_name}</Text> */}
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: COLORS.font,
              }}
            >
            {"Go ->"}
            </Text>
          </TouchableWithoutFeedback>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 18,
              marginTop: 24,
              color: COLORS.font,
            }}
          >
            Already have an account |
            <Text
              style={{ color: "red" }}
              onPress={() => navigation.navigate("SignIn")}
            >
              Login
            </Text>
          </Text>
        </Animatable.View>
      </LinearGradient>
    </LinearGradient>
  );
}
