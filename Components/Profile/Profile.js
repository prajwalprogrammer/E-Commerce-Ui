import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../Assets/theme";
import * as Animatable from "react-native-animatable";
import { GetUserDetails, UpdateUser } from "../Dashboard/AxiosUrl";
import AsyncStorage from "@react-native-community/async-storage";
import Input from "../Input/Input";
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
  const [UserProfile, setUserProfile] = React.useState();
  const [Id, setId] = React.useState();
  const [UserName, setUserName] = useState();
  const [Phone, setPhone] = useState();
  const [Email, setEmail] = useState();
  const [Address, setAddress] = useState();
  const [AccountStatus, setAccountStatus] = useState();
  const [SalesId, setSalesId] = useState();
  const [SalesEx, setSalesEx] = useState();
  const [image, setImage] = useState(
    `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBEUFBEREREQERERERQRERAREBAREBEQFxMYGRcUGRcaISwjGhwpIBcXJDckKC0vMj8yGSI4PTgxPCwxMi8BCwsLDw4PHRERHDEoIyQzMTE0MTExMTExMTEzMzEzMzExMTExMjExMTMxMTE8LzExMTExMTEvMTExMTE0MTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAMFBgcIAgH/xABHEAACAgACBQcGCgkDBQEAAAABAgADBBEFEiExQQYTIlFSYXEHMoGRkqEjQmJyc4Kxs8HwFDM0NUN0osLRU2OyVKPD4fFE/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAECAwQFBv/EADURAAIBAgQCCQEGBwAAAAAAAAABAgMRBBIhMVFhBUFxgZGhwdHwsQYTIiMy4SVCUrLC0vH/2gAMAwEAAhEDEQA/ANzREQBERAEREAREQBESwcpOVeEwKjn3zsYZpQmRtfvy4DvOUAv8x3lByy0fgs1vxC84P4Ffwl3d0Bu9OU1lpryj4u/WWphhqyCAtZzsy77N+fhlNUBjrEsSWJJJJzJOe0kwDed/lXLnLDYXVXg975t7CbB7UtuM5daRYZrclfdXUn92c17oyzdL4NqwClpHlzpdTmuOuHcFqy/4ylgfKfplDtxYsHVbTSw9yg++WrSte+WBdjQDdWhPKtiDkMRh6retqi1LeOR1gfdM90TyvweIyAsNTndXdkhJ7jnkfXOd9GPumS0nNYJOhYmhtE8vcVo91V9bEYXPJqXY69a5763O7LsnZ4b5uXQWmsPjKVxGGsD1tsPB0birr8Vh+dkEF0iIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiRNIY2uiq2+w6tdNbWOepVUk5dZ2boBi3lD5aJo6oJXk2MuB5lDtVF3G1x1A7hxPgctAYrH2Wu9t1jW22HWexzmzH88N0+8otO243E24q0nWsbornmK6xsRB3Ae/M8ZbOcgE3npCvXJs+B2xzk+M2e+AXbRj7pklBzExLR9gzG2ZVg22QC26UTfMYtGTTMNIpsMxPFrkYBctGvumU4Ntkw7R77RMqwDbBBJB5QVbCZH5E8qrtHYgWoWapiFvpz6NtfcODDeD6NxMummUzWYS4yY+MEHXmjcbXfVXiKmD1WoHRhxU/YeBHWJMmnvIjp8/C6Psbo5G/D5ncc/hUHdtDelpuGAIiIAiIgCIiAIiIAiIgCIiAIiIAmt/LdpU1YBKFOTYq5UORyPNp0294QembImlPLkS+JwlXCvDvZl3vZl/44Bp6Jcv0E9UfoJ6oBbc5lPIXk22NvzYH9HoysubgRn0a/Fj7gZC0doK2+xKKV1rHOQ6lHFmPACdBcmeT1WDwy4avaSC1lmWTWWMNrn3AdwEx1JWVluZaUbyUnsc4HNbbFIyIsYEbsiCcxMl0bZmBHlH0E2GxbWhcqcQxcEDYtn8RPHPpfW7jIOird0tCSlFNFZxcZNMn6STZmJieLJzyPrmbYlc1mIaSryJlihTwgIIPDr4TKdGvumOaNs25TJ8JSN67Pk8PRAJOOXNDMGxq5OZn7jNSJhOmEyf0wSy88hNIGjG4O0bheiN8yw823uYzqGcg4G3VZW7JDeo5zrqps1U9ag+sQQVIiIAiIgCIiAIiIAiIgCIiAIiIAmovKrh9bGVk/8ASoP+5bNuzVvlbOpbhrDuep0z70bP++Aa/wD0QdUr4TRTWOK611mPqA4kngJ5wbtbYlVQ1nc5KPtJ6gN+c2ryd0KlCD4zHazEbXb8FHATFUqZdFuzNSpZ9XsvlhyU5OVYRM8g1zga7kbT3Dq8JkgnhZ7EwIzy5Fp5R6ApxlT1WrmGHDY2Y3Mp4MP/AEZpTSfJnE4Gwh1NlGfRvVTq5dTj4h8dnUZ0KJRxGFRxkw4ZZ8cvxl1eLvHw+fORV5ZK0vH5uaY0Xo5r6rWqOtZXkTXxasjeO/P7Zh+mqCCcwQQSCCMiD1ETf1PJquq0X0KittBAzRXU71ZR0SD4S18reQ1OLUumdVxHnLkTn1MPjj398lVXfVP290VdBNaNX+vs/I5+wrZNMu0XbsEt2muSGOwhJepnrB/W1BnTLrYb19Ikzk9h2sRmqIsavbZUv6wJwdR8YcDltGzrmZTi1dMwuEk7Na/PHuLlir+b6RGanzhxHeJjGnEB6SkEHaCNxEyfELrVnwmH3MQXqO7aU7jxEsUIeHGfR69nr2TsDDrkqDqVR6hOS+T2H5zF4WnLPncTTXl86xQZ1zAEREAREQBERAEREAREQBERAEREATXXlqwBfALiFz1sLcrnL/TfoN7yh9E2LIWlcAmIpuw9gzS6tqm68mUjMd4zzgGl/JNgddbsS28uMPXs81QAzkeOaj6s2usxLkPop8JT+j2j4Sq64MeDdM5MO4jIzLFM58pXnJnTjG1OKXC/iV1MqAyiplRTLpmOSKoM9SmDPQMumY2j3nPJM+T4TJuLHixFbzgD4iW5tD4bXFgpUWDc4Vdb15Zy4kzwxmOSTMkXJbMxfTfJaq3WZOg53lRvPevH7ZqnlHyNx1b69dJuUHzqumfSvnD1TfLGRMUBkTkM9m3jvlVVlDbbmXdKFR/i34r5Y0r5J9GNbpWnNSBhxZdYCDmpVSqg9R12X1TpKYPyE5PCi/SOLK5HE3KK/owgdz6XdvYmcTei7pM50llbXARESSBERAEREAREQBERAEREAREQBERAMc0kmpdnwbJvXsM+qZO01h9ZA43pv+ad8tlT5gH1+M59WOWo+ep06Ms9JctCSplVTI6tKitITEolcGfQZSDT0GmS5jcSpnPhM8a0+FouRlPTGUmMFpTLSjZkSDGRcUdg8c/QJXYyhXVzlipwz2/NG0/4mNpyeXiZU1FOT6tS+6Lq1akB3kax8Sc5NnwCfZ1LWOS3d3YiIggREQBERAEREAREQBERAEREAREQDyyggg7QdhExm6s1OVPmnap7uBmUSDpHBixch5y7VP4TDXp546bo2MNVUJWls9/ctAM9q0i12ZHVbYQcvSOErTQTOg42K4M+60ohp9DS2YplK2tPhaU9aeS0nMMpULSmWnwmeGYDaZVssony18h3ndLpobCai67ec27uWQ9G4M2NzjjoDcO0erwmQzYw1P8Anfca2Kq2X3a7/YRETcNEREQBERAEREAREQBERAEREAREQBESjdciKXdlRRtLOwVQO8nYIBWlm0jpgVsqqAc35ssTuOW0gcQDkD3mR7eVOGY6lDtaW2C5K3bDKTx53LUbwUkzFcbiecfWGequxM94AO895O095ghq5ecRnrFjtDEk9xJn2u/gdv2ylVdrKD1rt8eIlN1HHaPevpmLGYLL+bT26+XPs+nZtfo7pLN+RW32T48u3hx233uAtU8cvGegw6xLJbXcNtVv1bFDj17/AHyHZiceu6nD2d4Z0/zOcu47DtzMonk2AcRMVXH6QP8A+ale82uZXrXGv59tNQ6qq829bEybPkRePPwL9ZiQBnuHWdgkXXLHZnt4nZ/8EjV4YKQSWsftOxbLvA3D0SYmzvJ3n88Js4XCSru7/Suv2+aGljcfDDRsv1PZer+alzp0vzSBWUMEXPYcjkMs/Ttl8w9yuquhzVwGB7jME0hb0T8o6g+au1veVH1ZJ0Hp9cOrJcLWrzzU1VWXMhO/oICxHHYDN+aipWjsjn0XJwUpO7epnESDo/SmHvBNF1VoGxgjqzKepl3qe4ydKGQREQBERAEREAREQBERAERPhMA+y06V09hsNktj52sM0orU2XuOsIu0L8o5KOJEwTln5SUrDV4SwKm1TiVCu9rDYVw4PRyHG1s14AMd2nNKafuu1xrGuuxtZ1VmZ7W7Vth6VjeJy6gIBtjlB5U9XNa3Sn5FITE4nuzsJ5ms9YHOzXelOXGItbWVQGzBFt7HF3AjivOfB1/URZicQDLeSOlrrMfS11ttrOHTOx2fLNSchnuGzcJssiaa5OXamKwzf7yD0M2qftm5n3nxgEvBW5Ar1dISVzktlbZEH85Stzk6eEeaFuBweko/d1b9Utff5zJgs/PVKmtLfzkq1X5bDObj+jnFOrSWnWvVeq6t1pt1+iumFNqhXevVLjyfPg+vZ67y855Z8vH3Slbbl4+6R+c/PHxM1cDgZYh5paRXnyXr7m70n0pDCLJHWb6uHN+i693oS1fL/PGDYeG08B1ngJD5yVqHy1rOwNYfPOxfxPonoJxjRp6KyWy+h5SlKWJrpSd23q/r87EUcc/T1QcxWNTPrI84+k5zEuXmJNeF6LMrNciqykggjNthG7zZkkwrylW5V0J2rWf2Vy/unIPTGOYTlbi0Kmxlv1RkrXBueUfJvQravoeZ1oLyp2Lkr2sv+3i87qu4LegFieLrZ4zUsQQdS6G5ZYW/UV2FFlhyrDujU2nbsquUlHOzzcw3WomTzkDAaStp1ubbovssrYB6rB1Oh2NNm8ivKPZWVqfWsr2A4ZmLOo68O7HM/ROT8ltmUA3lEg6L0jTiakuocWVuNhGYII2FWB2qwOwg7QRJ0AREQBERAEREATU3ld5Yamto6onLUVsWVbIuH83DZjaAR0m+SQOJm2Zydyvxb247Gu5zJxV3qVyqj0BQIBa8TiHdi7nMnZ1AAblA4AdUpKpMImcn0UQCOuHlQYaXBKJWFEAtSIUKuN6MHH1Tn+E3WzZ5HrAPumqWw82bo99amhuupM/HVGcAkzwz5fZPUpX7B/T6TNrB1MlVJ7PT2NDpOi6uHbW8dV6+XnY9G3LaTkBvMsGkcfiNcarc1VkpXYQzg55MTw3bpecLhzc+r/DU9I9oj4vhPPK3CdGpkUnVzQ6qk7Msxnl4mbeNnLI8jtY1vs7hqVTGQhXinnTsnqlo2tNtbefMs12k8S+oK2CEZbPO1znxz3y+0Xsc1cati7HXhn1j5Jlk5P0k4ivWBAUl9oORK7QPsmU6XwJPwtY6a7x2hxBmDASai29trHS+1OFpU60KcIpSy5r8buyTfc+a7CLzkmX9FK6+J+Ff6w6I9W360g6MAsdc/NGbP1hAM2z9UkX2F2Zj8Y5+A4CXx9RXUF2+3zmcroag0pVZLku7fz07meJgHlFOtZh07NTN7TZf2zP5gPK4a+Kb5FaL7tb+6c47Zh/6NPJw8vHMTw9EAsjIRPMudtEgWplAM88n3LV8JeptcmiwqmKB3MpyVcR89NmZ4rv2gTolWBAIOYIzBG4iccK2XvHoIynU/k/xbW6NwFjkljQqknedTNM/6YBkcREAREQBERAE5F5R/teM/mr/AL1p11ORuUP7Zi/5q/71oBHwyS60VyFhVl3w6QCpXVKy1SpWkkKkAiGqZboXG1CmpGsRWQEZM6qcs9m/umPFJTdIBnCWKfNZT4MD9k9MuYIO4zHuTfJxbSb8RmmFrbblsa9x/DT8TMmxFgZiQqouwKi7FVQMgBBJcsJWiouoMgRnKOlj8E/eRPWjrM1K9RzHzT+TPGl/1Xiwm/Wnmw7fZ9UaPRFLL0rTi+pv+128iz6K2WqOtgPXsmSkTGsDssrPy1/5TJGbIE9UpgX+B9vp+x0PtZG+JpS4xt4Sf+xBurStbCoAa0hM+OzJm+1R65BLAbyB4nKS8e/S1ewNX629j7RMsGmtErcusuQtUdE8GHZP+Zqzlmk5cTDShkgo8Cc+MpXzrah42L/mYXpUiy61wQQX2EbiAAAfdKYpKkqQQQciCMiDKgSVLkTmpTeqTykpukAtN1ctmJrl9uSWvErALOROoPJh+6sB9E33jzmG4bZ095MP3VgPom+8eAZXERAEREAREQBORuUH7ZjP5q/71p1zORuUP7ZjP5q/71oB7wsu2HlmwrS74d4Bcq5IWRK3khXgFWSdGUV2W1paWFZPS1ctYgfFHVImtPgcggg5EEEHqIgGeYrEa+qqqK6qxq1VL5qIPtPWZQkfA4oWIrjjsYdTDeJIgkkYKzJx1Hon07pX0v8Aqx4/5kGTdIPrV1nryP2zI5/kuPNGXo+l/EadTlLy/wClqqGTA9RH2zIHfLadygufAbv6issajaJcsXZ0Pn5D6qjM/wBR/pkUZ5ac1xt6m70/Sz1aE/6c/wDg15kAnPad52xEShzSz6fwyaot3PmF2fH7j4dcsQEm6ZxvOWaqnoV5gdRbifw9EgBoIPplJ57ZpRd4BFvlrxMuNzy14loBa8RvnTnkw/dWA+ib7x5zDcds6e8mH7qwH0TfePAMriIgCIiAIiIAnIvKP9rxn81f96066nIvKP8Aa8Z/NX/etAKGGeXXD2Swo+Un0XQC/V2SQlks9d8kJfALoLJ8NkgC6DdAL5ofSXNWZMfg32N8k8G/PCZgDNYtbMl5L6bByw9rbd1LHj/tnv6vV1QDKpWLZoq9lj6j+TKMqVb5EtjcwM8mIjz08TzlKuL2EJ2FC/W3t7yZ7qUFlB3Z5nwG0+4GRnfMljvJJ9ZkRNrpWpecYcFfx/Y+Sz6f0kK15tT8JYOG9E7XieElaW0kmHrNj7WOytM9rv1eHWZr+7GNY7WOc2Y5k/gO6WOUTFeeuckAXT7z0EExrJReyRmulB7oB7uslsxNkqXXSBc+cApkzqDyYfurAfRN9485enUPkw/dWA+ib7x4BlcREAREQBERAE5F5R/teM/mr/vWnXU5J5Q0ucXjCEYj9Kv2hT/qtALTPSuRPXMP2H9kxzD9h/ZMArJiJXTEyFzD9h/ZM+imzsP7LQC4jEz7+kS3c1Z2H9lp95u3sP7LQCccRKbYjjnkRtBByIPXInNWdh/ZafDTZ2X9kwDZfJTlKLwKbmAvUdFtwuUf3jiPT4ZSh2iaNSuwEMFcEEEEBgQRuIM2Fyb5Wc4FpxYKWbluIISz53Zbv3HugmMnF3XUZ2dgc9SEDxYgfZrSz6U0jXh6zba2QGxVHnO3BVHEz5p/lBThkOtm9jZFa02u2QO/qGZO37ZqnTGkMRinNlobZsVADqIvUB+MhGxi5560n800K2k9MWYiw22HLgiA9GtOCj8Txkdb5B5izsP7LQKbOy/smSaxcRiJ8OIkDmrOw/stHNWdl/ZMAltiZRfESjzNnYf2WnzmH7D+yYB8awmeJU5h+w/smOYfsP7JgFOdQ+TD91YD6JvvHnMXMP2H9kzp3yZDLRWAB2Hmm2H6R4BlcREAREQBERAEjNvPjEQD5ERAEREAREQBERAEpNPkQWiFlVJ8iB1HqIiCoiIgCIiAIiIAkhNwiIB6iIgCIiAf/9k=`
  );

  const [date, setDate] = useState(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
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
        // setImage(res.Image);
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      //alert(result.uri)
      setImage(result.uri);
    }
  };
  const onChange = (event, selectedDate) => {
    //alert(moment(selectedDate).format('lll'))
    //alert(selectedDate)
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setSalesEx(currentDate);
  };
  const Updateuser = async () => {
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
      image
    ).then((res) => {
      alert(res);
      setTimeout(() => {
        if (!AccountStatus) {
          Logout();
        }
      }, 2000);
    });
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
              Id:{" "}
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
              onChangeText={(text) => setPhone(text)}
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
