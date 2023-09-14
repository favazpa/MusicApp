export function timestampToSeconds(timestamp) {
  const [minutes, seconds] = timestamp.split(':').map(parseFloat);
  return minutes * 60 + seconds;
}
