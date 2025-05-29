import { StyleSheet } from 'react-native';

export const BLURHASH = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const createCastCardStyles = (width?: number, height?: number) => 
  StyleSheet.create({
    container: {
      alignItems: 'flex-start',
    },
    imageContainer: {
      width: width,
      height: height,
      borderRadius: 12,
      elevation: 5,
      backgroundColor: '#2B2533',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1,
      overflow: 'hidden',
    },
    image: {
      flex: 1,
      borderRadius: 12,
    },
    caption: {
      width: width,
      fontFamily: 'Archivo-Thin',
      fontSize: 14,
      color: '#988396',
      paddingHorizontal: 6,
      paddingVertical: 5,
    },
  });