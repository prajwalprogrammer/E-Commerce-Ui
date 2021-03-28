import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckBox from "@react-native-community/checkbox";
import { COLORS, FONTS, SIZES } from "../../Assets/theme";
import { LinearGradient } from "expo-linear-gradient";

const Checkout = (props) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  return (
    <ScrollView style={{}}>
      <LinearGradient
        colors={[COLORS.black,COLORS.black, COLORS.black1]}
        style={{
          ...styles.innercontainer,
          backgroundColor: "#000000",
          borderRadius: 30,
          borderColor:'#000000',
          borderWidth:3
        }}
      >
        <View>
          <Grid>
            <Row style={{ marginTop: 10, marginBottom: 10 }}>
              <Text>I'd Like :</Text>
            </Row>

            <Row style={{ marginTop: 10, marginBottom: 15 }}>
              <Col>
                <Row
                  style={{
                    // backgroundColor: "#000000",
                    borderRadius: 10,
                    width: "80%",
                    padding: 2,
                  }}
                >
                  <Col size={10}>
                    <CheckBox
                      disabled={false}
                      value={toggleCheckBox1}
                      onValueChange={(newValue) => {
                        setToggleCheckBox1(newValue);
                        setToggleCheckBox2(false);
                      }}
                      tintColors="#ffffff"
                      style={{borderColor:"#ffffff"}}
                    />
                  </Col>
                  <Col size={30}>
                    <Text style={{ fontSize: 20, color: COLORS.font }}>
                      Pick up
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Row
                style={{
                  // backgroundColor: "#000000",
                  borderRadius: 10,
                  width: "80%",
                  padding: 2,
                }}
              >
                <Col size={10}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox2}
                    onValueChange={(newValue) => {
                      setToggleCheckBox2(newValue);
                      setToggleCheckBox1(false);
                    }}
                    tintColors="#ffffff"

                  />
                </Col>
                <Col size={30}>
                  <Text style={{ fontSize: 20, color: COLORS.font }}>
                    Delivery
                  </Text>
                </Col>
              </Row>
            </Row>
            {toggleCheckBox2 ? (
              <Row>
                <View style={{}}>
                  <TouchableOpacity style={{ padding: 10 }}>
                    <Text style={{ fontSize: 16, color: COLORS.font }}>
                      Your Order Will be deliverd to:
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      // backgroundColor: "#000000",
                      padding: 10,
                      margin: 10,
                      marginBottom: 30,
                    }}
                  >
                    <Text style={{ color: COLORS.font }}>
                      3131 South West 89 Street, okhlahoma 73159
                    </Text>
                  </View>

                  <View
                    style={{
                      //  backgroundColor: "#000000",
                      padding: 10,
                      margin: 10,
                      marginBottom: 30,
                    }}
                  >
                    <Text style={{ color: COLORS.font }}>
                      If you have a change in Address, Please update it from
                      your App profile from Homepage.
                    </Text>
                  </View>
                </View>
              </Row>
            ) : (
              <View>
                <Text>{"\n"}</Text>

                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#759CFF",
                      width: 110,
                      marginLeft: 100,
                      padding: 10,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                    onPress={showDatepicker}
                  >
                    <Text>Choose Date</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#759CFF",
                      width: 110,
                      marginLeft: 100,
                      padding: 10,
                      borderRadius: 10,
                    }}
                    onPress={showTimepicker}
                  >
                    <Text>Choose Time</Text>
                  </TouchableOpacity>
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            )}
          </Grid>

          <Text>{"\n"}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            props.Nav.navigate("Finalscreen", {
              isdelivery: toggleCheckBox2 ? true : false,
            })
          }
          // style={{
          //   alignSelf: "center",
          //   backgroundColor: "#35B551",
          //   justifyContent:'center',
          //   width: 100,
          //   margin: 10,
          //   //marginLeft: 140,
          //   padding: 10,
          //   borderRadius: 10,
          // }}
        >
          <LinearGradient
          colors={["#7C9387","#2C5140"]}
          style={styles.signIn}
          >
          <Text style={{ ...styles.TextSign, color: "white" }}>
          Confirm
          </Text>
          </LinearGradient>
          {/* <Text style={{ fontSize: 16,alignSelf:'center' }}>Confirm</Text> */}
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containergrid: {
    backgroundColor: "#414141",
  },
  innercontainer: {
    margin: 20,
    backgroundColor: "#DADADA",
    padding: 10,
    //height:400
  },
  signIn: {
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  TextSign: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf:'center'
  },
});

export default Checkout;
