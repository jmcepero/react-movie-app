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
import {MotiView} from 'moti';
import {AccordionStore} from '../store/AccordionStore';
import Chip from '../../onboading/components/Chip';
import {Flex} from '@react-native-material/core';

const AccordionComponent = () => {
  const {accordionStore} = useContext(MobXProviderContext) as {
    accordionStore: AccordionStore;
  };
  const screenHeight = Dimensions.get('window').height;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'red',
        width: '100%',
        height: screenHeight * 0.9,
      }}>
      {accordionStore.sections.map(section => (
        <View key={section.id}>
          <TouchableOpacity
            onPress={() => accordionStore.toggleSection(section.id)}>
            <Text>{section.title}</Text>
          </TouchableOpacity>
          {section.expanded ? (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {section.chips.map((chip, index) => (
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
    </ScrollView>
  );
};

export default observer(AccordionComponent);

const styles = StyleSheet.create({});
