// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import KeypadNumber from './KeypadNumber';

class Keypad extends Component<{ onKeypadNumberPressed: any }> {
  render() {
    return (
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        height={40}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <KeypadNumber
            key={num}
            digit={num}
            onPress={() => this.props.onKeypadNumberPressed(num)}
          />
        ))}
      </View>
    );
  }
}

export default Keypad;
