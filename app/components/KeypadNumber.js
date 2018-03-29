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
          aspectRatio={1}
          style={{
            flex: 1,
            backgroundColor: "blue",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "white" }}>{this.props.digit}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default KeypadNumber;
