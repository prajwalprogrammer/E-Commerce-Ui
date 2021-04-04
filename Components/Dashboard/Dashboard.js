import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Button } from "native-base";
import Carousel from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./Carousel";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Dashboard_profile from "./Dashboard-profile";
import Daily from "./Daily";
import DAily1 from "./Corousel1";

import { LinearGradient } from "expo-linear-gradient";
import { FONTS, SIZES, COLORS } from "../../Assets/theme";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Read, ShowData, DailyDeal, GetUserDetails } from "./AxiosUrl";
import AsyncStorage from "@react-native-community/async-storage";
import { CartContext } from "../GlobalContext/CartProvider";
const Packages = [{Displayname:"Stater",name:"starter"}, {Displayname:"Growth",name:"growth"}, {Displayname:"Rockstar",name:"rockstar"}];
const Dashboard = ({ navigation }) => {
  const [Loading, setLoading] = useState(false);
  const { Profile, setProfile, Prajwal, setPrajwal, setQ } = React.useContext(
    CartContext
  );
  const isCarousel = React.useRef(null);
  const [DATA, setDATA] = React.useState([]);
  const [value, onChangeText] = React.useState("Search");
  const [Visible, setVisible] = useState(null);
  const [DAILY, setDAILY] = useState([]);
  const [UserProfile, setUserProfile] = useState();
  React.useEffect(() => {
    setVisible(true);
    const fetchAPI = async () => {
      //  alert(await AsyncStorage.getItem("UserID"))
      setPrajwal(await AsyncStorage.getItem("countries"));
      setQ(await AsyncStorage.getItem("Quan"));

      setProfile(await GetUserDetails(await AsyncStorage.getItem("UserID")));
      setDATA(await Read());
      setDAILY(await DailyDeal());
    };
    fetchAPI();
    if (DATA) {
      setVisible(false);
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#4d4b50" />
      <LinearGradient
        colors={["#4d4b50", "#020001"]}
        style={{
          borderRadius: 15,
          margin: 5,
        }}
        start={{ x: 1, y: 0 }}
      >
        <View>
          <View style={{ ...styles.profile }}>
            <Grid style={{ justifyContent: "space-between" }}>
              <Row>
                <Col>
                  <Row style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableWithoutFeedback
                        onPress={() => navigation.navigate("Profile")}
                      >
                        <Image
                          source={
                            Profile
                              ? Profile.Image === null
                                ? require("../../Assets/download.png")
                                : { uri: Profile.Image }
                              : require("../../Assets/download.png")
                          }
                          style={{
                            width: 35,
                            height: 35,
                            margin: 5,
                            borderRadius: 100,
                          }}
                        />
                      </TouchableWithoutFeedback>
                      <Text
                        style={{
                          margin: 5,
                          color: "white",
                        }}
                      >
                        Howdy,{"\n"}
                        {Profile ? Profile.AccountName : null}
                      </Text>
                    </View>
                  </Row>
                </Col>
              </Row>
            </Grid>
          </View>

          <Button
            full
            rounded
            style={{
              backgroundColor: COLORS.lightGray,
              height: 35,
              width: "90%",
              alignSelf: "center",
            
            }}
            onPress={() => navigation.navigate("Search")}
          >
            <Text style={{ fontSize: 18,marginRight:"70%" }}>
              Search
            </Text>
          </Button>
        </View>
        <View
          style={{
            paddingBottom: 50,
            // backgroundColor: "#6a5acd",
            borderBottomRightRadius: 35,
            borderBottomLeftRadius: 35,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 4,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                margin: 5,
                color: COLORS.font,
                marginHorizontal: 10,
              }}
            >
              Daily Deals
            </Text>
            <MaterialCommunityIcons
              name="arrow-right"
              color={COLORS.font}
              size={25}
            />
          </View>
          {DAILY ? <DAily1 DAilyItem={DAILY} navigation={navigation} /> : null}
        </View>
      </LinearGradient>
      <View>
        <Text
          style={{
            marginHorizontal: 10,

            margin: 5,
            color: COLORS.font,
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          Popular Categories:
        </Text>
        {Visible ? (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            animating={true}
            style={{ justifyContent: "center", alignSelf: "center" }}
          />
        ) : null}
        <View>
          <View>
            {DATA
              ? DATA.map((item) => {
                  return (
                    <TouchableWithoutFeedback
                      style={{
                        zIndex: 1,
                        marginTop: 20,
                        marginLeft: "5%",
                        marginRight: "10%",
                        width: "85%",
                        alignItems: "center",
                        borderRadius: 10,
                        padding: 15,
                        borderWidth: 1,
                        borderColor: "gray",
                      }}
                      onPress={() =>
                        navigation.navigate("lists", {
                          category_id: item.id,
                          value:"category_id"
                        })
                      }
                      key={item.id}
                    >
                      <Text style={styles.texts}>{item.name}</Text>
                    </TouchableWithoutFeedback>
                  );
                })
              : null}
          </View>
        </View>
      </View>
      <View style={{marginBottom:10}}>
        <Text
          style={{
            marginHorizontal: 10,

            margin: 5,
            color: COLORS.font,
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          Packages:
        </Text>
        <View>
          {Packages.map((item) => {
            return (
              <TouchableWithoutFeedback
                style={{
                  zIndex: 1,
                  marginTop: 20,
                  marginLeft: "5%",
                  marginRight: "10%",
                  width: "85%",
                  alignItems: "center",
                  borderRadius: 10,
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "gray",
                }}
                onPress={() =>
                  navigation.navigate("lists", {
                    category_id: item.name,
                    value:"Package"
                  })
                }
                key={Math.random()}
              >
                <Text style={styles.texts}>{item.Displayname}</Text>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black, //414141
    flex: 1,
  },
  profile: {
    margin: 5,
    marginTop: 2,
    // borderColor: 'gray',
    //  borderWidth: 1 ,
    padding: 5,
  },
  textinput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    color: "grey",
    backgroundColor: "white",
    borderRadius: 20,
    margin: 10,
    marginTop: 2,
    marginBottom: 10,
    padding: 10,
  },
  tab: {
    zIndex: 1,
    marginTop: 20,
    marginLeft: "5%",
    marginRight: "10%",
    width: "85%",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#35B551",
  },
  texts: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.font,
  },

  change: {
    height: 200,
    margin: 1,
  },

  choose: {
    borderColor: "gray",
    borderWidth: 3,
    margin: 10,
  },
});

export default Dashboard;
