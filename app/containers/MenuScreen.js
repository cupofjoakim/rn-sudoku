// @flow

import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

class MenuScreen extends Component<{}> {
  render() {
    return (
      <View style={{ paddingTop: 90 }}>
        <Text style={styles.viewTitle}>SUDOKU</Text>
        <Button
          onPress={() => {}}
          title="Continue playing"
          accessibilityLabel="Continue playing current game"
        />
        <View
          style={{
            marginVertical: 36,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View style={styles.dividerRuler} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerRuler} />
        </View>
        <Button
          onPress={() => {
            this.props.onNavigationTry("game");
          }}
          title="New Game"
          accessibilityLabel="Start a new game"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewTitle: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 55
  },
  dividerRuler: {
    flex: 1,
    marginHorizontal: 23,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "white"
  },
  dividerText: {
    fontStyle: "italic",
    fontSize: 18,
    color: "white",
    textAlign: "center"
  }
});

export default MenuScreen;
