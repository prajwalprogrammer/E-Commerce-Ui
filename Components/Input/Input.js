import React from "react";
import { TextInput, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default function Input({ placeholder, value, onChangeText, marginTop }) {
  return (
    <TextInput
      placeholder={placeholder}
      style={{
        fontSize: 18,
        fontWeight: "300",
        backgroundColor: "#6F6F6F",
        width: width * 0.82,
        height: 34,
        borderRadius: 10,
        marginTop: marginTop,
        alignSelf: "center",
        paddingLeft: 27,
        color: "#BDBDBD",
      }}
      placeholderTextColor="#BDBDBD"
      value={value}
      onChangeText={onChangeText}
    />
  );
}
