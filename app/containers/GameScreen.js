// @flow

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Board from "../components/Board";
import Spinner from "../components/Spinner";

class GameScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.finishLoading = this.finishLoading.bind(this);
  }

  finishLoading() {
    this.setState({
      loading: false
    });
  }

  render() {
    let spinnerContainer = <View />;
    if (this.state.loading) {
      spinnerContainer = (
        <View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "#3697d3",
              justifyContent: "center",
              alignContent: "center"
            }
          ]}
        >
          <Spinner />
        </View>
      );
    }
    return (
      <View style={StyleSheet.absoluteFill}>
        <View>
          <Text>Puzzle</Text>
          <Board
            onLoadingComplete={() => {
              this.finishLoading();
            }}
          />
        </View>
        {spinnerContainer}
      </View>
    );
  }
}

export default GameScreen;
