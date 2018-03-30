// @flow

import React, { Component } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

class Spinner extends Component<{}> {
  componentWillMount() {
    this.opacityValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.opacityValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease
    }).start();
    this.animation.play();
  }

  render() {
    return (
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: this.opacityValue,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          source={require("../assets/animations/spinner.json")}
        />
      </Animated.View>
    );
  }
}

export default Spinner;
