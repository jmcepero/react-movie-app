import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  scrollviewContainer: {
    paddingBottom: 80,
    backgroundColor: 'rgba(23, 24, 27, 1)',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(23, 24, 27, 1)',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'Archivo-Medium',
    fontSize: 34,
    color: '#fbf6f8',
    width: '70%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  valorationContainer: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  valorationTitle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 22,
    color: 'white',
    marginEnd: 4,
  },
  overviewText: {
    fontFamily: 'Archivo-Regular',
    fontSize: 18,
    color: '#9b959c',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonProvider: {
    position: 'absolute',
    borderRadius: 16,
    backgroundColor: '#7B44C1',
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    bottom: 16,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Archivo-Medium',
    fontSize: 18,
    color: 'white',
    padding: 16,
  },
  snackBarError: {
    position: 'absolute',
    start: 16,
    end: 16,
    bottom: 90,
  },
  center: {
    justifyContent: 'center',
  },
});
