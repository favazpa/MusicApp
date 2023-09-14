import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackArrow from '../assets/svg/BackArrow.svg';
import Badge from '../assets/svg/Badge.svg';

const Header = () => {
  return (
    <View style={styles.container}>
      <BackArrow />
      <Badge />
      <Text style={styles.points}>0 PTS</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  points: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16.41,
    color: '#403D39',
  },
});
