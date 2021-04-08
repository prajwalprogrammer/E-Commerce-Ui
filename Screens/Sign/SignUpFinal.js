import React from "react";
import * as Animatable from "react-native-animatable";
import Text from '../../Components/Dashboard/MyText'
import {
  View,
  ImageBackground,
  StatusBar,
  Dimensions,
  
  Image,
  BackHandler,
  ScrollView,
} from "react-native";
import { COLORS } from "../../Assets/theme";

const { height, width } = Dimensions.get("window");

export default function SignUpFinal() {
  var Message = ` We will Review the information you have provided and  get back to you at our earliest. `;
  React.useEffect(() => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      () => BackHandler.exitApp(),
      true
    );
    return () =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        () => BackHandler.exitApp(),
        true
      );
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "#000000" }}>
      <Image
        source={require("../../Assets/Banner.png")}
        style={{
          width: 350,
          height: 370,
          marginTop: 130,
          marginLeft: 20,
          justifyContent: "center",
          alignSelf: "center",
        }}
      />

      {/* {isdelivery ?<> */}
      <View
        style={{
          position: "absolute",
          top: 220,
          left: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Dear Customer,</Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 260,
          left: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "900" }}>Thanks for Signing Up,</Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 300,
          left: 40,
          justifyContent: "center",
          alignItems: "center",
          width: 180,
        }}
      >
        <Text>{Message}</Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 380,
          left: 40,
          justifyContent: "center",
          alignItems: "center",
          width: 180,
        }}
      >
        <Text>Please reach out to us 216-712-5054.</Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 430,
          left: 40,
          justifyContent: "center",
          alignItems: "center",
          width: 180,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Thank you and have a great day !
        </Text>
      </View>
      <Image
        source={require("../../Assets/Tick.png")}
        style={{ width: 180, height: 180, marginLeft: 120 }}
      />

      {/* </>:<></>} */}
    </ScrollView>
  );
}
