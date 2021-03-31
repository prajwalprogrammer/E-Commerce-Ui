import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

import { TextInput } from "react-native-gesture-handler";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import Checkout from "./Checkout";
import { COLORS, FONTS, SIZES } from "../../Assets/theme";

const CheckoutModal = ({ navigation }) => {
  const [Amount, setAmount] = useState("");
  const [Price, setPrice] = useState(0);
  const [state1, setstate] = useState(true);
  const newTransaction = {
    // id:user.uid,
    id: Math.floor(Math.random() * 10000000),
    text: Amount,
    amount: +Price,
  };
  const displayModal = (show) => {
    setstate(show);

    navigation.goBack();
  };
  const changeText = (txt) => {
    setPrice(txt);
  };
  const GoToTrial = async () => {
    console.log(state1);
    console.log(Amount + Price);
    // AddTransaction();
    AddDB(Amount, Price, user.uid).then(
      (res) => addTransaction(newTransaction),
      console.log(transations)
    );
    // const actual=ReadDb(user.uid);
    // addTransaction(...actual,JSON.stringify(actual));
    //     console.log("new: "+JSON.stringify(transations))

    // console.log("object")
  };
  return (
    <View style={styles.container}>
      {/* <Modal
        testID={"modal"}
        isVisible={state1}
        onSwipeComplete={() => displayModal(!state1)}
        swipeDirection={["up", "left", "right", "down"]}
        style={styles.view1}
      > */}
      <View style={styles.header}>
        <Text style={styles.Text}>Order Confirmation</Text>
      </View>
      <LinearGradient
        colors={[COLORS.black1, COLORS.black]}
        style={styles.footer}
      >
        <Animatable.View animation="fadeInUpBig">
          <Checkout Nav={navigation} />
          {/* <Text style={styles.TextFooter}>Remark</Text>

          <View style={styles.Action}>
            
          <TextInput
              placeholder="Remark"
              style={styles.TextInput}
              onChangeText={(txt) => setAmount(txt)}
              />
              </View>
              <Text style={{ ...styles.TextFooter, marginTop: 35 }}>Amount</Text>
              <View style={styles.Action}>
              
              <TextInput
              placeholder="Amount"
              style={styles.TextInput}
              onChangeText={(txt) => setPrice(txt)}
              />
              </View>

          <View style={styles.Button1}>
          <TouchableOpacity onPress={() => GoToTrial()}>
          <LinearGradient
          colors={["#5db8fe", "#39cff2"]}
          style={styles.signIn}
          >
          <Text style={{ ...styles.TextSign, color: "white" }}>
          Add Transaction
          </Text>
          </LinearGradient>
          </TouchableOpacity>
          </View>
          <Text
          style={styles.closeText}
          onPress={() => {
            displayModal(!state1);
          }}
          >
          Close Modal
          </Text>
        */}
        </Animatable.View>
      </LinearGradient>
      {/* <Text
          style={styles.closeText}
          onPress={() => {
            displayModal(!state1);
          }}>
          Close Modal
        </Text> */}
      {/* </Modal> */}
    </View>
  );
};
export default CheckoutModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.black,
  },
  closeText: {
    fontSize: 24,
    color: "#00479e",
    textAlign: "center",
    paddingTop: "10%",
  },
  view1: {
    // paddingBottom: "-30%",
  },
  footer: {
    flex: 3,
    // backgroundColor: "#000000",
    borderTopLeftRadius: 30,
    // borderBottomLeftRadius: 30,
    //borderBottomRightRadius: 30,

    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  Button1: {
    alignItems: "center",
    marginTop: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  TextSign: {
    fontSize: 25,
    fontWeight: "bold",
  },
  Text: {
    color: COLORS.font,
    fontWeight: "bold",
    fontSize: 35,
  },
  TextFooter: {
    color: "#05375a",
    fontSize: 18,
  },
  TextInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  Action: {
    marginTop: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
    // paddingBottom: 50,
  },
});
