// @flow

import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

class KeypadNumber extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={{
            flex: 1,
            marginRight: 5,
            marginLeft: 5,
            backgroundColor: "blue",
            height: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text>{this.props.digit}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default KeypadNumber;
