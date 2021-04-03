import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
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
import { Read } from "./AxiosUrl";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CartContext } from "../GlobalContext/CartProvider";
const Allproduct = ({ navigation, route }) => {
  const {Profile} = React.useContext(CartContext)
  const [Visible, setVisible] = useState(null)
  const [DATA, setDATA] = React.useState([])
  React.useEffect(() => {
    setVisible(true)
    const fetchAPI = async () => {
      setDATA(await Read());
      console.log(DATA);
    };
    fetchAPI();
    if(DATA){
      setVisible(false)}
  }, []);
  return (
    <Container>
      <Header style={{ backgroundColor: "#202020", elevation: 12, height: 80 }} androidStatusBarColor="#202020" >
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
            All Products
          </Title>
          <Subtitle style={{ fontSize: 11, color: COLORS.font }}>
          {Profile ? Profile.AccountName : "CLUS Pvt Ltd."}
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
          {Visible?
        <ActivityIndicator
          size="large"
          color="#ffffff"
          animating={true}
          style={{justifyContent:'center',alignSelf:'center'}}
        />:null}
         <Grid>
          <Col>
            {DATA
              ? DATA.map((item) => {
                  return (
                    <TouchableWithoutFeedback
                      style={{
                        zIndex: 1,
                        marginTop: 20,
                        marginLeft: "5%",
                        marginRight: "10%",
                        width: "85%",
                        alignItems: "center",
                        borderRadius: 10,
                        padding: 15,
                        borderWidth: 1,
                        borderColor: "gray",
                      }}
                      onPress={() =>
                        navigation.navigate("lists", {
                          category_id: item.id,
                        })
                      }
                      key={item.id}
                    >
                      <Text style={styles.texts}>{item.name}</Text>
                    </TouchableWithoutFeedback>
                  );
                })
              : null}
          </Col>
        </Grid>
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
    alignSelf:'center',
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
    backgroundColor: "#DBA800",//"#D3A708",
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

export default Allproduct;
