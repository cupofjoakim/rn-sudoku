// @flow

import React, { Component } from 'react';
import { View, Animated, Easing, Dimensions } from 'react-native';
import Board from '../components/Board';
import SudokuHandler from './../services/SudokuHandler';

class GameScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.sudokuHandler = new SudokuHandler();
    this.state = {
      loading: true,
      puzzle: null,
    };
    this.finishLoading = this.finishLoading.bind(this);
    const { height, width } = Dimensions.get('window');
    this.boardOffset = new Animated.Value(height);
  }

  componentDidMount() {
    const that = this;
    setTimeout(() => {
      that.finishLoading();
    }, 1000);
  }

  finishLoading() {
    this.setState({
      loading: false,
      puzzle: this.sudokuHandler.getPuzzle(5),
    });
    Animated.timing(this.boardOffset, {
      toValue: 0,
      duration: 450,
      easing: Easing.elastic(1),
    }).start();
  }

  render() {
    const board = this.state.puzzle ? <Board puzzle={this.state.puzzle} /> : <View />;
    return (
      <View>
        <Animated.View style={{ top: this.boardOffset }}>{board}</Animated.View>
      </View>
    );
  }
}

export default GameScreen;
