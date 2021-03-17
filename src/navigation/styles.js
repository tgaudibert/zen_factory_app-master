import { StyleSheet } from 'react-native';
import { homeStyle,SECONDARY_COLOR } from '../AppStyles';

const styles = StyleSheet.create({
  container: homeStyle.container,

  photoContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    margin: 20,
    alignSelf: 'center'
  },
  greenDot: {
    height: 12,
    width: 12,
    borderRadius: 10,
    position: 'absolute',
    left: 4,
    bottom: 4,
    borderStyle: 'solid',
    borderColor: '#f4f6fa',
    backgroundColor: '#3fc7bc',
    zIndex: 1
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  goalAchievedIcon: {
    width: 30,
    height: 30,
    margin: 20,
    alignSelf: 'center'
  },


});

export default styles;
