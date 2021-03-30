import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../Assets/theme";
import * as Animatable from "react-native-animatable";
import { GetUserDetails } from "../Dashboard/AxiosUrl";
import AsyncStorage from "@react-native-community/async-storage";
import Input from "../Input/Input";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const Profile = () => {
  const [UserProfile, setUserProfile] = React.useState();
  const [Id, setId] = React.useState();

  const [Phone, setPhone] = useState();
  const [Email, setEmail] = useState();
  const [Address, setAddress] = useState();
  const [AccountStatus, setAccountStatus] = useState();
  const [SalesId, setSalesId] = useState();
  const [SalesEx, setSalesEx] = useState();
  React.useEffect(() => {
    const fetchData = async () => {
      setId(await AsyncStorage.getItem("UserID"));
      setUserProfile(
        await GetUserDetails(await AsyncStorage.getItem("UserID"))
      );
      await GetUserDetails(await AsyncStorage.getItem("UserID")).then((res) => {
        setPhone(res.Contact[0].PhoneNumber);
        setEmail(res.Contact[0].EmailId);
        setAddress(res.Contact[0].Address);
        setSalesEx(res.STD.Sales_expire_Date);
        setSalesId(res.STD.Sales_Id);
        setAccountStatus(res.isActive);
      });
    };
    fetchData();
  }, []);
  const UpdateUser = () => {};
  return (
    <LinearGradient
      colors={[COLORS.black, COLORS.black1, COLORS.black1]}
      style={{ flex: 1 }}
    >
      <Animatable.View
        style={{
          flex: 1.5,
          alignItems: "center",
          justifyContent: "center",
          // marginTop: "10%",
        }}
        animation="fadeInDownBig"
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: COLORS.font }}>
          User Profile
        </Text>
        <View
          style={{
            justifyContent: "flex-start",
            alignSelf: "flex-start",
            paddingTop: 10,
            left: 10,
            flexDirection: "row",
          }}
        >
          <Text style={{ color: COLORS.font }}>Id: </Text>
          <Text
            style={{ color: COLORS.font, fontSize: 20, fontWeight: "bold" }}
          >
            {Id}
          </Text>
        </View>
      </Animatable.View>
      {UserProfile ? (
        <LinearGradient
          colors={[COLORS.black, COLORS.black, COLORS.black1]}
          style={{
            flex: 8,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingBottom: 20,
          }}
          animation="fadeInUpBig"
        >
          <ScrollView>
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 15,
                //fontWeight: "bold",
                alignSelf: "flex-start",
                marginLeft: 20,
                marginTop: 40,
              }}
            >
              Phone Number
            </Text>
            <Input
              placeholder="Username"
              //marginTop={}
              value={Phone}
              //value={UserProfile.Contact[0].PhoneNumber}
              onChangeText={(text) => setPhone(text)}
            />
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 15,
                //fontWeight: "bold",
                alignSelf: "flex-start",
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              Email id
            </Text>
            <Input
              placeholder="Email"
              //marginTop={10}
              value={Email}
              //value={UserProfile.Contact[0].EmailId}
              onChangeText={(text) => setEmail(text)}
            />
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 15,
                //fontWeight: "bold",
                alignSelf: "flex-start",
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              Address
            </Text>
            <Input
              placeholder="Address"
              //  marginTop={10}
              value={Address}
              //value={UserProfile.Contact[0].Address}
              onChangeText={(text) => setAddress(text)}
            />
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 15,
                //fontWeight: "bold",
                alignSelf: "flex-start",
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              Account Since
            </Text>
            <Input
              placeholder="AccountSince"
              // marginTop={10}
              value={UserProfile.AccountSince}
              // onChangeText={(text) => setUsername(text)}
              editable={false}
            />
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 15,
                //fontWeight: "bold",
                alignSelf: "flex-start",
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              Account Status
            </Text>
            <Input
              placeholder="Status"
              // marginTop={10}
              value={AccountStatus ? "Active" : "InActive"}
              onChangeText={(text) => setAccountStatus(text)}
            />
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 15,
                //fontWeight: "bold",
                alignSelf: "flex-start",
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              Sales Tax Id Number
            </Text>
            <Input
              placeholder=" Sales Tax Id Number"
              //  marginTop={10}
              value={SalesId}
              onChangeText={(text) => setSalesId(text)}
            />
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 15,
                //fontWeight: "bold",
                alignSelf: "flex-start",
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              Sales Tax Id Expiration Date
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Input
                placeholder="Sales Tax Id Expiration Date"
                // marginTop={10}
                value={SalesEx}
                onChangeText={(text) => setSalesEx(text)}
              />
              <FontAwesome name="clock-o" size={35} color={COLORS.font} />
            </View>
            <TouchableWithoutFeedback
              onPress={() => UpdateUser()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 27,
                backgroundColor: COLORS.secondary,
                width: "80%",
                marginHorizontal: 34,
                borderRadius: 12,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 25,
                  fontWeight: "bold",
                  marginHorizontal: 12,
                }}
              >
                Update
              </Text>
            </TouchableWithoutFeedback>
          </ScrollView>
        </LinearGradient>
      ) : null}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({});

export default Profile;
