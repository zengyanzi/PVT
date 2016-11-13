import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';


class MydietView extends React.Component {

 render() {
    let children = [];

    for (var i = 0; i < 20; i++) {
      children.push(
        <View key={"key_" + i} >
          <Text>{"T" + i}</Text>
        </View>);
    }
    return (
        <ScrollView >
          {children}
        </ScrollView>
    );
  }
}

export default MydietView;