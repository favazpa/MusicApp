import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';
import Lyrics from '../../components/Lyrics';
import Controller from '../../components/Controller';
import {setupPlayer, addTrack} from '../../../musicPlayerServices';
import MaskedView from '../../components/MaskedView';
import MaskedElement from '../../components/MaskedElement';

const Home = () => {
  const [isPLayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

  if (!isPLayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ProgressBar />
      <View style={styles.maskedContainer}>
        <MaskedView element={<MaskedElement />}>
          <Lyrics />
        </MaskedView>
      </View>
      <Controller />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maskedContainer: {height: '50%'},
});
