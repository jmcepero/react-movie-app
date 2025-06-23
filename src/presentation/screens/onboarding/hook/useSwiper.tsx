import {Dimensions, GestureResponderEvent} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {fullWidth} from '../../../utils/Dimen';

/**
 * Custom hook that detects swipe gestures and single touches on a touch screen.
 *
 * @function useSwipe
 * @param {() => void} onSwipeLeft - Callback function triggered when user swipes from right to left
 * or taps on the left side of the screen.
 * @param {() => void} onSwipeRight - Callback function triggered when user swipes from left to right
 * or taps on the right side of the screen.
 * @returns {[(event: GestureResponderEvent) => void, (event: GestureResponderEvent) => void]} Array containing touch handlers:
 * - onTouchStart: Handler to be attached to onTouchStart event
 * - onTouchEnd: Handler to be attached to onTouchEnd event
 *
 * @example
 * // Basic usage in a component
 * const [onTouchStart, onTouchEnd] = useSwipe(
 *   () => console.log('Swiped left!'),
 *   () => console.log('Swiped right!')
 * );
 *
 * return (
 *   <View
 *     onTouchStart={onTouchStart}
 *     onTouchEnd={onTouchEnd}
 *   />
 * );
 */
const useSwipe = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
): [
  onTouchStart: (event: GestureResponderEvent) => void,
  onTouchEnd: (event: GestureResponderEvent) => void,
] => {
  let firstTouchPageX = useSharedValue(0);
  const singleTouchValueThreshold = 2;

  function onTouchStart(event: GestureResponderEvent) {
    firstTouchPageX.value = event.nativeEvent.pageX || 0;
  }

  function onTouchEnd(event: GestureResponderEvent) {
    try {
      const positionX = event.nativeEvent.pageX || 0;

      const isSingleTouch =
        Math.abs(positionX - firstTouchPageX.value) < singleTouchValueThreshold;

      if (isSingleTouch) {
        onSingleTouchHandle(positionX);
        return;
      }

      if (positionX < firstTouchPageX.value) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    } catch (error) {
      if (__DEV__) {
        console.error(error);
      }
    }
  }

  function onSingleTouchHandle(positionX: number) {
    if (positionX < fullWidth / 2) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  }

  return [onTouchStart, onTouchEnd];
};

export default useSwipe;
