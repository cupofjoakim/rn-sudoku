// @flow

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
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
  }

  render() {
    let board = this.state.puzzle ? (
      <Board puzzle={this.state.puzzle} />
    ) : (
      <View />
    );
    let spinner = this.state.loading ? <Spinner /> : <View />;
    return (
      <View>
        {spinner}
        <Animated.View style={{ top: this.boardOffset }}>{board}</Animated.View>
      </View>
    );
  }
}

export default GameScreen;
