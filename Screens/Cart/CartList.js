import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { GetMyCart } from "../../Components/Dashboard/AxiosUrl";
import { COLORS, FONTS, SIZES } from "../../Assets/theme";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { CartContext } from "../../Components/GlobalContext/CartProvider";
const CartList = (props) => {
  // alert("ggg" + props.Pid);
  const { DeleteFromCart } = React.useContext(CartContext);
  const [CArt, setCArt] = React.useState([]);
  React.useEffect(() => {
    const Fetch = async () => {
      //   props.Pid.map(async(item)=>{    setCArt([...CArt,await GetMyCart(item)])
      //   })
      setCArt(await GetMyCart(props.Pid));
      // // setCArt([...CArt,await GetMyCart(props.Pid)])
    };
    Fetch();
  }, []);
  console.log("DAas" + JSON.stringify(CArt.image));
  return (
    <View>
      {CArt ? (
        <LinearGradient
          colors={["#474747", "#474747", "#202020"]}
          style={styles.tab}
          start={{ x: 1.3, y: 1.3 }}
          //key={item.id}
        >
          <Grid
          // onPress={() =>
          //   navigation.navigate("Product", {
          //     name: item.product_name,
          //     description: item.description,
          //     uri1: item.uri1,
          //     know_more: item.know_more,
          //     price: item.price,
          //   })
          // }
          // key={item.id}
          >
            <Row>
              <Col size={30}>
                {CArt.image ? (
                  <Image source={{ uri: CArt.image[0] }} style={styles.image} />
                ) : null}
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
                <Row style={{ alignSelf: "center", marginLeft: 10 }}>
                  <Col size={110} style={{ alignSelf: "center" }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: COLORS.font,
                      }}
                    >
                      {CArt.name}
                    </Text>
                    <Text style={{ color: COLORS.font }}>Item Code : BN1</Text>
                  </Col>
                  <Col size={40}>
                    <TouchableWithoutFeedback
                      onPress={() => DeleteFromCart(CArt.id)}
                    >
                      <Text style={{ color: "red" }}>Delete</Text>
                    </TouchableWithoutFeedback>
                  </Col>
                </Row>
                <Row>
                  <Col size={20}>
                    <Text style={{ color: COLORS.font }}>$ 100 x</Text>
                  </Col>
                  <Col size={50}>
                    <Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.black1,
                          margin: 2,
                          padding: 2,
                        }}
                      >
                        <Text style={{ color: COLORS.font }}>
                          Quantity : 10
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={{ color: COLORS.font }}>= $1000</Text>
                      </TouchableOpacity>
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </LinearGradient>
      ) : null}
      {/* <Text>{"\n"}</Text> */}
    </View>
  );
};

export default CartList;

const styles = StyleSheet.create({
  tab: {
    //zIndex: 1,
    marginTop: 10,
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
  image: {
    width: 110,
    height: 120,
    margin: 5,
    borderRadius: 13,
  },
});
