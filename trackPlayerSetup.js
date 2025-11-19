import TrackPlayer from "react-native-track-player";

export async function setupPlayer() {
  try {
    await TrackPlayer.setupPlayer();
  } catch (e) {
    console.log("TrackPlayer already setup");
  }
}
