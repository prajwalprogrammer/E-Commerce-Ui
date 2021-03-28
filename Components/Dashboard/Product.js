import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NumericInput from "react-native-numeric-input";
import { COLORS, FONTS, SIZES } from "../../Assets/theme";
import { LinearGradient } from "expo-linear-gradient";
import { SliderBox } from "react-native-image-slider-box";
import { CartContext } from "../GlobalContext/CartProvider";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Product = ({ navigation, route }) => {
  const [value, setvalue] = useState(1);
  // useEffect(()=>{console.log(route.params.description)},[])
  const { CheckTheProduct, user, AddToCart } = useContext(CartContext);
  var N1 = JSON.stringify(user).includes(route.params.Pid);

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
            {" "}
            {route.params.name}
          </Text>
          <Text style={{ fontSize: 20, color: "white" }}>
            {" "}
            $ {route.params.price}
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
            <TouchableWithoutFeedback
              style={styles.tab1}
              onPress={() =>
                {N1?navigation.navigate("Cart"):AddToCart(route.params.Pid)}}
            >
              {/* <Text style={styles.texts}>Add to Cart</Text> */}
              {N1 ? (
                <Text style={styles.texts}>Go to Cart</Text>
              ) : (
                <Text style={styles.texts}>Add To Cart</Text>
              )}
            </TouchableWithoutFeedback>
          </Col>
          <Col>
            <View style={styles.tab2}>
              <NumericInput
                textColor="white"
                rounded
                type="up-down"
                minValue={1}
                maxValue={route.params.Quantity}
                onChange={(value) => console.log(value)}
              />
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
