import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Text, View, SafeAreaView } from "react-native";

import Carousel from "react-native-snap-carousel";
import { daily_data, RenderItem } from "./Daily";

export default class DAily1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  _renderItem({ item, index }) {
    return (
      <RenderItem data={item} navigation={this.props.navigation} />
    );
  }

  render() {
    console.log("DAilyItem" + JSON.stringify(this.props.DAilyItem[0]));
    return (
     
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Carousel
          layout={"default"}
          ref={(ref) => (this.carousel = ref)}
          // data={daily_data}
          data={this.props.DAilyItem}
          sliderWidth={300}
          itemWidth={300}
          renderItem={this._renderItem.bind(this)}
          onSnapToItem={(index) => this.setState({ activeIndex: index })}
        />
      </View>
    );
  }
}
