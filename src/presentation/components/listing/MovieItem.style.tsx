import { StyleSheet } from 'react-native';

export const movieStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#2B2533',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 15,
  },
  movieTitle: {
    fontFamily: 'Archivo-Black',
    fontSize: 12,
    color: 'rgba(251,246,248,1)',
    width: '75%',
  },
  yearTitle: {
    fontFamily: 'Archivo-Thin',
    fontSize: 12,
    color: 'rgba(251,246,248,0.7)',
  },
  movieTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
  },
  movieContainer: {
    paddingVertical: 8,
  },
  iconFavContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(19,20,24,0.8)',
    borderRadius: 12,
    padding: 5,
    bottom: 50,
    right: 6,
  },
});
