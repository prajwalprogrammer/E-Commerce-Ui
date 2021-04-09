import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import Text from '../../Components/Dashboard/MyText';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import { COLORS, FONTS, SIZES } from '../../Assets/theme';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { CartContext } from '../../Components/GlobalContext/CartProvider';
import { GlobalContext } from '../../Components/Contaxt/GlobalState';
import { AddOrder, GetUserDetails } from '../../Components/Dashboard/AxiosUrl';
import AsyncStorage from '@react-native-community/async-storage';
import { RadioButton } from 'react-native-paper';

const Checkout = (props) => {
  const { transations } = React.useContext(GlobalContext);
  const { Profile, setProfile } = React.useContext(CartContext);
  const [date, setDate] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(true);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [Time, setTime] = useState(null);
  const [checked, setChecked] = React.useState('first');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      if (currentDate > new Date()) {
        setDate(currentDate);
      } else {
        alert('Wrong Date Selected');
      }
    }
    if (mode === 'time') {
      setTime(currentDate);
    }
  };

  const OrderPurchase = async () => {
    var FinalDate;
    if (!toggleCheckBox2 && date === null) {
      alert('Select Date And Time');
      return;
    }
    toggleCheckBox2
      ? (FinalDate = moment(new Date()).format('lll'))
      : (FinalDate = moment(date).format('lll'));

    await AddOrder(
      transations,
      Profile.id,
      Profile.AccountName,
      FinalDate,
      props.amount,
      toggleCheckBox2 ? 'Delivery' : 'PickUp',
      Profile
    ).then(async (res) => {
      // console.log(res),
      setProfile(await GetUserDetails(await AsyncStorage.getItem('UserID')));
      props.Nav.navigate('Finalscreen', {
        isdelivery: toggleCheckBox2 ? true : false,
        Date: moment(date).format('ll'),
      });
    });
  };
  //

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    
      <ScrollView style={{}}>
        <LinearGradient
          colors={[COLORS.black, COLORS.black, COLORS.black1]}
          style={{
            ...styles.innercontainer,
            backgroundColor: '#000000',
            borderRadius: 30,
            borderColor: '#000000',
            borderWidth: 3,
          }}>
          <View>
            <Grid>
              <Row style={{ marginTop: 10, marginBottom: 10 }}>
                <Text>I'd Like :</Text>
              </Row>

              <Row style={{ marginTop: 10, marginBottom: 15 }}>
                <Col>
                  <Row
                    style={{
                      backgroundColor: COLORS.black1,
                      borderRadius: 10,
                      width: '80%',
                      padding: 2,
                    }}>
                    <Col size={20}>
                      <RadioButton
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked('first'), setToggleCheckBox2(false);
                        }}
                        uncheckedColor="#ffffff"
                      />
                    </Col>
                    <Col size={35}>
                      <Text style={{ fontSize: 20, color: COLORS.font }}>
                        PickUp
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Row
                  style={{
                    backgroundColor: COLORS.black1,
                    borderRadius: 10,
                    width: '80%',
                    padding: 2,
                  }}>
                  <Col size={20}>
                    <RadioButton
                      value="second"
                      status={checked === 'second' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked('second'), setToggleCheckBox2(true);
                      }}></RadioButton>
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
                      }}>
                      <Text style={{ color: COLORS.font }}>
                        {Profile.Contact[0].Address}
                      </Text>
                    </View>

                    <View
                      style={{
                        //  backgroundColor: "#000000",
                        padding: 10,
                        margin: 10,
                        marginBottom: 30,
                      }}>
                      <Text style={{ color: COLORS.font }}>
                        If you have a change in Address, Please update it from
                        your App profile from Homepage.
                      </Text>
                    </View>
                  </View>
                </Row>
              ) : (
                <View style={{ justifyContent: 'center', right: 22 }}>
                  <Text>{'\n'}</Text>

                  <View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#759CFF',
                        width: '50%',
                        marginLeft: 100,
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 10,
                        alignItems: 'center',
                      }}
                      onPress={showDatepicker}>
                      <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                        {date ? moment(date).format('ll') : 'Choose Date'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#759CFF",
                      width: "50%",
                      marginLeft: 100,
                      padding: 10,
                      borderRadius: 10,
                      marginBottom: 10,
                      alignItems: "center",
                    }}
                    onPress={showTimepicker}
                  >
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                      {Time ? moment(Time).format("LT") : "Choose Time"}
                    </Text>
                  </TouchableOpacity>
                </View> */}
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date()}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
              )}
            </Grid>

            <Text>{'\n'}</Text>
          </View>
          <TouchableOpacity onPress={OrderPurchase}>
            <LinearGradient
              colors={['#80edb2', '#5dd394']}
              style={styles.signIn}>
              <Text style={{ ...styles.TextSign, color: 'white' }}>
                Confirm
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  containergrid: {
    backgroundColor: '#414141',
  },
  innercontainer: {
    margin: 20,
    backgroundColor: '#DADADA',
    padding: 10,
    //height:400
  },
  signIn: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  TextSign: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default Checkout;
