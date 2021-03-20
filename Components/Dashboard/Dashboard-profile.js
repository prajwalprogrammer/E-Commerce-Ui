import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

const Dashboard_profile = ({ navigation }) => {
  const [value, onChangeText] = React.useState("Search");

  return (
    <View>
      <View style={styles.profile}>
        <Grid>
          <Row>
            <Col>
              <Row>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Profiles")}
                >
                  <Image
                    source={require("../../Assets/Customer.png")}
                    style={{ width: 50, height: 50, margin: 5 }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    margin: 5,
                  }}
                >
                  Howdy! Gautham
                </Text>
              </Row>
            </Col>
            <Col></Col>
            <Col>
              <Row>
                <Image
                  source={require("../../Assets/Redheart.png")}
                  style={{ width: 40, height: 40, margin: 5 }}
                />
                <Image
                  source={require("../../Assets/Cart.png")}
                  style={{ width: 40, height: 40, margin: 5 }}
                />
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
  );
};

const styles = StyleSheet.create({
  profile: {
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  textinput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
});

export default Dashboard_profile;
