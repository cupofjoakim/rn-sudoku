// @flow

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions
} from "react-native";
import Board from "../components/Board";
import Spinner from "../components/Spinner";
import SudokuHandler from "./../services/SudokuHandler";

class GameScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.sudokuHandler = new SudokuHandler();
    this.state = {
      loading: true,
      puzzle: null
    };
    this.finishLoading = this.finishLoading.bind(this);
    var { height, width } = Dimensions.get("window");
    this.boardOffset = new Animated.Value(height);
  }

  componentDidMount() {
    let that = this;
    setTimeout(function() {
      that.finishLoading();
    }, 1000);
  }

  finishLoading() {
    this.setState({
      loading: false,
      puzzle: this.sudokuHandler.getPuzzle(5)
    });
    Animated.timing(this.boardOffset, {
      toValue: 0,
      duration: 450,
      easing: Easing.elastic(1)
    }).start();
  }

  render() {
    let board = this.state.puzzle ? (
      <Board puzzle={this.state.puzzle} />
    ) : (
      <View />
    );
    return (
      <View>
        <Animated.View style={{ top: this.boardOffset }}>{board}</Animated.View>
      </View>
    );
  }
}

export default GameScreen;
