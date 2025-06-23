import { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { observer } from 'mobx-react';
import { Image } from 'expo-image';
import { getFontFamily } from '@utils/Fonts';
import {
  darkBlueColor,
  darkBlueColorLighter,
  iconSecondaryColor,
  primaryRed,
  primaryTextColor,
  secondaryTextColor,
  warningColor,
} from '@utils/Colors';
import { useAccountPreferences } from '@screens/account/hooks/useAccountPreferences';
import { ScrollAnimationContext } from '@presentation/utils/ScrollAnimationContext';
import { Images } from '../../../assets/images/Images.index';

const AccountScreen = () => {
  const { scrollY } = useContext(ScrollAnimationContext);
  const {
    user,
    isTMDBConnected,
    isConnecting,
    isDisconnecting,
    favoriteMoviesCount,
    favoriteTvShowsCount,
    handleConnectTMDB,
    handleDisconnectTMDB,
    handleLogout,
  } = useAccountPreferences();

  const userPhoto = user?.photoURL ? { uri: user?.photoURL } : Images.user;

  const [pushNotificationsEnabled, setPushNotificationsEnabled] =
    useState(true);

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.scrollViewContent}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      )}
      scrollEventThrottle={16}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={userPhoto} style={styles.avatar} />
        <Text style={styles.profileName}>{user?.displayName}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit profile</Text>
        </TouchableOpacity>
      </View>

      {/* Favorites Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Favorites</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Icon
                name="videocam-outline"
                size={24}
                color={iconSecondaryColor}
                style={styles.listItemIcon}
              />
              <Text style={styles.listItemText}>Movies</Text>
            </View>
            <View style={styles.listItemRightContent}>
              {favoriteMoviesCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{favoriteMoviesCount}</Text>
                </View>
              )}
              <Icon name="chevron-forward-outline" size={20} color="#B0B0B0" />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Icon
                name="tv-outline"
                size={24}
                color={iconSecondaryColor}
                style={styles.listItemIcon}
              />
              <Text style={styles.listItemText}>TV Shows</Text>
            </View>
            <View style={styles.listItemRightContent}>
              {favoriteTvShowsCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{favoriteTvShowsCount}</Text>
                </View>
              )}
              <Icon name="chevron-forward-outline" size={20} color="#B0B0B0" />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Icon
                name="shapes-outline"
                size={24}
                color={iconSecondaryColor}
                style={styles.listItemIcon}
              />
              <Text style={styles.listItemText}>Generes</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#B0B0B0" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Other Use Cases Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Other Use Cases</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Icon
                name="map-outline"
                size={24}
                color={iconSecondaryColor}
                style={styles.listItemIcon}
              />
              <Text style={styles.listItemText}>Theaters on map</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#B0B0B0" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Icon
                name="ticket-outline"
                size={24}
                color={iconSecondaryColor}
                style={styles.listItemIcon}
              />
              <Text style={styles.listItemText}>Ticket Reservation</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#B0B0B0" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Icon
                name="contrast-outline"
                size={24}
                color={iconSecondaryColor}
                style={styles.listItemIcon}
              />
              <Text style={styles.listItemText}>Dark Theme</Text>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: primaryRed }}
              thumbColor={pushNotificationsEnabled ? '#FFFFFF' : '#f4f3f4'}
              ios_backgroundColor="#E0E0E0"
              onValueChange={() =>
                setPushNotificationsEnabled(previousState => !previousState)
              }
              value={pushNotificationsEnabled}
            />
          </View>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Icon
                name="color-fill-outline"
                size={24}
                color={iconSecondaryColor}
                style={styles.listItemIcon}
              />
              <Text style={styles.listItemText}>Colors</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#B0B0B0" />
          </TouchableOpacity>
          <View style={styles.separator} />

          {isTMDBConnected ? (
            <TouchableOpacity
              style={styles.listItem}
              onPress={handleDisconnectTMDB}
              disabled={isDisconnecting}
            >
              <View style={styles.listItemContent}>
                <Image
                  source={Images.tmdbIcon}
                  style={styles.listItemImage}
                  tintColor={warningColor}
                />
                <Text style={[styles.listItemText, { color: warningColor }]}>
                  Disconnect from TMDB
                </Text>
              </View>
              {isDisconnecting && (
                <ActivityIndicator
                  size="small"
                  color={warningColor}
                  style={styles.indicator}
                />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.listItem}
              onPress={handleConnectTMDB}
              disabled={isConnecting}
            >
              <View style={styles.listItemContent}>
                <Image
                  source={Images.tmdbIcon}
                  style={styles.listItemImage}
                  tintColor={iconSecondaryColor}
                />
                <Text style={styles.listItemText}>Connect to TMDB</Text>
              </View>
              {isConnecting && (
                <ActivityIndicator size="small" style={styles.indicator} />
              )}
            </TouchableOpacity>
          )}

          <View style={styles.separator} />
          <TouchableOpacity style={styles.listItem} onPress={handleLogout}>
            <View style={styles.listItemContent}>
              <Icon
                name="log-out-outline"
                size={24}
                color={primaryRed}
                style={styles.listItemIcon}
              />
              <Text style={[styles.listItemText, styles.logoutText]}>
                Logout
              </Text>
            </View>
            {/* No chevron for logout */}
          </TouchableOpacity>
        </View>
      </View>
    </Animated.ScrollView>
  );
};

export default observer(AccountScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    paddingBottom: 100, // Space for content before tab bar
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E0F2F7', // Light green placeholder
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF', // If avatar has a background color, this gives a nice effect
  },
  profileName: {
    fontSize: 22,
    fontFamily: getFontFamily('bold'),
    color: primaryTextColor,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: getFontFamily('normal'),
    color: secondaryTextColor,
    marginBottom: 15,
  },
  editProfileButton: {
    backgroundColor: primaryRed,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  editProfileButtonText: {
    fontFamily: getFontFamily('medium'),
    color: 'white',
    fontSize: 14,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: getFontFamily('normal'),
    fontSize: 14,
    fontWeight: '600',
    color: primaryTextColor,
    marginBottom: 8,
    marginLeft: 5,
  },
  card: {
    backgroundColor: darkBlueColor,
    borderRadius: 12,
    overflow: 'hidden', // To clip children with borderRadius
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemIcon: {
    marginRight: 15,
    width: 24, // Ensure consistent icon spacing
    textAlign: 'center',
  },
  listItemText: {
    fontFamily: getFontFamily('normal'),
    fontSize: 16,
    color: secondaryTextColor,
  },
  listItemRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: primaryRed,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginRight: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    height: 0.7,
    backgroundColor: darkBlueColorLighter, // Lighter separator
    marginLeft: 15, // Indent separator
    marginRight: 15,
  },
  logoutText: {
    color: primaryRed,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 80 : 60, // Taller on iOS due to home indicator area
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Padding for home indicator
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  listItemImage: {
    height: 22,
    marginRight: 15,
    width: 22, // Ensure consistent icon spacing
    textAlign: 'center',
  },
  indicator: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
});
