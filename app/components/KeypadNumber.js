// @flow

class KeypadNumber extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="col btn btn-primary text-center mx-1"
        onClick={this.props.onClick}
      >
        {this.props.digit}
      </div>
    );
  }
}

export default KeypadNumber;
