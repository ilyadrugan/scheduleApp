import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View
} from 'react-native';

import {styles} from "./constant/styles";

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          color="Black"
          size="large"
          style={{margin: 15}}
        />
       
      </View>
    );
  }
}