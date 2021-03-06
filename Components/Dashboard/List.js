import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const imageuri =
  "data:image/jpeg;base64,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";
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
import { ShowData } from "./AxiosUrl";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CartContext } from "../GlobalContext/CartProvider";

const List = ({ navigation, route }) => {
  // const [list] = useState(route.params.category_data);
  const [DATA, setDATA] = useState([]);
  const [Visible, setVisible] = useState(null);
  const { CheckTheProduct, user, AddToCart } = React.useContext(CartContext);
  useEffect(() => {
    setVisible(true);
    const fetchAPI = async () => {
      setDATA(await ShowData(route.params.category_id, "category_id"));
    };
    fetchAPI();
    if (DATA) {
      setVisible(false);
    }
  }, []);
  return (
    <Container>
      <Header
        style={{ backgroundColor: "#202020", elevation: 12, height: 80 }}
        androidStatusBarColor="#202020"
      >
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            {/* <Icon name="arrow-back" style={{ color: "#6a5acd" }} /> */}
            <Icon name="back" size={30} color={COLORS.font} />
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
          paddingBottom: "10%",
          elevation: 0.8,
          position: "relative",
          left: 0,
          right: 0,
          top: 0,
          height: SIZES.height,
        }}
        start={{ x: 0.9, y: 0.25 }}
      >
        <ScrollView style={{}}>
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
                var N1 = JSON.stringify(user).includes(item.id);
                return (
                  <LinearGradient
                    colors={["#383838", "#282828", "#202020"]}
                    style={styles.tab}
                    start={{ x: 0.7, y: 1.3 }}
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
                        })
                      }
                      // key={item.key}
                      key={item.id}
                    >
                      {/* <TouchableOpacity
                        style={{
                          //padding: 4,
                          width: 80,
                          zIndex: 2,
                          position: "absolute",
                          top: -20,
                          right: -20,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Icon name="heart" size={25} color="#FF0707" />
                      </TouchableOpacity> */}

                      <Grid>
                        <Col size={30}>
                          <Image
                            source={{ uri: item.image[0] }}
                            style={{ ...styles.image, borderRadius: 12 }}
                          />
                        </Col>
                        <Col size={40}>
                          <View style={{ marginTop: "1%" }}>
                            {/* <Text style={styles.texts}>{item.product_name}</Text>
                          <Text style={styles.texts}>Price : $ {item.price}</Text> */}
                            <Text style={styles.texts}>{item.name}</Text>
                            <Text style={styles.texts}>
                              Price : $ {item.price}
                            </Text>
                            <Text style={styles.texts}>
                              <MaterialIcons
                                name="star-rate"
                                color="#DBA800"
                                size={25}
                              />
                              <MaterialIcons
                                name="star-rate"
                                color="#DBA800"
                                size={25}
                              />
                              <MaterialIcons
                                name="star-rate"
                                color="#DBA800"
                                size={25}
                              />
                              <MaterialIcons
                                name="star-rate"
                                color="#DBA800"
                                size={25}
                              />
                            </Text>
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
                          <TouchableOpacity
                            style={styles.tab1}
                            onPress={() => {}}
                          >
                            <Text style={styles.texts1}>
                              Quantity {item.quantity}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.tab2}
                            onPress={() => {N1?navigation.navigate("Cart"):AddToCart(item.id)}}
                          >
                            {/* <Text style={styles.texts2}>Add to Cart</Text> */}
                            {N1 ? (
                              <Text style={styles.texts2}>Go to Cart</Text>
                            ) : (
                              <Text style={styles.texts2}>Add To Cart</Text>
                            )}
                          </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#414141",
  },
  tab: {
    alignSelf: "center",
    zIndex: 1,
    marginTop: 20,
    marginLeft: "5%",
    marginRight: "5%",
    width: "93%",
    paddingVertical: "5%",
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
