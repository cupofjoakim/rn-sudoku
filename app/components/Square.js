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

    // This is hella ugly
    if (this.props.rowIndex == 0) {
      if (this.props.digitIndex == 0) {
        applicableStyles.push({ borderTopLeftRadius: 5 });
      } else if (this.props.digitIndex == 8) {
        applicableStyles.push({ borderTopRightRadius: 5 });
      }
    }
    if (this.props.rowIndex == 8) {
      if (this.props.digitIndex == 0) {
        applicableStyles.push({ borderBottomLeftRadius: 5 });
      } else if (this.props.digitIndex == 8) {
        applicableStyles.push({ borderBottomRightRadius: 5 });
      }
    }
    switch (this.props.status) {
      case "wrong":
        applicableStyles.push({ backgroundColor: "#F28282" });
        break;
      case "selected":
        applicableStyles.push({ backgroundColor: "#3697D3" });
        break;
      case "locked":
        applicableStyles.push({ backgroundColor: "transparent" });
        break;
      case "highlighted":
        applicableStyles.push({ backgroundColor: "#82F0F2" });
        break;
    }
    return applicableStyles;
  }

  constructTextStyle() {
    return {
      color: ["wrong", "selected", "locked"].includes(this.props.status)
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
    backgroundColor: "white",
    margin: 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Square;
