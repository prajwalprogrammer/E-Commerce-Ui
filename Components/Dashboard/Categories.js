import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import Text from './MyText'
import { SIZES, COLORS } from "../../Assets/theme";
import { SearchBar } from "react-native-elements";
import { GetMyCart, ReadAllProducts } from "./AxiosUrl";
import { ScrollView } from "react-native-gesture-handler";
import { GlobalContext } from "../Contaxt/GlobalState";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Container } from "native-base";
const SLIDER_WIDTH = Dimensions.get("window").width;
const Categories = ({ navigation }) => {
  const { transations, addTransaction } = React.useContext(GlobalContext);
  const [search, setsearch] = React.useState("");
  const [DATA, setDATA] = React.useState([]);
  const [DummyData, setDummyData] = React.useState([]);
  React.useEffect(() => {
    const fetchit = async () => {
      setDATA(await ReadAllProducts());
    };
    fetchit();
  }, []);
  const updateSearch = async (search1) => {
    await setDummyData(DATA);

    setsearch(search1);
    //var SEarchItem=DATA?DATA:null;

    setDATA(
      DATA.filter((e) => e.name.toLowerCase().includes(search1.toLowerCase()))
    );
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
          backgroundColor: '#474747',
          paddingTop: Platform.OS === 'android' ? 0 : 0,
        }}>
        <StatusBar barStyle="light-content" backgroundColor="#4d4b50" />
    <Container>
      <SearchBar
        disabled={DATA ? false : true}
        placeholder="Search Here..."
        onChangeText={updateSearch}
        value={search}
        round={true}
        containerStyle={{ backgroundColor: COLORS.black }}
        placeholderTextColor={COLORS.font}
        onClear={() => setDATA(DummyData)}
        inputStyle={{ color: COLORS.font }}
        searchIcon={false}
      />

      <LinearGradient
        colors={["#000000", "#474747"]}
        style={{
          // borderBottomRightRadius: 35,
          // borderBottomLeftRadius: 35,
          paddingBottom:  Platform.OS === 'android' ? "15%" : "25%",
          elevation: 0.8,
          position: "relative",
          left: 0,
          right: 0,
          top: 0,
          bottom:0,
          height: SIZES.height,
        }}
        start={{ x: 0.9, y: 0.25 }}
      >
        <ScrollView style={{ marginBottom: 50 }}>
          {DATA
            ? DATA.map((item) => {
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
                                item.price - (item.price * item.discount) / 100
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
                            <View style={{flexDirection:'row'}}>
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
                          {N1 ? (
                            <TouchableWithoutFeedback
                              onPress={() => navigation.navigate("Report")}
                            >
                              <View style={styles.tab2}>
                                <Text style={styles.texts2}>Go to Cart</Text>
                              </View>
                            </TouchableWithoutFeedback>
                          ) : (
                            <TouchableWithoutFeedback
                              onPress={() => onsubmit1(item.id)}
                            >
                              <View style={styles.tab2}>
                                <Text style={styles.texts2}>Add To Cart</Text>
                              </View>
                            </TouchableWithoutFeedback>
                          )}
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
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#414141",
  },
  tab: {
    alignSelf: "center",
    zIndex: 1,
    marginTop: 10,
    //marginBottom:15,
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
