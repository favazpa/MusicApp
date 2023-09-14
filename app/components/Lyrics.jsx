import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Animated} from 'react-native';
import MaskedView from './MaskedView';
import MaskedElement from './MaskedElement';
import {lyricsText} from '../constants';

const LyricsApp = () => {
  const [lyricsData, setLyricsData] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [scrollY] = useState(new Animated.Value(0));

  useEffect(() => {
    const lines = lyricsText.split('\n');
    const lyricsArray = [];
    for (const line of lines) {
      const match = line.match(/\[(\d+:\d+\.\d+)\](.+)/);
      if (match) {
        const timestamp = match[1];
        const lyricText = match[2];
        lyricsArray.push({
          timestamp,
          lyricText,
        });
      }
    }
    console.log(lyricsArray);
    setLyricsData(lyricsArray);
  }, []);

  return (
    <View style={{width: '100%'}}>
      <FlatList
        ListHeaderComponent={() => <View style={{height: 50}} />}
        data={lyricsData}
        style={{width: '100%', height: '100%'}}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        ListFooterComponent={() => <View style={{height: 100}} />}
        renderItem={({item}) => (
          <View
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                fontSize: 16,
                lineHeight: 30,
              }}>
              {item.lyricText}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default LyricsApp;
