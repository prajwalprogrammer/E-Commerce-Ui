import React from "react";
import { TextInput, Dimensions } from "react-native";
import { COLORS } from "../../Assets/theme";

const { height, width } = Dimensions.get("window");

export default function Input({ placeholder, value, onChangeText, marginTop,editable=true,Pass=false }) {
  return (
    <TextInput
      editable={editable}
      placeholder={placeholder}
      style={{
        fontSize: 18,
        fontWeight: "bold",
       // backgroundColor: ,
        width: width * 0.82,
        height: 43,
       // borderRadius: 10,
        marginTop: marginTop,
        alignSelf: "center",
        paddingLeft: 19,
        color: COLORS.font,
        borderBottomWidth:1,
        borderBottomColor:COLORS.font
      }}
      secureTextEntry={Pass}
      placeholderTextColor={COLORS.gray}
      value={value}
      onChangeText={onChangeText}
    />
  );
}
