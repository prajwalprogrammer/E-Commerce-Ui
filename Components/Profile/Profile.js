import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../Assets/theme";
import * as Animatable from "react-native-animatable";
import { GetUserDetails, UpdateUser } from "../Dashboard/AxiosUrl";
import AsyncStorage from "@react-native-community/async-storage";
import Input from "../Input/Input";
import Text from '../Dashboard/MyText'
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { StatusBar } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Image, Platform } from "react-native";
import {UploadImage} from '../firebase'
import { CartContext } from "../GlobalContext/CartProvider";

const TextField = ({ name }) => {
  return (
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
      {name}
    </Text>
  );
};

const Profile = ({ navigation }) => {
  const [URL, setURL] = React.useState('')

  const [UserProfile, setUserProfile] = React.useState();
  const [Id, setId] = React.useState();
  const [UserName, setUserName] = useState();
  const [Phone, setPhone] = useState();
  const [Email, setEmail] = useState();
  const [Address, setAddress] = useState();
  const [AccountStatus, setAccountStatus] = useState();
  const [SalesId, setSalesId] = useState();
  const [SalesEx, setSalesEx] = useState();
  const [image, setImage] = useState();

  const [date, setDate] = useState(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const { Profile,setProfile } = React.useContext(CartContext);

  React.useEffect(() => {
    const fetchData = async () => {
      setId(await AsyncStorage.getItem("UserID"));
      setUserProfile(
        await GetUserDetails(await AsyncStorage.getItem("UserID"))
      );
      await GetUserDetails(await AsyncStorage.getItem("UserID")).then((res) => {
        setUserName(res.AccountName);
        setPhone(res.Contact[0].PhoneNumber);
        setEmail(res.Contact[0].EmailId);
        setAddress(res.Contact[0].Address);
        setSalesId(res.STD.Sales_Id);
        setAccountStatus(res.isActive);
       setImage(res.STD.Sales_Tax_Link);
      });
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
    fetchData();
  }, []);


  const pickImage = async () => {
    //alert(image)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
     // allowsEditing: true,
     // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      await UploadImage(result.uri, Id,Profile).then(async()=>setProfile(await GetUserDetails(await AsyncStorage.getItem("UserID"))))
       setImage(result.uri);
      // setImage(result.uri)
      // console.log(response)
     //alert(response)
    }
  };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setSalesEx(currentDate);
  };
  const Updateuser = async () => {
    await GetUserDetails(await AsyncStorage.getItem("UserID")).then(async(res)=>{

    console.log("Link"+res.STD.Sales_Tax_Link)
    await UpdateUser(
      Id,
      AccountStatus,
      UserName,
      UserProfile.AccountSince,
      Address,
      Email,
      Phone,
      SalesId,
      UserProfile.Password,
      image,
      res.STD.Sales_Tax_Link,
      res.STD.Sales_expire_Date
    ).then(async(res) => {
     // alert(res);
     setProfile(await GetUserDetails(await AsyncStorage.getItem("UserID")))
      setTimeout(() => {
        if (!AccountStatus) {
          Logout();
        }
      }, 2000);
      navigation.navigate("Dashboard")
    });})
  };
  const Logout = async () => {
    await AsyncStorage.clear().then(() => navigation.navigate("Auth"));
  };
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: COLORS.black }}>
      <StatusBar backgroundColor={COLORS.black} />
      <LinearGradient
        colors={[COLORS.black, COLORS.black1, COLORS.black1]}
        style={{}}
      >
        <View
          style={{
            //flex: 4,
            // alignItems: "center",
            // justifyContent: "center",
            // marginTop: "10%",
            height: "20%",
          }}
          animation="fadeInDownBig"
        >
          <View style={{ alignSelf: "center", marginTop: 10 }}>
            <Text
              style={{ fontSize: 30, fontWeight: "bold", color: COLORS.font }}
            >
              Profile
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              alignSelf: "flex-start",
              paddingTop: 20,
              left: 10,
              flexDirection: "row",
            }}
          >
            <Text style={{ color: COLORS.font, alignSelf: "center" }}>
              Id:
            </Text>
            <Text
              style={{ color: COLORS.font, fontSize: 20, fontWeight: "bold" }}
            >
              {Id}
            </Text>
          </View>
          <TouchableWithoutFeedback
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={pickImage}
          >
            {/* <Text style={{color:"white"}}>giiii</Text> */}
            {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 50,
                  borderColor: COLORS.white,
                  borderWidth: 3,
                }}
              />
            )}
          </TouchableWithoutFeedback>
        </View>
        {UserProfile ? (
          <LinearGradient
            colors={[COLORS.black1, COLORS.black, COLORS.black]}
            style={{
              //flex: 8,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              paddingBottom: 20,
            }}
            animation="fadeInUpBig"
          >
            <TextField name="Business Name" />
            <Input
              placeholder="Username"
              //marginTop={}
              value={UserName}
              //value={UserProfile.Contact[0].PhoneNumber}
              onChangeText={(text) => setUserName(text)}
            />
            <TextField name="Phone Number" />
            <Input
              placeholder="Phone Number"
              //marginTop={}
              value={Phone}
              //value={UserProfile.Contact[0].PhoneNumber}
              onChangeText={(text) => setPhone(text)}
              Num="numeric"
            />
            <TextField name="Email ID" />
            <Input
              placeholder="Email"
              //marginTop={10}
              value={Email}
              //value={UserProfile.Contact[0].EmailId}
              onChangeText={(text) => setEmail(text)}
            />
            <TextField name="Address" />
            <Input
              placeholder="Address"
              //  marginTop={10}
              value={Address}
              //value={UserProfile.Contact[0].Address}
              onChangeText={(text) => setAddress(text)}
            />
            <TextField name="Account Since" />
            <Input
              placeholder="AccountSince"
              // marginTop={10}
              value={UserProfile.AccountSince}
              // onChangeText={(text) => setUsername(text)}
              editable={false}
            />
            <TextField name="Account Status" />
            {/* <TouchableWithoutFeedback onPress={() => setAccountStatus(!AccountStatus) }> */}
            <>
              <Input
                placeholder="Status"
                // marginTop={10}
                value={AccountStatus ? "Active" : "InActive"}
                onChangeText={(text) => setAccountStatus(text)}
                editable={false}
              />
              {/* <MaterialIcons name="published-with-changes" size={24} color="black" /> */}
              <MaterialIcons
                onPress={() => setAccountStatus(!AccountStatus)}
                name="published-with-changes"
                size={25}
                color={COLORS.font}
                style={{
                  right: 40,
                  bottom: 40,
                  // position:"relative"
                  justifyContent: "flex-start",
                  alignSelf: "center",
                  marginBottom: -30,
                }}
              />
            </>
            {/* </TouchableWithoutFeedback> */}
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
              Num="numeric"
            />
            <TouchableWithoutFeedback
              onPress={() => Updateuser()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 27,
                backgroundColor: COLORS.primary,
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
            <TouchableWithoutFeedback
              onPress={() => Logout()}
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
                Logout
              </Text>
            </TouchableWithoutFeedback>
          </LinearGradient>
        ) : null}
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Profile;
