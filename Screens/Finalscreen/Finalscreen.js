import React, { useState, useEffect } from "react";
import {
  View,
  
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
} from "react-native";
import Text from '../../Components/Dashboard/MyText'
import { Col, Row, Grid } from "react-native-easy-grid";
import { GlobalContext } from "../../Components/Contaxt/GlobalState";
import { CartContext } from "../../Components/GlobalContext/CartProvider";
import { Button } from "native-base";
const FinalScreen = ({ navigation, route }) => {
  const { Profile } = React.useContext(CartContext);
  const { UpdateTransaction } = React.useContext(GlobalContext);
  const [isdelivery] = useState(route.params.isdelivery);
  useEffect(() => {
    let newArray = [];
    UpdateTransaction(newArray);
    BackHandler.addEventListener(
      "hardwareBackPress",
      () => navigation.navigate("Dashboard"),
      true
    );
    return () =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        () => navigation.navigate("Dashboard"),
        true
      );
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "#000000" }}>
      <Image
        source={require("../../Assets/Banner.png")}
        style={{
          width: 350,
          height: 370,
          marginTop: 130,
          marginLeft: 20,
          justifyContent: "center",
          alignSelf: "center",
        }}
      />

      {/* {isdelivery ?<> */}
      <View
        style={{
          position: "absolute",
          top: 240,
          left: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Dear Customer</Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 260,
          left: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          Order Confirmation{"\n"} {Profile ? Profile.AccountName : null}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 300,
          left: 40,
          justifyContent: "center",
          alignItems: "center",
          width: 180,
        }}
      >
        <Text>
          Thank you for your business.
          {isdelivery
            ? `Your order will be delivered to ${Profile.Contact[0].Address}`
            : `Your order will be ready for pick by ${route.params.Date}`}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 400,
          left: 40,
          justifyContent: "center",
          alignItems: "center",
          width: 180,
        }}
      >
        <Text>
          Please reach out to us if you have any questions or concerns about
          this order.{" "}
        </Text>
      </View>
      <Image
        source={require("../../Assets/Tick.png")}
        style={{ width: 180, height: 180, marginLeft: 120 }}
      />
      <Button light full rounded style={{width:"80%",alignSelf:'center'}} onPress={()=>{navigation.navigate("Cart"),navigation.navigate("Dashboard")}}>
        <Text  style={{fontWeight:'bold',fontSize:25}}> Go To Home </Text>
      </Button>

      {/* </>:<></>} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#414141",
  },
});

export default FinalScreen;
