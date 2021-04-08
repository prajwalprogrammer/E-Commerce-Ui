import React, { useState ,useEffect} from "react";
import {Text} from 'react-native'
export default (props) => (
  <Text {...props} style={[{ fontFamily: "sans-serif-condensed" }, props.style]}>
    {props.children}
  </Text>
);
