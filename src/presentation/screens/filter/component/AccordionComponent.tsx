import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {AccordionStore} from '../store/AccordionStore';
import Chip from '../../onboading/components/Chip';
import {blue} from 'react-native-reanimated/lib/typescript/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {primaryTextColor, secondaryTextColor} from '../../../utils/Colors';
import {getFontFamily} from '../../../utils/Fonts';
import {store} from '../../../../store/store';
import RNMovieButton from '../../../components/base/RNMovieButton';

const AccordionComponent = () => {
  const {accordionStore} = useContext(MobXProviderContext) as {
    accordionStore: AccordionStore;
  };

  return (
    <View style={{width: '100%'}}>
      {accordionStore.sections.map(section => (
        <View key={section.id}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.header}
            onPress={() => accordionStore.toggleSection(section.id)}>
            <View style={styles.headerRow}>
              <View style={styles.headerColumn}>
                <Text style={styles.headerTitle}>{section.title}</Text>
                {section.expanded == false &&
                  (accordionStore.getSelectedChipsBySection(section.id) || [])
                    .length > 0 && (
                    <Text style={{color: 'white'}}>
                      {accordionStore
                        .getSelectedChipsBySection(section.id)
                        ?.map(chip => chip.label)
                        .join(', ')}
                    </Text>
                  )}
              </View>
              <Icon
                name={
                  section.expanded
                    ? 'chevron-up-outline'
                    : 'chevron-down-outline'
                }
                size={18}
                color={primaryTextColor}
              />
            </View>
          </TouchableOpacity>
          {section.expanded ? (
            <View style={styles.expandableContent}>
              {section.chips.map(chip => (
                <Chip
                  key={chip.id}
                  label={chip.label}
                  id={chip.id}
                  isSelected={chip.isSelected}
                  onSelect={() =>
                    accordionStore.toggleChipSelection(section.id, chip.id)
                  }
                />
              ))}
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
};

export default observer(AccordionComponent);

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
  },
  headerColumn: {
    flex: 1,
  },
  headerTitle: {
    color: primaryTextColor,
    fontSize: 18,
    fontFamily: getFontFamily('medium'),
  },
  expandableContent: {
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
