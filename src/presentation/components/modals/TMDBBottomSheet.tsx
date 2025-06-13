import React, {useMemo, useCallback, forwardRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import RNMovieButton from '../base/RNMovieButton'; // Ajusta la ruta si es necesario
import {getFontFamily} from '../../utils/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image} from 'expo-image';
import {Images} from '../../../../assets/images/Images.index';
import {
  darkBlueColor,
  darkBlueColorLighter,
  darkColor,
  primaryRed,
  primaryTextColor,
  secondaryTextColor,
  tabColor,
} from '../../utils/Colors';

interface TMDBModalProps {
  onDismiss: () => void;
  onPositiveButtonClicked: () => void;
  loading: boolean;
}

const TMDBBottomSheet = forwardRef<BottomSheetModal, TMDBModalProps>(
  ({onDismiss, onPositiveButtonClicked, loading = false}, ref) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.7}
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.modalHandle}
        backgroundStyle={styles.modalBackground}
        handleStyle={styles.handle}>
        <BottomSheetView style={styles.modalContentContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onDismiss}
            activeOpacity={0.7}>
            <Icon name="close-outline" size={24} color={primaryTextColor} />
          </TouchableOpacity>

          <Image source={Images.tmdbLogo} style={styles.modalIcon} />

          <Text style={styles.modalTitle}>Connect Your TMDB Account</Text>
          <Text style={styles.modalSubtitle}>
            Link your The Movie Database account to unlock cool features and
            personalize your experience!
          </Text>

          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <Icon
                name="star-outline"
                size={22}
                color={primaryRed}
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitText}>Rate movies and TV shows.</Text>
            </View>
            <View style={styles.benefitItem}>
              <Icon
                name="heart-outline"
                size={22}
                color={primaryRed}
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitText}>
                Manage your personal watchlist and favorites.
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Icon
                name="list-outline"
                size={22}
                color={primaryRed}
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitText}>
                Create and share custom lists.
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Icon
                name="sync-outline"
                size={22}
                color={primaryRed}
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitText}>
                Sync your activity across devices.
              </Text>
            </View>
          </View>

          <RNMovieButton
            label="Connect"
            onClick={onPositiveButtonClicked}
            style={styles.gotItButton}
            textStyle={styles.gotItButtonText}
            isLoading={loading}
          />
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default TMDBBottomSheet;

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: darkColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    height: 16,
  },
  modalHandle: {
    backgroundColor: 'white',
    width: 50,
  },
  modalContentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 16,
    padding: 6,
    zIndex: 10,
    backgroundColor: 'rgba(251,246,248,0.1)',
    borderRadius: 8,
  },
  modalIcon: {
    width: 120,
    height: 80,
    marginBottom: 24,
    marginTop: 30,
  },
  modalTitle: {
    fontFamily: getFontFamily('bold'),
    fontSize: 26,
    color: primaryTextColor,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalSubtitle: {
    fontFamily: getFontFamily('normal'),
    fontSize: 18,
    color: secondaryTextColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  tipsContainer: {
    alignSelf: 'stretch',
    marginBottom: 30,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    fontFamily: getFontFamily('normal'),
    fontSize: 16,
    color: 'red',
    marginRight: 10,
    lineHeight: 22,
  },
  tipText: {
    fontFamily: getFontFamily('normal'),
    fontSize: 15,
    color: 'red',
    flex: 1,
    lineHeight: 22,
  },
  gotItButton: {
    width: '100%',
    backgroundColor: '#4A90E2',
    shadowOpacity: 0,
    elevation: 0,
  },
  gotItButtonText: {
    color: 'white',
    fontFamily: getFontFamily('bold'),
  },
  benefitsContainer: {
    alignSelf: 'stretch',
    marginBottom: 30,
    marginHorizontal: 16,
    marginTop: 8,
    gap: 4,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 50,
    backgroundColor: 'rgba(34,35,42,0.5)',
    borderRadius: 8,
  },
  benefitIcon: {
    marginRight: 15,
  },
  benefitText: {
    fontFamily: getFontFamily('thin'),
    fontSize: 15,
    color: primaryTextColor,
    flex: 1,
    lineHeight: 21,
  },
});
