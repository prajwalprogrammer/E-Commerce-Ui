import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import Text from '../Dashboard/MyText'
const { height, width } = Dimensions.get("window");

export default function Button({ title, onPress, marginTop }) {
  return (
    <TouchableOpacity
      style={{
        height: 42,
        width: 212,
        borderRadius: 10,
        backgroundColor: "#495BFF",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: marginTop,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
