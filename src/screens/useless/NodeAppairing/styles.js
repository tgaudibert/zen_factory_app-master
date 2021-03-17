import { StyleSheet, Dimensions } from 'react-native';
import { registration , homeStyle ,SECONDARY_COLOR} from '../../../AppStyles';

// screen sizing
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: registration.container,
  middleContainer: {
    flex: 1,
    alignSelf: 'center'
  },
  mainText: {
    fontSize: 24,
    margin: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2d3142'
  },
  secText: {
    margin: 5,
    fontSize: 17,
    textAlign: 'center',
    color: '#9c9eb9'
  },
  rowContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: SCREEN_WIDTH - 50
  },
  iconContainer: {
    backgroundColor: '#ffff',
    margin: 10,
    width: '40%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffff',
    padding: 10
  },
  icon: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  textContainer: {
    margin: 20,
    alignSelf: 'center',
    width: SCREEN_WIDTH - 100
  },
  genderText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2d3142'
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 30,
    position: 'absolute',
    top: 2,
    right: 2
  },
  notNowText: {
    color: '#7265e3',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 0,
    fontWeight: 'bold'
  },
  iconContainer: {
    marginTop: 60,
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  icon: {
    height: 90,
    width: 90,
    margin: 20
  },
  boldText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3142',
    textAlign: 'center',
    margin: 5
  },
  normalText: {
    fontSize: 16,
    color: '#9c9eb9',
    textAlign: 'center',
    margin: 5
  },
  lottieView: {
    height: 90,
    width: 90,
  },
  greenContainer: homeStyle.greenContainer,
  greenText: homeStyle.greenText,
});

export default styles;
