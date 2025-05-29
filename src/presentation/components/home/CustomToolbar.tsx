import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Images} from '../../../../assets/images/Images.index';
import {getFontFamily} from '../../utils/Fonts';

interface CustomToolbarProps {
  title: string;
  userPhoto?: string | null;
  onUserIconClicked?: () => void;
}

const CustomToolbar = ({
  title,
  userPhoto,
  onUserIconClicked,
}: CustomToolbarProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => onUserIconClicked?.()}>
        <Image
          style={styles.avatar}
          source={
            userPhoto
              ? {
                  uri: userPhoto,
                }
              : Images.user
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomToolbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  title: {
    fontFamily: getFontFamily('normal'),
    fontSize: 36,
    color: 'white',
  },
  avatar: {
    borderRadius: 100,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
