import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParams} from '../../navigation/StackNavigation';
import {LoadingView} from '../../components/base/LoadingView';
import {MobXProviderContext, observer} from 'mobx-react';
import PersonStore from './store/PersonStore';
import DetailPeopleImage from './component/DetailPeopleImage';
import {styles} from '../tv_show/style/TvShow.style';

interface Props
  extends StackScreenProps<RootStackParams, 'PersonDetailScreen'> {}

export const PersonDetailScreen = observer(({route}: Props) => {
  const {personStore} = useContext(MobXProviderContext) as {
    personStore: PersonStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const personId = route.params.personId;

  useEffect(() => {
    personStore.onScreenLoaded(personId);
  }, [personId, personStore]);

  if (personStore.isLoading) {
    return (
      <View
        style={{
          ...styles.container,
          ...styles.center,
        }}>
        <LoadingView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollviewContainer}>
        <View>
          {/* Detail image */}
          <DetailPeopleImage
            images={personStore.images}
            onBackClicked={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </View>
  );
});
