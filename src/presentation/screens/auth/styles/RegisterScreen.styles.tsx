import {StyleSheet} from 'react-native';
import {primaryRed, primaryBackgroundColor} from '../../../utils/Colors';
import {getFontFamily} from '../../../utils/Fonts';

export const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 16,
    gap: 8,
  },
  textRNContainer: {
    alignSelf: 'center',
  },
  textRN: {
    color: primaryRed,
    fontFamily: getFontFamily('bold'),
    fontSize: 68,
  },
  textMovie: {
    color: 'white',
    fontFamily: getFontFamily('bold'),
    fontSize: 28,
    top: -13,
    start: 4,
    letterSpacing: 3.3,
  },
  buttonProvider: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  buttonText: {
    fontFamily: 'Archivo-Medium',
    fontSize: 18,
    color: 'white',
    padding: 16,
    textAlign: 'center',
    flex: 1,
  },
  textOr: {
    position: 'absolute',
    color: '#988396',
    fontFamily: getFontFamily('normal'),
    fontSize: 12,
    backgroundColor: primaryBackgroundColor,
    width: 30,
    textAlign: 'center',
  },
  containerOr: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 42,
    marginVertical: 24,
    justifyContent: 'center',
  },
  line: {
    height: 0.6,
    flex: 1,
    backgroundColor: '#988396',
    opacity: 0.3,
  },
  buttonGoogle: {
    borderColor: primaryRed,
    borderWidth: 0.5,
    backgroundColor: 'rgba(19,20,24,1)',
    marginHorizontal: 16,
  },
  googleTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 22,
    height: 22,
  },
  googleText: {
    fontFamily: 'Archivo-Medium',
    fontSize: 18,
    color: 'white',
    padding: 16,
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 16,
  },
  dontHaveAccountText: {
    color: '#988396',
    fontFamily: getFontFamily('normal'),
    fontSize: 12,
    textAlign: 'center',
  },
  signUpText: {
    color: primaryRed,
    fontFamily: getFontFamily('bold'),
    fontSize: 12,
    textAlign: 'center',
    marginStart: 4,
  },
  buttonSquare: {
    position: 'absolute',
    borderRadius: 8,
    width: 40,
    height: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    top: 16,
    start: 16,
  },
  blurView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    backgroundColor: 'rgba(46,35,49, 0.9)',
  },
  icon: {
    color: 'white',
  },
});
