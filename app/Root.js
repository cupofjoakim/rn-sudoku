// @flow

import React, { Component } from "react";
import { View } from "react-native";
import MenuScreen from "./containers/MenuScreen";
import GameScreen from "./containers/GameScreen";
import SettingsScreen from "./containers/SettingsScreen";

class Root extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      screen: "menu"
    };
    this.showScreen = this.showScreen.bind(this);
  }

  showScreen(screen) {
    this.setState({
      screen: screen
    });
  }

  render() {
    let screen = <MenuScreen onNavigationTry={this.showScreen} />;
    if (this.state.screen == "game") {
      screen = <GameScreen />;
    }
    return <View>{screen}</View>;
  }
}

export default Root;
