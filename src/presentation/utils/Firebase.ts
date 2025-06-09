import {getApp} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export const defaultAppInstance = getApp();
export const authInstance = auth(defaultAppInstance);
