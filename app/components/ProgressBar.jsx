import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {Slider} from '@miblanchard/react-native-slider';

const ProgressBar = () => {
  const {position, duration} = useProgress();

  useEffect(() => {
    console.log('position', position);
  }, [position]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Graph.png')}
        style={{width: '100%'}}
      />
      <View style={styles.progressSlideContainer}>
        <Slider
          step={0}
          onSlidingComplete={async change => {
            await TrackPlayer.seekTo(change[0]);
          }}
          //   onValueChange={async change => {
          //     console.log('change', change);
          //     TrackPlayer.pause();
          //     await TrackPlayer.seekTo(change[0]);
          //     TrackPlayer.play();
          //   }}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#FF6F7E"
          maximumTrackTintColor="#F3E5F5"
          thumbStyle={{height: 0, borderRadius: 0}}
          trackStyle={{height: 6, borderRadius: 0}}
          containerStyle={styles.slide}
        />
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text>
        <Text style={styles.time}>
          -
          {new Date((duration - position) * 1000)
            .toISOString()
            .substring(15, 19)}
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  progressSlideContainer: {
    width: '100%',
    height: 10,
  },
  slide: {
    width: '100%',
    height: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  time: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#403D39',
  },
});
