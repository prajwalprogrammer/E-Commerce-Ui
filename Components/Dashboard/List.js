import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
import { Ionicons } from "@expo/vector-icons";
import Text from "./MyText";
import NumericInput from "react-native-numeric-input";

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Subtitle,
  Title,
} from "native-base";
import { COLORS, FONTS, SIZES } from "../../Assets/theme";
import { LinearGradient } from "expo-linear-gradient";
import { GetMyCart, ShowData } from "./AxiosUrl";
import { CartContext } from "../GlobalContext/CartProvider";
import { GlobalContext } from "../Contaxt/GlobalState";

const List = ({ navigation, route }) => {
  let MinQuantity = 10000;
  var IsProduct = false;
  // const [list] = useState(route.params.category_data);
  const [DATA, setDATA] = useState([]);
  const [Visible, setVisible] = useState(null);
  const [value, setValue] = useState(1);
  const [IsAdded, setIsAdded] = useState(false);
  const { CheckTheProduct, user, AddToCart } = React.useContext(CartContext);
  const { transations, addTransaction, UpdateTransaction } = React.useContext(
    GlobalContext
  );
  useEffect(() => {
    setVisible(true);
    const fetchAPI = async () => {
      setDATA(await ShowData(route.params.category_id, route.params.value));
    };

    fetchAPI();
    if (DATA) {
      setVisible(false);
    }
  }, []);
  const AddAll = async () => {
    await DATA.map(async (item) => {
      transations.some((el) => el.id === item.id)
        ? await GetMyCart(item.id).then((res) => {
            let elementsIndex = transations.findIndex(
              (element) => element.id == res.id
            );
            let newArray = [...transations];
            let Qun = newArray[elementsIndex].Quantity + 1;
            let SubQua = newArray[elementsIndex].SubQuantity - 1;

            let ORGPrice =
              Math.round(res.price - (res.price * res.discount) / 100) * Qun;
            console.log(Qun + "  " + SubQua + " " + ORGPrice);
            newArray[elementsIndex] = {
              ...newArray[elementsIndex],
              Quantity: newArray[elementsIndex].Quantity + 1,
              Total: ORGPrice,
              SubQuantity: SubQua,
            };
            // transations=newArray;
            UpdateTransaction(newArray);
            console.log(transations);
          })
        : await GetMyCart(item.id).then((res) => {
            console.log(res);
            const SinglePrice = Math.round(
              res.price - (res.price * res.discount) / 100
            );
            const ORGPrice =
              Math.round(res.price - (res.price * res.discount) / 100) * value;
            //alert(res.Discount)
            const newTransaction = {
              Discount: res.discount,
              id: res.id,
              name: res.name,
              price: SinglePrice,
              ProductPrice: res.price,
              Quantity: value,
              Image: res.image,
              Total: ORGPrice,
              SubQuantity: res.quantity - 1,
            };
            // alert(newTransaction.SubQuantity)
            addTransaction(newTransaction);
          });
    });
    setIsAdded(true);
  };
  const SetQua = async (Id, Price, Discount) => {
    let elementsIndex = transations.findIndex((element) => element.id == Id);
    let newArray = [...transations];
    let Qun = newArray[elementsIndex].Quantity + 1;
    let SubQua = newArray[elementsIndex].SubQuantity - 1;

    let ORGPrice = Math.round(Price - (Price * Discount) / 100) * Qun;
    console.log(Qun + "  " + SubQua + " " + ORGPrice);
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      Quantity: Qun,
      Total: ORGPrice,
      SubQuantity: SubQua,
    };
    // transations=newArray;
    await UpdateTransaction(newArray);
    console.log(transations);
  };
  const onsubmit1 = async (id) => {
    // e.preventDefault();
    await GetMyCart(id).then((res) => {
      console.log(res);
      const Price = Math.round(res.price * (1 - (res.discount / 100) * 1));
      const ORGPrice = Math.round(res.price - (res.price * res.discount) / 100);
      //alert(res.Discount)
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
      // alert(newTransaction.SubQuantity)
      addTransaction(newTransaction);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000000",
        paddingTop: Platform.OS === "android" ? 0 : 0,
      }}
    >
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#4d4b50" />

        <Header
          style={{ backgroundColor: "#202020", elevation: 12, height: 80 }}
          androidStatusBarColor="#202020"
        >
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              {/* <Icon name="arrow-back" style={{ color: "#6a5acd" }} /> */}
              <Ionicons name="arrow-back" size={24} color="white" />
            </Button>
          </Left>
          <Body>
            <Title
              style={{ fontSize: 20, fontWeight: "bold", color: COLORS.font }}
            >
              List
            </Title>
            <Subtitle style={{ fontSize: 11, color: COLORS.font }}>
              CLUS Pvt Ltd.
            </Subtitle>
          </Body>
          <Right>
            <Button transparent>{/* <Icon name='menu' /> */}</Button>
          </Right>
        </Header>

        <LinearGradient
          colors={["#000000", "#474747"]}
          style={{
            // borderBottomRightRadius: 35,
            // borderBottomLeftRadius: 35,
            //paddingBottom: "10%",
            elevation: 0.8,
            position: "relative",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
          start={{ x: 0.9, y: 0.25 }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: "20%" }}>
            {Visible ? (
              <ActivityIndicator
                size="large"
                color="#ffffff"
                animating={true}
                style={{ justifyContent: "center", alignSelf: "center" }}
              />
            ) : null}
            {DATA
              ? DATA.map((item) => {
                  IsProduct = transations.some((el) => el.id === item.id);
                  if (item.quantity < MinQuantity) {
                    MinQuantity = item.quantity;
                  }
                  var N1 = transations.some((el) => el.id === item.id);
                  var starRating = [];
                  for (var i = 0; i < parseInt(item.Rating); i++) {
                    starRating.push(i);
                  }
                  return (
                    <LinearGradient
                      colors={["#383838", "#282828", "#202020"]}
                      style={styles.tab}
                      start={{ x: 0.7, y: 1.3 }}
                      key={item.id}
                    >
                      <TouchableWithoutFeedback
                        // style={styles.tab}
                        onPress={() =>
                          navigation.navigate("Product", {
                            name: item.name,
                            description: item.description,
                            uri1: item.image,
                            Quantity: item.quantity,
                            price: item.price,
                            Cid: item.category_id,
                            Pid: item.id,
                            Discount: item.discount,
                            Rating: item.Rating,
                          })
                        }
                        // key={item.key}
                      >
                        <Grid>
                          <Col size={30}>
                            <Image
                              source={{ uri: item.image[0] }}
                              style={{ ...styles.image, borderRadius: 12 }}
                            />
                          </Col>
                          <Col size={40}>
                            <View style={{ marginTop: "1%" }}>
                              <Text style={styles.texts}>{item.name}</Text>
                              <Text style={styles.texts}>
                                Price : $
                                {Math.floor(
                                  item.price -
                                    (item.price * item.discount) / 100
                                )}
                                {"  "}
                                {/* {item.price} */}
                                {item.discount > 0 ? (
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
                                    ${item.price}
                                  </Text>
                                ) : null}
                              </Text>
                              <View style={{ flexDirection: "row" }}>
                                {starRating.map(() => (
                                  <MaterialIcons
                                    name="star-rate"
                                    color="#DBA800"
                                    size={25}
                                  />
                                ))}
                              </View>
                            </View>
                          </Col>
                          <Col
                            size={30}
                            style={{
                              alignItem: "center",
                              justifyContent: "center",
                              paddingTop: 10,
                            }}
                          >
                            <View style={styles.tab1}>
                              <Text style={styles.texts1}>
                                Quantity {item.quantity}
                              </Text>
                            </View>
                          </Col>
                        </Grid>
                      </TouchableWithoutFeedback>
                    </LinearGradient>
                  );
                })
              : null}
          </ScrollView>
        </LinearGradient>
      </Container>

      {route.params.value === "Package" && (
        <View
          style={{
            //justifyContent: "flex-end",
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
              {IsProduct ? (
                <Button
                  style={styles.tab3}
                  onPress={() => navigation.navigate("MyCart")}
                >
                  <Text
                    style={{
                      color: COLORS.font,
                      fontSize: 25,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Go To Cart
                  </Text>
                </Button>
              ) : (
                <Button style={styles.tab3} onPress={() => AddAll()}>
                  <Text
                    style={{
                      color: COLORS.font,
                      fontSize: 20,
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Add To Cart
                  </Text>
                </Button>
              )}
            </Col>
            {!IsProduct && (
              <Col>
                <View style={styles.tab4}>
                  <NumericInput
                    value={value}
                    onChange={(value) => setValue(value)}
                    onLimitReached={(isMax, msg) => alert(msg)}
                    totalWidth={120}
                    totalHeight={50}
                    iconSize={25}
                    step={1}
                    minValue={1}
                    maxValue={MinQuantity}
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
                </View>
              </Col>
            )}
          </Grid>
        </View>
      )}
      {/* <TouchableWithoutFeedback
          style={styles.tab1}
          onPress={() => {}}
        >
          <Text style={styles.texts}>Add To Cart</Text>
        </TouchableWithoutFeedback> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#414141",
    flex: 1,
  },
  checkout: {
    alignItems: "center",
    backgroundColor: COLORS.black1,
    marginBottom: 10,
    marginTop: 10,
    width: "70%",
    height: 50,
    marginLeft: 70,
    borderRadius: 10,
    padding: 7,
    justifyContent: "center",
  },
  tab: {
    alignSelf: "center",
    zIndex: 1,
    marginTop: 10,
    marginLeft: "5%",
    marginRight: "5%",
    width: "93%",
    paddingVertical: "3%",
    borderRadius: 10,
    padding: 15,
    // borderColor: "gray",
    // borderWidth: 1,
    padding: 5,
    backgroundColor: "white",
    elevation: 12,
  },
  texts: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.font,
  },
  tab3: {
    //zIndex: 1,
    marginTop: 20,
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
    alignItems: "center",
    justifyContent:'center',
    borderRadius: 5,
    padding: 10,
    backgroundColor: COLORS.black1, // "#35B551",
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    alignSelf: "center",
  },
  tab4: {
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
  tab1: {
    zIndex: 1,
    marginRight: 10,
    marginTop: 2,
    marginBottom: 10,
    width: "80%",
    backgroundColor: "#DBA800",
    borderRadius: 100,
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  tab2: {
    zIndex: 1,
    marginRight: 20,
    marginTop: 2,
    marginBottom: 10,
    width: "85%",
    backgroundColor: "#707070",
    borderRadius: 100,
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  texts1: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },
  texts2: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },
  image: {
    width: 90,
    height: 100,
    //margin: 5,
  },
});

export default List;
