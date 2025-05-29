import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useContext } from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {FilterChipsStore} from '../store/FilterChipsStore';
import Chip from '../../onboading/components/Chip';
import Icon from 'react-native-vector-icons/Ionicons';
import {primaryTextColor} from '../../../utils/Colors';
import {getFontFamily} from '../../../utils/Fonts';

const FilterChipsComponent = () => {
  const {filterChipsStore} = useContext(MobXProviderContext) as {
    filterChipsStore: FilterChipsStore;
  };

  return (
    <View style={{width: '100%'}}>
      {filterChipsStore.sections.map(section => (
        <View key={section.id}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.header}
            onPress={() => filterChipsStore.toggleSection(section.id)}>
            <View style={styles.headerRow}>
              <View style={styles.headerColumn}>
                <Text style={styles.headerTitle}>{section.title}</Text>
                {section.expanded == false &&
                  (filterChipsStore.getSelectedChipsBySection(section.id) || [])
                    .length > 0 && (
                    <Text style={{color: 'white'}}>
                      {filterChipsStore
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
                    filterChipsStore.toggleChipSelection(section.id, chip.id)
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

export default observer(FilterChipsComponent);

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
