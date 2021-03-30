import React from "react";
import * as Animatable from "react-native-animatable";

import {
  View,
  ImageBackground,
  StatusBar,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { COLORS } from "../../Assets/theme";

const { height, width } = Dimensions.get("window");

export default function SignUpFinal() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
        padding: 5,
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.black}
      />
      {/* /*<ImageBackground
        source={require("../../Assets/picture.png")}
        style={{
          height: height * 0.542,
          width: width * 0.93,
          alignSelf: "center",
          marginTop: height * 0.16,
        }}
      /> */}
      <Animatable.View animation="bounceIn"
        style={{
          backgroundColor: "#ffff",
          position: "absolute",
          top: height/3,

          left: width * 0.1,
          alignItems:"center",
          justifyContent:"center",
          borderRadius:15,
          height: 250,
          width: 300
        }}
      >
        {/* /*<Image
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
        />*/}
        <Text style={{ fontSize: 25, fontWeight: "500", marginTop: 8 }}>
          Dear Customer,
        </Text>
        <Text
          style={{
            fontSize: 19,
            color: "green",
            fontWeight: "300",
            marginTop: 10,
          }}
        >
          We will review your {"\n"}information and get{"\n"}back to you at
          {"\n"}our earliest
        </Text>
        <Text style={{ fontSize: 19, marginTop: 10 }}>
          Thanks For Signing Up!
        </Text>
      </Animatable.View>
    </View>
  );
}
