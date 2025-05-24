import {View} from 'react-native';

interface Props {
  gap: number;
}
const ListGap = ({gap}: Props) => {
  return <View style={{height: gap ? gap : 10, backgroundColor: 'red'}} />;
};

export default ListGap;
