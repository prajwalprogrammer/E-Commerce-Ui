import * as React from "react";
import { Text, View, SafeAreaView } from "react-native";

import Carousel from "react-native-snap-carousel";
import { daily_data, renderItem } from "./Daily";

export default class DAily1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  _renderItem({ item, index }) {
    return (
      <View
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          height: 250,
          padding: 50,
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  }

  render() {
    return (
      // <SafeAreaView
      //   style={{ flex: 1, backgroundColor: "#6a5acd", paddingTop: 20,paddingHorizontal:10 }}
      // >
        <View
          style={{ flex: 1,paddingTop: 20,paddingHorizontal:10 , flexDirection: "row", justifyContent: "center" }}
        >
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={daily_data}
            sliderWidth={300}
            itemWidth={300}
            renderItem={renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </View>
      // </SafeAreaView>
    );
  }
}
