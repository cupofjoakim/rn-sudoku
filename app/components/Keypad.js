// @flow

class Keypad extends React.Component {
  render() {
    return (
      <div className="row mt-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
          return (
            <KeypadNumber
              key={num}
              digit={num}
              onClick={() => this.props.onKeypadNumberPressed(num)}
            />
          );
        })}
      </div>
    );
  }
}

export default Keypad;
