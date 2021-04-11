import React from "react";
import { useState } from "react";
import {
  View,
  
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Text from './MyText'
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/AntDesign";
import { useRef } from "react";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

import { COLORS, FONTS, SIZES } from "../../Assets/theme";
import { LinearGradient } from "expo-linear-gradient";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CartContext } from "../GlobalContext/CartProvider";
import AsyncStorage from "@react-native-community/async-storage";
import { GlobalContext } from "../Contaxt/GlobalState";
import { GetMyCart } from "./AxiosUrl";
export const RenderItem = (props) => {
  const { addTransaction, transations } = React.useContext(GlobalContext);
  console.log(props.data.id);
  const { user, AddToCart, Prajwal } = React.useContext(CartContext);
  console.log("User" + Prajwal);
  var N1;
  var found = transations.some((el) => el.id === props.data.id);

  props.navigation.addListener("focus", async () => {
    //do your thing here
    var N2 = await AsyncStorage.getItem("countries");
    if (N2) {
      N1 = N2.split(",").includes(props.data.id);
    }
  });
  React.useEffect(() => {
    const Fetch = async () => {
      var N2 = await AsyncStorage.getItem("countries");
      if (N2) {
        N1 = N2.split(",").includes(props.data.id);
      }
    };
    Fetch();
    //N1 = Prajwal.split(",").includes(props.data.id);
  }, [Prajwal]);
  const onsubmit = async () => {
    // e.preventDefault();
    await GetMyCart(props.data.id).then((res) => {
      const Price = Math.round(res.price * (1 - (res.discount / 100) * 1));
      const ORGPrice = Math.round(res.price - (res.price * res.discount) / 100);
      const newTransaction = {
        Discount: res.discount,
        id: res.id,
        name: res.name,
        price: ORGPrice,
        ProductPrice: res.price,
        Quantity: 1,
        Image: res.image,
        Total: ORGPrice,
        SubQuantity: res.quantity - 1,
      };
      addTransaction(newTransaction);
    });
  };
  var starRating = [];
  for (var i = 0; i < parseInt(props.data.Rating); i++) {
    starRating.push(i);
  }
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate("Product", {
          name: props.data.name,
          description: props.data.description,
          uri1: props.data.image,
          Quantity: props.data.quantity,
          price: props.data.price,
          Cid: props.data.category_id,
          Pid: props.data.id,
          Discount: props.data.discount,
          Rating: props.data.Rating,
        })
      }
    >
      <LinearGradient
        colors={[COLORS.black, COLORS.black1]}
        style={{
          borderRadius: 10,
          elevation: 55,
          width: "98%",
          margin: 3,
          height: 290,
        }}
      >
        <View
          style={
            {
              // backgroundColor: "#BDBDBD",
            }
          }
          key={props.data.id}
        >
          <View
            style={{
              padding: 2,
              width: 80,
              zIndex: 1,
              backgroundColor: "#5D5D5D",
              position: "absolute",
              top: 5,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ color: COLORS.font }}>
              {props.data.discount}% off
            </Text>
          </View>

          <Image
            source={{ uri: props.data.image[0] }}
            style={{ ...styles.image, alignSelf: "center" }}
            resizeMode="stretch"
          />
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginHorizontal: 10,
              marginVertical: 5,
              marginTop: -19,
            }}
          > */}
          {/* {found ? (
              <TouchableWithoutFeedback
                //style={{ ...styles.tab, alignSelf: "center" }}
                onPress={() => props.navigation.navigate("Report")}
              >
                <View style={{ ...styles.tab, alignSelf: "center" }}>
                  <Text style={styles.texts}>Go to Cart</Text>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => onsubmit()}>
                <View style={{ ...styles.tab, alignSelf: "center" }}>
                  <Text style={styles.texts}>Add To Cart</Text>
                </View>
              </TouchableWithoutFeedback>
            )} */}
          {/* </View> */}
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            <Text style={{ ...styles.body, fontWeight: "bold", fontSize: 20 }}>
              {props.data.name.slice(0, 20)}
              {props.data.name.length >= 20 && "..."}
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                //  marginTop: 5,
                // marginBottom: 5,
              }}
            >
              <Text
                style={{
                  ...styles.body,
                  fontWeight: "bold",
                  fontSize: 15,
                  flexDirection: "row",
                }}
              >
                {starRating.map(() => (
                  <MaterialIcons name="star-rate" color="#DBA800" size={25} />
                ))}
              </Text>
            </View>
          </View>
          <Grid>
            <Col size={170}>
              <Text style={styles.header}>
                $
                {Math.round(
                  props.data.price -
                    (props.data.price * props.data.discount) / 100
                )}
              </Text>
            </Col>
            <Col size={70}>
              <Text
                style={{
                  fontSize: 20,
                  opacity: 0.5,
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                  color: COLORS.font,
                  marginTop: 5,
                  alignSelf: "flex-start",
                }}
              >
                ${props.data.price}
              </Text>
            </Col>
          </Grid>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};
const Profile = () => {
  const [Active, setActive] = useState(0);
  const isCarousel = React.useRef(null);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        ...styles.container,
        paddingHorizontal: 10,
        marginHorizontal: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    ></ScrollView>
  );
};

const styles = StyleSheet.create({
  tab: {
    // zIndex: 1,
    //  marginTop: -5,
    marginLeft: "10%",
    marginRight: "10%",
    width: 210,
    alignItems: "center",
    borderRadius: 100,
    padding: 2,
    opacity: 1,
    backgroundColor: "#5D5D5D",
    paddingVertical: 10,
  },
  texts: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
  },
  container: {
    marginTop: 20,
    borderRadius: 8,
    width: ITEM_WIDTH + 70,
    paddingBottom: 40,
    height: 300,
  },
  image: {
    width: "90%",
    height: "60%",
    margin: 10,
    marginBottom: 1,
    borderRadius: 10,
  },
  header: {
    color: COLORS.font,
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: "50%",
    alignSelf: "center",
  },
  body: {
    color: COLORS.font,
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
export default RenderItem;
