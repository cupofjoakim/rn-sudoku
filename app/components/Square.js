// @flow

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  constructClassNames() {
    let classes = "col py-2 border text-center";
    if ([2, 5].includes(this.props.digitIndex)) {
      classes += " mr-1";
    }
    switch (this.props.status) {
      case "wrong":
        classes += " bg-danger text-white";
        break;
      case "locked":
        classes += " bg-secondary text-white";
        break;
      case "selected":
        classes += " bg-primary text-white";
        break;
      case "highlighted":
        classes += " bg-info text-white";
        break;
    }
    return classes;
  }

  render() {
    let classes = this.constructClassNames();
    return (
      <div onClick={this.props.onClick} className={classes}>
        {this.props.digit == 0 ? null : this.props.digit}
      </div>
    );
  }
}

export default Square;
