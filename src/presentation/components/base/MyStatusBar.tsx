import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

interface Props {
    backgroundColor: string
}

export const MyStatusBar = ({backgroundColor}: Props) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} />
      </SafeAreaView>
    </View>
  );

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});