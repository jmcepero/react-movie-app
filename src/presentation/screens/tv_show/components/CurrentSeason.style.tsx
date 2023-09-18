import {StyleSheet} from 'react-native';

export const currentSeasonStyle = StyleSheet.create({
  image: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#2B2533',

    elevation: 5,
  },
  headerTitle: {
    paddingHorizontal: 16,
    fontFamily: 'Archivo-Medium',
    fontSize: 20,
    color: '#fbf6f8',
    marginTop: 8,
  },
  title: {
    fontFamily: 'Archivo-Regular',
    fontSize: 18,
    color: 'white',
    marginTop: 8,
  },
  subtitle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 14,
    color: '#9b959c',
    marginTop: 8,
  },
  infoContainer: {
    marginHorizontal: 16,
    flex: 1,
  },
  seasonOverview: {
    marginTop: 16,
    fontFamily: 'Archivo-Thin',
    fontSize: 14,
    color: '#9b959c',
  },
});
