// @flow

import React, { Component } from "react";
import { View } from "react-native";
import MenuScreen from "./containers/MenuScreen";
import GameScreen from "./containers/GameScreen";
import SettingsScreen from "./containers/SettingsScreen";

class Root extends Component<{}> {
  render() {
    return (
      <View>
        <MenuScreen />
      </View>
    );
  }
}

export default Root;
