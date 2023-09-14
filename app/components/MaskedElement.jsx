import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default props => (
  <View style={styles.container}>
    <LinearGradient
      colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']}
      style={styles.linearGradient}
    />
  </View>
);
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: '100%',
    borderRadius: 5,
  },
  container: {
    backgroundColor: 'transparent',
    height: '100%',
  },
});
