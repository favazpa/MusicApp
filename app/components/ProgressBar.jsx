import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {Slider} from '@miblanchard/react-native-slider';

const ProgressBar = () => {
  const {position, duration} = useProgress();

  const formatTime = seconds => {
    const date = new Date(seconds * 1000);
    return date.toISOString().substring(15, 19);
  };

  const seekToPosition = async change => {
    await TrackPlayer.seekTo(change[0]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Graph.png')}
        style={{width: '100%'}}
      />
      <View style={styles.progressSlideContainer}>
        <Slider
          step={0}
          onSlidingComplete={seekToPosition}
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
        <Text style={styles.time}>{formatTime(position)}</Text>
        <Text style={styles.time}>-{formatTime(duration - position)}</Text>
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
