import React from "react";
import {
  View,
  
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Subtitle,
  Title,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

import { COLORS, FONTS, SIZES } from "../../Assets/theme";
import { LinearGradient } from "expo-linear-gradient";
import NumericInput from "react-native-numeric-input";
import { Button } from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { GetMyCart, GetProduct } from "../../Components/Dashboard/AxiosUrl";
import { CartContext } from "../../Components/GlobalContext/CartProvider";
import CartList from "./CartList";
import { GlobalContext } from "../../Components/Contaxt/GlobalState";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Text from '../../Components/Dashboard/MyText'
const Cart = ({ navigation }) => {
  const {
    transations,
    deleteTransaction,
    UpdateTransaction,
  } = React.useContext(GlobalContext);
  const { user, Prajwal, Total, Profile } = React.useContext(CartContext);
  const [CArt, setCArt] = React.useState([]);
  const [Quantity, setQuantity] = React.useState([]);
  var Ids;
  navigation.addListener("focus", async () => {
    const myArray2 = await AsyncStorage.getItem("countries");
    const Quanti = await AsyncStorage.getItem("Quan");

    if (myArray2) {
      setCArt(myArray2.split(","));
      setQuantity(Quanti.split(","));
    }
  });

  React.useEffect(() => {
    const Fetch = async () => {
      // console.log(Profile);
      const myArray2 = await AsyncStorage.getItem("countries");
      const Quanti = await AsyncStorage.getItem("Quan");

      if (myArray2) {
        setCArt(myArray2.split(","));
        setQuantity(Quanti.split(","));
      }
    };
    Fetch();
  }, [Prajwal]);
  const OpenProduct = async (ID, Quantity) => {
    //alert(Quantity)
    await GetProduct(ID, navigation, Quantity);
  };

  const SetQua = (VAl, Id, Price, Discount, OrgQuan) => {
    const ORGPrice = Math.round(Price - (Price * Discount) / 100) * VAl;
    const elementsIndex = transations.findIndex((element) => element.id == Id);
    let newArray = [...transations];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      Quantity: VAl,
      Total: ORGPrice,
      SubQuantity: OrgQuan - VAl,
    };
    // transations=newArray;
    UpdateTransaction(newArray);
  };

  const getArraySum = () => {
    const amounts = transations.map((transaction) => transaction.Total);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    return total;
  };
  return (
    <>
      <Container style={{ backgroundColor: "black" }}>
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
              <Ionicons name="arrow-back" size={24} color={COLORS.font} />
            </Button>
          </Left>
          <Body>
            <Title
              style={{ fontSize: 20, fontWeight: "bold", color: COLORS.font }}
            >
              Cart
            </Title>
            <Subtitle style={{ fontSize: 11, color: COLORS.font }}>
              {Profile ? Profile.AccountName : "CLUS Pvt Ltd."}
            </Subtitle>
          </Body>
          <Right>
            <Button transparent>{/* <Icon name='menu' /> */}</Button>
          </Right>
        </Header>
        <LinearGradient
          colors={["#000000", "#474747"]}
          style={{
            height: "100%",
            elevation: 0.8,
            marginBottom: 10,
          }}
          start={{ x: 0.9, y: 0.25 }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: "20%" }}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Allproduct");
              }}
            >
              <LinearGradient
                colors={["#000000", "#474747"]}
                style={{
                  ...styles.additems,
                  alignSelf: "center",
                  width: "80%",
                  height: 50,
                  justifyContent: "center",
                  elevation: 0.8,
                }}
                start={{ x: 1.3, y: 0.25 }}
              >
                <Text
                  style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    alignSelf: "center",
                    color: COLORS.font,
                  }}
                >
                  <MaterialCommunityIcons
                    name="cart-outline"
                    color={COLORS.font}
                    size={30}
                  />{" "}
                  ADD NEW ITEMS{" "}
                </Text>
              </LinearGradient>
            </TouchableWithoutFeedback>

            {transations
              ? transations.map((item) => {
                  return (
                    <TouchableWithoutFeedback
                      key={item.id}
                      onPress={() => OpenProduct(item.id, item.Quantity)}
                    >
                      <LinearGradient
                        colors={["#474747", "#474747", "#202020"]}
                        style={styles.tab}
                        start={{ x: 1.3, y: 1.3 }}
                        key={item.id}
                      >
                        <Grid key={item.id}>
                          <Row>
                            <Col size={30}>
                              <Image
                                source={{ uri: item.Image[0] }}
                                style={styles.image}
                              />
                            </Col>
                            <Col
                              size={50}
                              style={{
                                backgroundColor: "#202020",
                                borderRadius: 15,
                                paddingVertical: 4,
                                alignSelf: "center",
                                justifyContent: "center",
                                elevation: 23,
                                paddingLeft: 12,
                              }}
                            >
                              <Row
                                style={{ alignSelf: "center", marginLeft: 10 }}
                              >
                                <Col size={125} style={{ alignSelf: "center" }}>
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      fontWeight: "bold",
                                      color: COLORS.font,
                                    }}
                                  >
                                    {item.name}
                                  </Text>
                                </Col>
                                <Col size={35}>
                                  <TouchableWithoutFeedback
                                    onPress={() => deleteTransaction(item.id)}
                                  >
                                    <AntDesign
                                      name="delete"
                                      size={20}
                                      color="red"
                                      style={{ alignSelf: "center" }}
                                    />
                                  </TouchableWithoutFeedback>
                                </Col>
                              </Row>
                              <Row>
                                <Col size={25}>
                                  <Text
                                    style={{
                                      color: COLORS.font,
                                      alignSelf: "center",
                                      fontSize: item.price > 10000 ? 15 : 20,
                                    }}
                                  >
                                    $ {item.price}
                                  </Text>
                                </Col>
                                <Col size={5}>
                                  <Text style={{ color: COLORS.font }}>x</Text>
                                </Col>
                                <Col size={30}>
                                  <View style={{ flexDirection: "row" }}>
                                    <TouchableWithoutFeedback>
                                      {/* <Text style={{ color: COLORS.font }}>
                                        {item.Quantity}
                                      </Text> */}
                                      <NumericInput
                                        textColor="white"
                                        rounded
                                        iconStyle={{
                                          color: "white",
                                          fontSize: 19,
                                          fontWeight: "bold",
                                        }}
                                        rightButtonBackgroundColor="black"
                                        leftButtonBackgroundColor="black"
                                        onLimitReached={(isMax, msg) =>
                                          alert(msg)
                                        }
                                        minValue={1}
                                        maxValue={
                                          item.SubQuantity + item.Quantity
                                        }
                                        onChange={(value) =>
                                          SetQua(
                                            value,
                                            item.id,
                                            item.ProductPrice,
                                            item.Discount,
                                            item.SubQuantity + item.Quantity
                                          )
                                        }
                                        value={item.Quantity}
                                        totalWidth={80}
                                      />
                                    </TouchableWithoutFeedback>
                                  </View>
                                </Col>
                              </Row>
                              <Row>
                                <View>
                                  <Text
                                    style={{
                                      color: COLORS.font,
                                      fontSize: item.price > 10000 ? 15 : 20,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    = ${item.Total}
                                  </Text>
                                </View>
                              </Row>
                            </Col>
                          </Row>
                        </Grid>
                      </LinearGradient>
                    </TouchableWithoutFeedback>
                  );
                })
              : null}
          </ScrollView>
        </LinearGradient>
      </Container>

      <View
        style={{
          justifyContent: "flex-end",
          backgroundColor: "#303030",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 140,
          // top:10,
          // marginVertical: 10,
          elevation: 20,
          borderTopColor: "red",
        }}
      >
        <Button
          disabled={transations.length > 0 ? false : true}
          success
          style={styles.checkout}
          onPress={() =>
            navigation.navigate("CheckoutModal", { Amount: getArraySum() })
          }
        >
          <Text
            style={{
              color: COLORS.font,
              fontSize: 18,
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Checkout ${getArraySum()}{" "}
          </Text>
        </Button>
        <Button
          style={styles.cancel}
          danger
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Cancel
          </Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cartheader: {
    alignItems: "center",
    backgroundColor: "#EAD381",
    marginBottom: 20,
    marginTop: 10,
  },
  clus: {
    alignItems: "center",
  },
  additems: {
    alignItems: "center",
    // backgroundColor: "#99FF75",
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 10,
  },
  checkout: {
    alignItems: "center",
    backgroundColor: "#35B551",
    marginBottom: 10,
    marginTop: 10,
    width: "70%",
    height: 50,
    marginLeft: 70,
    borderRadius: 10,
    padding: 7,
    justifyContent: "center",
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

  container: {
    backgroundColor: "#414141",
  },
  tab1: {
    zIndex: 1,
    marginTop: 20,
    marginLeft: "5%",
    marginRight: "10%",
    width: "85%",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#35B551",
    height: 50,
  },
  tab2: {
    zIndex: 1,
    marginTop: 20,
    marginLeft: "5%",
    marginRight: "10%",
    width: "85%",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#85C5EA",
    height: 50,
  },
  texts: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  image: {
    width: 110,
    height: 120,
    margin: 5,
    borderRadius: 13,
  },
  tab: {
    //zIndex: 1,
    marginTop: 20,
    marginLeft: "5%",
    marginRight: "5%",
    width: "93%",
    borderRadius: 15,
    padding: 15,
    borderColor: "gray",
    borderWidth: 0.2,
    padding: 5,
    // backgroundColor: "#202020",
    paddingHorizontal: 13,
    paddingVertical: 13,
    elevation: 99,
  },
});

export default Cart;
