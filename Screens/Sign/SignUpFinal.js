import React from "react";
import {
  View,
  ImageBackground,
  StatusBar,
  Dimensions,
  Text,
  Image,
} from "react-native";

const { height, width } = Dimensions.get("window");

export default function SignUpFinal() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(21, 21, 21, 0.79)",
        padding: 5,
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(21, 21, 21, 0.79)"
      />
      /*<ImageBackground
        source={require("../../Assets/picture.png")}
        style={{
          height: height * 0.542,
          width: width * 0.93,
          alignSelf: "center",
          marginTop: height * 0.16,
        }}
      />*/
      <View
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          top: height * 0.26,
          left: width * 0.07,
        }}
      >
        /*<Image
          source={require("../../Assets/mwc-title.png")}
          style={{
            height: height * 0.032,
            width: width * 0.203,
            alignSelf: "center",
            marginTop: 34,
          }}
        />
        <Image
          source={require("../../Assets/mwc-text.png")}
          style={{
            height: height * 0.019,
            width: width * 0.46,
            alignSelf: "center",
            marginTop: 13,
          }}
        />*/
        <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 15 }}>
          Dear Customer,
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: "green",
            fontWeight: "300",
            marginTop: 10,
          }}
        >
          We will review your {"\n"}information and get{"\n"}back to you at
          {"\n"}our earliest
        </Text>
        <Text style={{ fontSize: 14, marginTop: 10 }}>
          Thanks For Signing Up!
        </Text>
      </View>
    </View>
  );
}
