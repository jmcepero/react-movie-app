import {Platform, StyleSheet, Text, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

interface Props {
  trailerUri?: string;
}

export const TrailerCard = ({trailerUri}: Props) => {
  return trailerUri ? (
    <View style={styles.container}>
      <Text style={styles.headerText}>Trailer</Text>
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={190}
          videoId={trailerUri}
          webViewStyle={{
            opacity: 0.99,
          }}
          webViewProps={{
            androidLayerType:
              Platform.OS === 'android' && Platform.Version <= 22
                ? 'hardware'
                : 'none',
          }}
        />
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  videoContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 8,
  },
  headerText: {
    fontFamily: 'Archivo-Medium',
    fontSize: 20,
    color: 'white',
    marginTop: 8,
  },
});
