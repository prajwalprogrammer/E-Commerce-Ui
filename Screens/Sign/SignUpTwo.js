import React, { useState } from "react";
import {
  View,
  Dimensions,
  Image,
  StatusBar,
  TextInput,
  Text,
} from "react-native";
import moment from "moment";

import Input from "../../Components/Input/Input";
import Button from "../../Components/Input/Button";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
import { SignUp } from "../../Components/Dashboard/AxiosUrl";
import { COLORS } from "../../Assets/theme";
import DateTimePicker from "@react-native-community/datetimepicker";

import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
export const SignUpTwo = ({ navigation, route }) => {
  //alert(route.params.useName)
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [upload, setUpload] = useState("");
  const [TaxId, setTaxId] = useState("");
  const [TaxExpire, setTaxExpire] = useState("");
  const PassToAxios = async () => {
    // alert("fdf")
    await SignUp(
      route.params.useName,
      route.params.password,
      name,
      address,
      email,
      phone,
      TaxId
      // date
    ).then(async (res) => {
      if (res === "ERROR!") {
        alert("Unable To SignUp,Try Again");
      } else if (res === "SUCESS!") {
        //alert("Sucessfull");
        await AsyncStorage.setItem("UserID", `${username}`);

        navigation.navigate("FinalPage");
      } else {
        alert("Something Went Wrong!");
      }
    });
  };
  const onChange = (event, selectedDate) => {
    //alert(moment(selectedDate).format('lll'))
    //alert(selectedDate)
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  return (
    <LinearGradient
      colors={[COLORS.black, "#202020", "#474747"]}
      style={{ flex: 1 }}
      start={{ x: 1.5, y: 0.5 }}
    >
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black1} />
        <View
          style={{ flex: 0.7, alignSelf: "center", justifyContent: "flex-end" }}
        >
          <Text
            style={{ fontSize: 40, fontWeight: "bold", color: COLORS.font }}
          >
            Company Details
          </Text>
        </View>
        <LinearGradient
          colors={["#333333", "#202020", "#191919", COLORS.black]}
          style={{
            height: height * 0.85,
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
        /> */}
            <Input
              placeholder="Business Name"
              marginTop={30}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Input
              placeholder="Business Address"
              marginTop={30}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <Input
              placeholder="Email Id"
              marginTop={30}
              value={email}
              onChangeText={(text) => setEmail(text)}
              Capital="none"
            />
            <Input
              placeholder="Phone Number"
              marginTop={30}
              value={phone}
              onChangeText={(text) => setPhone(text)}
              Num="numeric"
            />
            <Input
              placeholder="Sales Tax Id"
              marginTop={30}
              value={TaxId}
              onChangeText={(text) => setTaxId(text)}
              Num="numeric"
            />
            {/* <Input
        placeholder="Sales Tax Expire Date"
        marginTop={30}
        value={moment(date).format("lll")}
        onChangeText={(text) => setTaxExpire(text)}
        editable={false}
      /> */}
            {/* <View
                // style={{
                //   marginLeft: -21,
                //   position: "absolute",
                //   justifyContent: "flex-end",
                //   alignSelf: "flex-end",
                //   right: 44,
                // }}
              > */}
            {/* <TouchableWithoutFeedback  style={{}} style={{
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginTop: 27,
                  //backgroundColor: COLORS.primary,
                  width: "80%",
                  marginHorizontal: 44,
                  borderRadius: 12,
                  paddingVertical: 5,
                  right: 2,
                  // position: "relative",
                  bottom: 66,
                }}> */}
            {/* <FontAwesome
        onPress={() => setShow(!show)}
        name="clock-o"
        size={30}
        color={COLORS.font}
        style={{
          right: 30,
          bottom: 40,
          justifyContent: "flex-start",
          alignSelf: "flex-end",
        }}
      /> */}
            {/* </TouchableWithoutFeedback> */}
            {/* </View> */}
            {/* <Button title="Show Date" onPress={()=>setShow(!show)} /> */}
            {/* {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )} */}
            {/* <TextInput
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
        /> */}
            <TouchableWithoutFeedback
              style={{
                zIndex: 1,
                marginTop: 40,
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
              onPress={() => PassToAxios()}
            >
              {/* <Text style={styles.texts}>{item.category_name}</Text> */}
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: COLORS.font,
                }}
              >
                Submit
              </Text>
            </TouchableWithoutFeedback>

            {/* <Button
            title="SUBMIT"
            marginTop={height * 0.052}
            onPress={() => navigation.navigate("Dashboard")}
          /> */}
          </Animatable.View>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
};
export default SignUpTwo;
