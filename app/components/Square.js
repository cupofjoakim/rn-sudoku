// @flow

import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";

class Square extends Component<{}> {
  constructor(props) {
    super(props);
  }

  constructSquareStyle() {
    let applicableStyles = [styles.baseSquare];
    if ([2, 5].includes(this.props.digitIndex)) {
      applicableStyles.push({ marginRight: this.props.extraMargin });
    }
    switch (this.props.status) {
      case "wrong":
        applicableStyles.push({ backgroundColor: "red" });
        break;
      case "locked":
        applicableStyles.push({ backgroundColor: "grey" });
        break;
      case "selected":
        applicableStyles.push({ backgroundColor: "blue" });
        break;
      case "highlighted":
        applicableStyles.push({ backgroundColor: "aqua" });
        break;
    }
    return applicableStyles;
  }

  constructTextStyle() {
    return {
      color: ["wrong", "locked", "selected", "highlighted"].includes(
        this.props.status
      )
        ? "white"
        : "black"
    };
  }

  render() {
    let squareStyle = this.constructSquareStyle();
    let textStyle = this.constructTextStyle();

    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View aspectRatio={1} style={squareStyle}>
          <Text style={textStyle}>
            {this.props.digit == 0 ? null : this.props.digit}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

var styles = StyleSheet.create({
  baseSquare: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Square;
