import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  LogBox,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NumericInput from "react-native-numeric-input";
import { COLORS, FONTS, SIZES } from "../../Assets/theme";
import { LinearGradient } from "expo-linear-gradient";
import { SliderBox } from "react-native-image-slider-box";
import { CartContext } from "../GlobalContext/CartProvider";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { GetMyCart } from "./AxiosUrl";
import { GlobalContext } from "../Contaxt/GlobalState";
import AwesomeAlert from "react-native-awesome-alerts";

const Product = ({ navigation, route }) => {
  const [value, setvalue] = useState(1);
 
  LogBox.ignoreAllLogs();
  const [isModalVisible, setIsModalVisible] = useState(false);
  // useEffect(()=>{console.log(route.params.description)},[])
  const { addTransaction, transations, UpdateTransaction } = useContext(
    GlobalContext
  );
  const { CheckTheProduct, user, AddToCart } = useContext(CartContext);
   var N1 = transations.some((el) => el.id === route.params.Pid);
  const SetQua = (VAl) => {
    const ORGPrice =
      Math.round(
        route.params.price - (route.params.price * route.params.Discount) / 100
      ) * VAl;
    const elementsIndex = transations.findIndex(
      (element) => element.id == route.params.Pid
    );
    let newArray = [...transations];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      Quantity: VAl,
      Total: ORGPrice,
    };
    // transations=newArray;
    UpdateTransaction(newArray);
    N1=transations.some((el) => el.id === route.params.Pid);
  };
  const onsubmit = async () => {
    // e.preventDefault();
    await GetMyCart(route.params.Pid).then((res) => {
      const Price = Math.round(res.price * (1 - res.discount / 100)) * value;
      const Dis = Math.round(res.price * (1 - res.discount / 100));
      const ORGPrice =
        Math.round(res.price - (res.price * res.discount) / 100) * value;
      const SinglePrice = Math.round(
        res.price - (res.price * res.discount) / 100
      );
      // alert(Dis)
      const newTransaction = {
        Discount: res.discount,
        id: res.id,
        name: res.name,
        price: SinglePrice,
        ProductPrice: res.price,
        Quantity: value,
        Image: res.image,
        Total: ORGPrice,
        SubQuantity: res.quantity - value,
      };
      addTransaction(newTransaction);
      setIsModalVisible(true);
      setTimeout(function () {
        setIsModalVisible(!isModalVisible);
      }, 1000);
    });
  };
  return (
    <LinearGradient
      colors={["#000000", "#474747"]}
      style={{
        // borderBottomRightRadius: 35,
        // borderBottomLeftRadius: 35,
        // paddingBottom: "10%",
        elevation: 0.8,
        //  position: "relative",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        //height: SIZES.height,
      }}
      start={{ x: 0.9, y: 0.25 }}
    >
      <ScrollView contentContainerStyle={{ marginBottom: "10%" }}>
        <View style={{ margin: 20 }}>
          {/* <Image 
                  source={{uri:route.params.uri1[0]}}                                               
                  style={{
                    // width: 350,
                    // height: 300,    
                    // borderRadius:10          
                  }}
                />    */}
          <SliderBox
            images={route.params.uri1}
            sliderBoxHeight={300}
            // onCurrentImagePressed={(index) =>
            //   console.warn(`image ${index} pressed`)
            // }
            dotColor="#DBA800"
            inactiveDotColor={COLORS.white}
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            style={{
              width: "90%",
              height: 300,
              borderRadius: 10,
            }}
          />
          <AwesomeAlert
            show={isModalVisible}
            showProgress={false}
            title="Success!!!"
            titleStyle={{ fontSize: 30, fontWeight: "bold", color: "black" }}
            message={"Item Added To Cart"}
            messageStyle={{ fontSize: 20, color: "gray" }}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={true}
            showConfirmButton={true}
            cancelButtonStyle={{}}
            cancelText="Continue Shopping"
            cancelButtonColor="red"
            confirmText="Proceed to Checkout"
            confirmButtonColor="#05375a"
            onCancelPressed={() => {
              setIsModalVisible(!isModalVisible), navigation.navigate("Cart");
            }}
            onConfirmPressed={() => {
              setIsModalVisible(!isModalVisible), navigation.navigate("Report");
            }}
          />
        </View>
        <View style={{ margin: 20 }}>
          <Text
            style={{
              fontSize: 24,
              color: "white",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {route.params.name}
          </Text>
          <Text style={{ fontSize: 20, color: "white" }}>
            {" "}
            $
            {Math.floor(
              route.params.price -
                (route.params.price * route.params.Discount) / 100
            )}{" "}
            {/* $ {route.params.price} */}
            {route.params.Discount > 0 ? (
              <Text
                style={{
                  fontSize: 12,
                  opacity: 0.5,
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                  color: COLORS.font,
                  marginTop: 10,
                  fontWeight: "normal",
                  marginHorizontal: 12,
                }}
              >
                ${route.params.price}
              </Text>
            ) : null}
          </Text>
          <Text style={styles.texts}>
            <MaterialIcons name="star-rate" color="#DBA800" size={25} />
            <MaterialIcons name="star-rate" color="#DBA800" size={25} />
            <MaterialIcons name="star-rate" color="#DBA800" size={25} />
            <MaterialIcons name="star-rate" color="#DBA800" size={25} />
          </Text>
          <Text>{"\n"}</Text>
          <Text style={{ fontSize: 25, color: "white", fontWeight: "bold" }}>
            {" "}
            Know More About :
          </Text>
          <View style={{ marginLeft: 10, marginTop: 10 }}>
            <Text style={{ color: "white", fontSize: 15 }}>
              {" "}
              {route.params.description}
            </Text>
            {/* <Text style={{color:"white",fontSize:15}}>  {route.params.description}</Text> */}
          </View>
        </View>
        <Grid>
          <Col>
            {N1 ? (
              <TouchableWithoutFeedback
                style={styles.tab1}
                onPress={() => navigation.navigate("Report")}
              >
                <Text style={styles.texts}>Go to Cart</Text>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback
                style={styles.tab1}
                onPress={() => onsubmit()}
              >
                <Text style={styles.texts}>Add To Cart</Text>
              </TouchableWithoutFeedback>
            )}
            {/* <TouchableWithoutFeedback
              style={styles.tab1}
              onPress={() => {
                N1 ? navigation.navigate("Report") : onsubmit();
              }}
            >
              {N1 ? (
                <Text style={styles.texts}>Go to Cart</Text>
              ) : (
                <Text style={styles.texts}>Add To Cart</Text>
              )}
            </TouchableWithoutFeedback> */}
          </Col>
          <Col>
            <View style={styles.tab2}>
              {N1 ? (
                <NumericInput
                  textColor="white"
                  rounded
                 // type="up-down"
                  minValue={1}
                  maxValue={route.params.Quantity}
                  onChange={(value) => SetQua(value)}
                  value={route.params.NewQuan}
                />
              ) : (
                <NumericInput
                  textColor="white"
                  rounded
                 // type="up-down"
                  minValue={1}
                  maxValue={route.params.Quantity}
                  onChange={(value) => setvalue(value)}
                  value={1}
                />
              )}
            </View>
          </Col>
        </Grid>
        <Text>{"\n"}</Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#414141",
  },
  tab1: {
    zIndex: 1,
    marginTop: 20,
    marginLeft: "15%",
    marginRight: "10%",
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    backgroundColor: COLORS.black1, // "#35B551",
    height: 50,
    borderWidth: 1,
    borderColor: "white",
  },
  tab2: {
    zIndex: 1,
    marginTop: 20,
    marginLeft: "20%",
    marginRight: "10%",
    width: "60%",
    alignItems: "center",
    borderRadius: 5,

    height: 50,
    color: "white",
    backgroundColor: COLORS.black1, //"#85C5EA",
  },
  texts: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.font,
  },
});

export default Product;
