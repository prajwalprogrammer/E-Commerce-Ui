import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  LogBox,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import Text from "./MyText";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Subtitle,
  Title,
  Button,
} from "native-base";
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
import { Ionicons } from "@expo/vector-icons";

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
      SubQuantity: route.params.Quantity - VAl,
    };
    // transations=newArray;
    UpdateTransaction(newArray);
    N1 = transations.some((el) => el.id === route.params.Pid);
  };
  const onsubmit = async () => {
    // e.preventDefault();
    await GetMyCart(route.params.Pid).then((res) => {
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

  var starRating = [];
  for (var i = 0; i < parseInt(route.params.Rating); i++) {
    starRating.push(i);
  }

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#474747",
          paddingTop: Platform.OS === "android" ? 0 : 0,
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor="#4d4b50" />
        <Container>
          <Header
            style={{
              backgroundColor: "#202020",
              elevation: 12,
              height: 60,
              // borderBottomColor: "white",
              // borderBottomWidth: 0.5,
            }}
            androidStatusBarColor="#202020"
          >
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </Button>
            </Left>
            <Body>
              <Title
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: COLORS.font,
                }}
              >
                Product Details
              </Title>
            </Body>
          </Header>
          <ScrollView>
            <LinearGradient
              colors={["#000000", "#474747"]}
              style={{
                elevation: 0.8,
                //  position: "relative",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                height: SIZES.height - 30,
                // paddingBottom: '5%',
                //marginBottom: 30,
              }}
              start={{ x: 0.9, y: 0.25 }}
            >
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
                  dotColor="#DBA800"
                  inactiveDotColor={COLORS.white}
                  paginationBoxVerticalPadding={20}
                  autoplay
                  circleLoop
                  resizeMethod={"resize"}
                  resizeMode={"stretch"}
                  imageLoadingColor="#2196F3"
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
                  titleStyle={{
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "black",
                  }}
                  message={"Item Added To Cart"}
                  messageStyle={{ fontSize: 20, color: "gray" }}
                  closeOnTouchOutside={false}
                  closeOnHardwareBackPress={true}
                  showCancelButton={true}
                  showConfirmButton={true}
                  cancelButtonStyle={{}}
                  cancelText="Continue Shopping"
                  cancelButtonColor="green"
                  confirmText="Proceed to Checkout"
                  confirmButtonColor="red"
                  onCancelPressed={() => {
                    setIsModalVisible(!isModalVisible),
                      navigation.navigate("Cart1"),
                      navigation.navigate("Allproduct");
                  }}
                  onConfirmPressed={() => {
                    setIsModalVisible(!isModalVisible),
                      navigation.navigate("Report");
                  }}
                />
              </View>
              <View>
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
                  {starRating.map(() => (
                    <MaterialIcons name="star-rate" color="#DBA800" size={25} />
                  ))}
                </Text>
                <Text>{"\n"}</Text>
                <Text
                  style={{ fontSize: 25, color: "white", fontWeight: "bold" }}
                >
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
            </LinearGradient>
          </ScrollView>
        </Container>
        <View
          style={{
            justifyContent: "flex-end",
            backgroundColor: "#303030",

            height: 80,
            // top:10,
            // marginVertical: 10,
            elevation: 20,
            borderTopColor: "red",
          }}
        >
          <Grid style={{ marginBottom: "15%" }}>
            <Col>
              {N1 ? (
                <TouchableWithoutFeedback
                  style={styles.tab1}
                  onPress={() => navigation.navigate("MyCart")}
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
            </Col>
            {!N1 && (
              <Col>
                <View style={styles.tab2}>
                  {N1 ? null : (
                    <NumericInput
                      value={value}
                      onChange={(value) => setvalue(value)}
                      onLimitReached={(isMax, msg) => alert(msg)}
                      totalWidth={120}
                      totalHeight={50}
                      iconSize={25}
                      step={1}
                      minValue={1}
                      maxValue={route.params.Quantity}
                      //valueType="real"
                      rounded
                      iconStyle={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                      textColor="#ffffff"
                      rightButtonBackgroundColor="#474747"
                      leftButtonBackgroundColor="#474747"
                    />
                  )}
                </View>
              </Col>
            )}
          </Grid>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#414141",
  },
  cancel: {
    alignItems: "center",
    backgroundColor: "#E60808",
    marginBottom: 10,
    marginTop: 2,
    width: "70%",
    height: 40,
    marginLeft: 70,
    borderRadius: 10,
    padding: 7,
    justifyContent: "center",
  },
  tab1: {
    zIndex: 1,
    marginTop: 20,
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
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
