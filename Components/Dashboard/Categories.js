import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/AntDesign";
import { Container } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { FONTS, SIZES, COLORS } from "../../Assets/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const Categories = ({ navigation, route }) => {
  const [categories] = useState(route.params.datum);
  const [value, onChangeText] = React.useState("Search");

  useEffect(() => {
    console.log(categories);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#000000", "#474747"]}
        style={{
          // borderBottomRightRadius: 35,
          // borderBottomLeftRadius: 35,
          // paddingBottom: "0%",
          elevation: 0.8,
          //flex:1
          //top:0,bottom:0
          position: "relative",
          left: 0,
          right: 0,
          top: 0,
          height: SIZES.height,
        }}
        start={{ x: 0.9, y: 0.25 }}
      >
        <ScrollView>
          <LinearGradient
            colors={["#4d4b50", "#020001"]}
            style={{
              paddingBottom: "12%",
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
            }}
            start={{ x: 0.9, y: 0.4 }}
          >
            <View>
              <View style={{ ...styles.profile }}>
                <Grid style={{ justifyContent: "space-between" }}>
                  <Row>
                    <Col>
                      <Row>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Profiles")}
                        >
                          <Image
                            source={require("../../Assets/download.png")}
                            style={{
                              width: 35,
                              height: 35,
                              margin: 5,
                              borderRadius: 100,
                            }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            margin: 5,
                            color: "white",
                          }}
                        >
                          Howdy!Gautham
                        </Text>
                      </Row>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>

                    <Col>
                      <Row>
                        <Text>
                          <Col>
                            <TouchableOpacity style={{ marginRight: 5 }}>
                              <Text
                                onPress={() =>
                                  navigation.navigate("Favourites")
                                }
                              >
                                <Icon name="heart" size={25} color="#FF0707" />
                              </Text>
                            </TouchableOpacity>
                          </Col>
                          <Col>
                            <Text
                              onPress={() => navigation.navigate("Cart")}
                              style={{ marginLeft: 10 }}
                            >
                              <Icon
                                name="shoppingcart"
                                size={25}
                                color="#FFF"
                              />
                            </Text>
                          </Col>
                        </Text>
                      </Row>
                    </Col>
                  </Row>
                </Grid>
              </View>
              <TextInput
                style={styles.textinput}
                onChangeText={(text) => onChangeText(text)}
                value={value}
              />
            </View>
          </LinearGradient>

          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              margin: 5,
              color: COLORS.font,
            }}
          >
            Select a Category
          </Text>
          <Grid>
            <Col>
              {categories.slice(0, 4).map((item) => (
                <TouchableOpacity
                  style={{
                    zIndex: 1,
                    marginTop: 20,
                    marginLeft: "5%",
                    marginRight: "10%",
                    width: "85%",
                    alignItems: "center",
                    borderRadius: 10,
                    padding: 15,
                    // backgroundColor: getRandomColor(),
                    borderWidth: 1,
                    borderColor: "gray",
                  }}
                  onPress={() =>
                    navigation.navigate("lists", {
                      name: item.datum_name,
                      category_data: item.category_data,
                    })
                  }
                  key={item.key}
                >
                  <Text style={styles.texts}>{item.datum_name}</Text>
                </TouchableOpacity>
              ))}
            </Col>
            <Col>
              {categories.slice(5, 9).map((item) => (
                <TouchableOpacity
                  style={{
                    zIndex: 1,
                    marginTop: 20,
                    marginLeft: "5%",
                    marginRight: "10%",
                    width: "85%",
                    alignItems: "center",
                    borderRadius: 10,
                    padding: 15,
                    // backgroundColor: getRandomColor(),
                    borderWidth: 1,
                    borderColor: "gray",
                  }}
                  onPress={() =>
                    navigation.navigate("lists", {
                      name: item.datum_name,
                      category_data: item.category_data,
                    })
                  }
                  key={item.key}
                >
                  <Text style={styles.texts}>{item.datum_name}</Text>
                </TouchableOpacity>
              ))}
            </Col>
          </Grid>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};
// console.log(item.category_data)
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#414141",
  },
  profile: {
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
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
  },
  texts: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.font,
  },
});

export default Categories;
