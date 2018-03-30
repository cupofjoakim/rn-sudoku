// @flow

import React, { Component } from "react";
import { Text, View, Button } from "react-native";

class MenuScreen extends Component<{}> {
  render() {
    return (
      <View>
        <Text>MenuScreen</Text>
        <Button
          onPress={() => {
            this.props.onNavigationTry("game");
          }}
          title="New puzzle"
          color="#841584"
          accessibilityLabel="Start a new puzzle"
        />
      </View>
    );
  }
}

export default MenuScreen;
