// @flow

import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import KeypadNumber from "./KeypadNumber";

class Keypad extends Component<{}> {
  render() {
    return (
      <View
        style={{
          marginTop: 40,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
        height={40}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
          return (
            <KeypadNumber
              key={num}
              digit={num}
              onPress={() => this.props.onKeypadNumberPressed(num)}
            />
          );
        })}
      </View>
    );
  }
}

export default Keypad;
