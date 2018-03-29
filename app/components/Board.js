// @flow

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Square from "./Square";
import Keypad from "./Keypad";
import SudokuHandler from "./../services/SudokuHandler";

const sudokuHandler = new SudokuHandler();

class Board extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      currentPuzzle: JSON.parse(
        JSON.stringify(sudokuHandler.getPuzzle(5).puzzle)
      ),
      hightlighted: {
        group: null,
        row: null
      }
    };
    this.keyPadPressed = this.keyPadPressed.bind(this);
  }

  endGame() {
    console.log("Game won!");
  }

  keyPadPressed(num) {
    if (
      this.state.selected == {} ||
      this.squareIsBeLocked(
        this.state.selected.digitIndex,
        this.state.selected.rowIndex
      )
    ) {
      return;
    }
    let modifiedPuzzle = this.state.currentPuzzle.slice(0);
    modifiedPuzzle[this.state.selected.rowIndex][
      this.state.selected.digitIndex
    ] = num;
    this.setState({
      currentPuzzle: modifiedPuzzle
    });
    if (sudokuHandler.getPuzzle(5).solution == this.state.currentPuzzle) {
      this.endGame();
    }
  }

  selectDigit(digitIndex, rowIndex) {
    if (
      this.squareIsSelected(digitIndex, rowIndex) ||
      this.squareIsBeLocked(digitIndex, rowIndex)
    ) {
      this.setState({
        selected: {}
      });
    } else {
      this.setState({
        selected: {
          rowIndex: rowIndex,
          digitIndex: digitIndex
        }
      });
    }
  }

  squareIsSelected(digitIndex, rowIndex) {
    return (
      this.state.selected.rowIndex == rowIndex &&
      this.state.selected.digitIndex == digitIndex
    );
  }

  squareIsBeLocked(digitIndex, rowIndex) {
    return sudokuHandler.getPuzzle(5).puzzle[rowIndex][digitIndex] !== 0;
  }

  checkIfHighlighted(digitIndex, rowIndex) {
    let inSameColumn = digitIndex == this.state.selected.digitIndex;
    let inSameRow = rowIndex == this.state.selected.rowIndex;
    let inSameGroup =
      Math.floor(digitIndex / 3) ==
        Math.floor(this.state.selected.digitIndex / 3) &&
      Math.floor(rowIndex / 3) == Math.floor(this.state.selected.rowIndex / 3);
    return inSameColumn || inSameRow || inSameGroup;
  }

  valueIsIncorrect(value, digitIndex, rowIndex) {
    return (
      value !== 0 &&
      sudokuHandler.getPuzzle(5).solution[rowIndex][digitIndex] !== value
    );
  }

  getSquareStatus(value, digitIndex, rowIndex) {
    if (this.squareIsBeLocked(digitIndex, rowIndex)) {
      return "locked";
    } else if (this.valueIsIncorrect(value, digitIndex, rowIndex)) {
      return "wrong";
    } else if (this.squareIsSelected(digitIndex, rowIndex)) {
      return "selected";
    } else if (this.checkIfHighlighted(digitIndex, rowIndex)) {
      return "highlighted";
    }
    return "";
  }

  render() {
    let occasionalMargin = 10;
    return (
      <View>
        {this.state.currentPuzzle.map((row, rowIndex) => {
          let rowStyles = [styles.baseRowStyle];
          if ([2, 5].includes(rowIndex)) {
            rowStyles.push({ marginBottom: occasionalMargin });
          }
          return (
            <View style={rowStyles} key={rowIndex}>
              {row.map((digit, digitIndex) => {
                return (
                  <Square
                    key={parseInt(rowIndex.toString() + digitIndex.toString())}
                    digit={digit}
                    status={this.getSquareStatus(digit, digitIndex, rowIndex)}
                    digitIndex={digitIndex}
                    extraMargin={occasionalMargin}
                    onPress={() => {
                      this.selectDigit(digitIndex, rowIndex);
                    }}
                  />
                );
              })}
            </View>
          );
        })}
        <Keypad onKeypadNumberPressed={this.keyPadPressed} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  baseRowStyle: {
    flexDirection: "row"
  }
});

export default Board;
