// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import Square from './Square';
import Keypad from './Keypad';

class Board extends Component<{ puzzle: { puzzle: any, solution: any } }> {
  static hardCopy(puzzleArr) {
    return JSON.parse(JSON.stringify(puzzleArr));
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      originalPuzzle: this.hardCopy(this.props.puzzle.puzzle),
      currentPuzzle: this.hardCopy(this.props.puzzle.puzzle),
      puzzleSolution: this.hardCopy(this.props.puzzle.solution),
    };
    this.keyPadPressed = this.keyPadPressed.bind(this);
  }

  getSquareStatus(value, digitIndex, rowIndex) {
    if (this.squareIsBeLocked(digitIndex, rowIndex)) {
      return 'locked';
    } else if (this.valueIsIncorrect(value, digitIndex, rowIndex)) {
      return 'wrong';
    } else if (this.squareIsSelected(digitIndex, rowIndex)) {
      return 'selected';
    } else if (this.checkIfHighlighted(digitIndex, rowIndex)) {
      return 'highlighted';
    }
    return '';
  }

  checkIfHighlighted(digitIndex, rowIndex) {
    const inSameColumn = digitIndex === this.state.selected.digitIndex;
    const inSameRow = rowIndex === this.state.selected.rowIndex;
    const inSameGroup =
      Math.floor(digitIndex / 3) === Math.floor(this.state.selected.digitIndex / 3) &&
      Math.floor(rowIndex / 3) === Math.floor(this.state.selected.rowIndex / 3);
    return inSameColumn || inSameRow || inSameGroup;
  }

  valueIsIncorrect(value, digitIndex, rowIndex) {
    return value !== 0 && this.state.puzzleSolution[rowIndex][digitIndex] !== value;
  }

  squareIsBeLocked(digitIndex, rowIndex) {
    return this.state.originalPuzzle[rowIndex][digitIndex] !== 0;
  }

  squareIsSelected(digitIndex, rowIndex) {
    return (
      this.state.selected.rowIndex === rowIndex && this.state.selected.digitIndex === digitIndex
    );
  }

  selectDigit(digitIndex, rowIndex) {
    if (
      this.squareIsSelected(digitIndex, rowIndex) ||
      this.squareIsBeLocked(digitIndex, rowIndex)
    ) {
      this.setState({
        selected: {},
      });
    } else {
      this.setState({
        selected: {
          rowIndex,
          digitIndex,
        },
      });
    }
  }

  keyPadPressed(num) {
    if (
      this.state.selected === {} ||
      this.squareIsBeLocked(this.state.selected.digitIndex, this.state.selected.rowIndex)
    ) {
      return;
    }
    const modifiedPuzzle = this.state.currentPuzzle.slice(0);
    modifiedPuzzle[this.state.selected.rowIndex][this.state.selected.digitIndex] = num;
    this.setState({
      currentPuzzle: modifiedPuzzle,
    });
    if (this.state.puzzleSolution === this.state.currentPuzzle) {
      this.endGame();
    }
  }

  endGame() {}

  renderRows() {
    const occasionalMargin = 10;
    return (
      <View>
        {this.state.currentPuzzle.map((row, rowIndex) => {
          const rowStyles = [{ flexDirection: 'row' }];
          if ([2, 5].includes(rowIndex)) {
            rowStyles.push({ marginBottom: occasionalMargin });
          }
          const key = rowIndex;
          return (
            <View style={rowStyles} key={key}>
              {row.map((digit, digitIndex) => (
                <Square
                  key={parseInt(rowIndex.toString() + digitIndex.toString(), 10)}
                  digit={digit}
                  status={this.getSquareStatus(digit, digitIndex, rowIndex)}
                  digitIndex={digitIndex}
                  rowIndex={rowIndex}
                  extraMargin={occasionalMargin}
                  onPress={() => {
                    this.selectDigit(digitIndex, rowIndex);
                  }}
                />
              ))}
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    const rows = this.renderRows();
    return (
      <View>
        <View>{rows}</View>
        <Keypad onKeypadNumberPressed={this.keyPadPressed} />
      </View>
    );
  }
}

export default Board;
