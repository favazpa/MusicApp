import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import HeadSet from '../assets/svg/HeadSet';
import Settings from '../assets/svg/Settings';
import PlayButton from '../assets/svg/PlayButton';
import PauseButton from '../assets/svg/PauseButton';
import Replay from '../assets/svg/Replay';
import Tick from '../assets/svg/Tick';
import Like from '../assets/svg/Like';
import Song from '../assets/svg/Song';
import {capitalizeWords} from '../utils/TextUtils';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {playlistData} from '../constants/AppConstants';

const Controller = () => {
  const [track, setTrack] = useState(playlistData[0]);
  const playBackState = usePlaybackState();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const trackIndex = await TrackPlayer.getCurrentTrack();
        const playingTrack = await TrackPlayer.getTrack(trackIndex);
        setTrack(playingTrack);
        break;
    }
  });

  const togglePlayback = async playback => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Song />
        <View style={{width: '70%'}}>
          <Text numberOfLines={1} style={styles.title}>
            {track?.title && capitalizeWords(track?.title)}
          </Text>
          <Text style={styles.subTitle}>{track?.artist && track.artist}</Text>
        </View>
        <Like />
      </View>

      <View style={styles.bottomContainer}>
        <HeadSet />
        <Settings />
        <TouchableOpacity onPress={() => togglePlayback(playBackState)}>
          {playBackState === State.Playing ? <PauseButton /> : <PlayButton />}
        </TouchableOpacity>
        <Replay />
        <Tick />
      </View>
    </View>
  );
};

export default Controller;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,

    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 24,
    color: '#403D39',
    width: '100%',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 24,
    color: '#403D39',
  },
});
