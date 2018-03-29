// @flow

class Board extends React.Component {
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
    this.props.onCompletion();
  }

  keyPadPressed(num) {
    if (
      this.state.selected == {} ||
      this.squareShouldBeLocked(
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
    if (this.squareIsSelected(digitIndex, rowIndex)) {
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

  squareShouldBeLocked(digitIndex, rowIndex) {
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
    if (this.squareShouldBeLocked(digitIndex, rowIndex)) {
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
    return (
      <div>
        <Timer />
        {this.state.currentPuzzle.map((row, rowIndex) => {
          return (
            <div
              className={"row" + ([2, 5].includes(rowIndex) ? " mb-1" : "")}
              key={rowIndex}
            >
              {row.map((digit, digitIndex) => {
                return (
                  <Square
                    key={parseInt(rowIndex.toString() + digitIndex.toString())}
                    digit={digit}
                    status={this.getSquareStatus(digit, digitIndex, rowIndex)}
                    digitIndex={digitIndex}
                    onClick={() => {
                      this.selectDigit(digitIndex, rowIndex);
                    }}
                  />
                );
              })}
            </div>
          );
        })}

        <Keypad onKeypadNumberPressed={this.keyPadPressed} />
      </div>
    );
  }
}

export default Board;
