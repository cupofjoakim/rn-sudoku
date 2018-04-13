// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import MenuScreen from './containers/MenuScreen';
import GameScreen from './containers/GameScreen';

class Root extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'menu',
    };
    this.showScreen = this.showScreen.bind(this);
  }

  showScreen(screen) {
    this.setState({
      screen,
    });
  }

  render() {
    let screen = <MenuScreen onNavigationTry={this.showScreen} />;
    if (this.state.screen === 'game') {
      screen = <GameScreen />;
    }
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: '#2D4277',
        }}
      >
        {screen}
      </View>
    );
  }
}

export default Root;
