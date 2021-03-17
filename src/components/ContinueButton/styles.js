import { StyleSheet, Dimensions } from 'react-native';
import {SECONDARY_COLOR, GREEN_CONTAINER_COLOR} from '../../AppStyles';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  btnContainer: {
    width: SCREEN_WIDTH - 100,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: SECONDARY_COLOR,
    borderColor: SECONDARY_COLOR,
    borderRadius: 60,
    alignSelf: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  }
});

export default styles;
