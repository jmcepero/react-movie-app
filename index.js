/**
 * @format
 */
if (__DEV__) {
  require('./ReactotronConfig');
}
import { registerRootComponent } from 'expo';
import { App } from './App';
registerRootComponent(App);
