export const parseLyric = lrc => {
  const regex = /\[(\d{2}:\d{2}(?:\.\d{2})?)\](.*)/;

  const lines = lrc.split('\n');

  const output = [];

  lines.forEach(line => {
    if (line.startsWith('[length:')) {
      return;
    }

    const match = line.match(regex);

    if (match == null) {
      console.log('Line does not match:', line);
      return;
    }

    const time = match[1];
    const text = match[2];

    output.push({
      time: parseTime(time),
      text: text.trim(),
    });
  });

  function parseTime(time) {
    const minsec = time.split(':');
    const min = parseInt(minsec[0]) * 60;
    const sec = parseFloat(minsec[1]);
    return min + sec;
  }

  return output;
};

export const syncLyric = (lyrics, time) => {
  const scores = [];

  lyrics.forEach(lyric => {
    const score = time - lyric.time;
    if (score >= 0) scores.push(score);
  });

  if (scores.length == 0) return null;

  const closest = Math.min(...scores);

  return scores.indexOf(closest);
};
