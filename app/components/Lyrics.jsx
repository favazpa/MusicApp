import React, {useState, useEffect, useRef} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {lyricsText} from '../constants/AppConstants';
import {useProgress} from 'react-native-track-player';
import {parseLyric, syncLyric} from '../utils/LyricsUtils';

const ListHeaderComponent = () => {
  return <View style={styles.emptyHeader} />;
};

const ListFooterComponent = () => {
  return <View style={styles.emptyFooter} />;
};

const LyricsApp = () => {
  const [lyricsData, setLyricsData] = useState([]);
  const [currentLyrics, setCurrentLyrics] = useState(null);

  const {position} = useProgress();
  const flatListRef = useRef(null);

  useEffect(() => {
    const index = syncLyric(lyricsData, position);
    setCurrentLyrics(index);
  }, [position, lyricsData]);

  useEffect(() => {
    const lyrics = parseLyric(lyricsText);
    setLyricsData(lyrics);
  }, []);

  const itemHeight = 50;

  const getItemLayout = (data, index) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  useEffect(() => {
    if (flatListRef.current !== null && currentLyrics !== null) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentLyrics,
      });
    }
  }, [currentLyrics]);

  const renderItem = ({item, index}) => (
    <View style={styles.itemContainer}>
      <Text
        style={[styles.lyrics, index === currentLyrics && styles.activeLyric]}>
        {item?.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        data={lyricsData}
        style={styles.flatlist}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%'},
  emptyHeader: {height: 120},
  flatlist: {width: '100%', height: '100%'},
  emptyFooter: {height: 100},
  itemContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lyrics: {
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 30,
    color: 'black',
    fontSize: 16,
  },
  activeLyric: {
    color: '#FF6F7E',
    fontSize: 25,
  },
});

export default LyricsApp;
