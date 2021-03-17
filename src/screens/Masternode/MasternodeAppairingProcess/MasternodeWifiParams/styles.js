import { StyleSheet, Dimensions } from 'react-native';
import { registration, SECONDARY_COLOR, homeStyle } from '../../../../AppStyles';
// screen sizing
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: registration.container,
  mainContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 20
  },
  signContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 10,
    padding: 5,
    width: SCREEN_WIDTH - 50,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: SECONDARY_COLOR
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center',
    width: 20,
    height: 20
  },
  input: {
    color: 'black',
    fontSize: 17,
    padding:10,
    marginLeft: 10,
    textAlign: 'left',
    height: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 100
  },
  accountIcon: {
    alignSelf: 'center',
    width: 20,
    height: 20
  },
  txt: {
    marginBottom: 0,
    fontSize: 17,
    color: '#2d3142',
    textAlign: 'center'
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
  blueContainer: homeStyle.blueContainer,
  blueText: homeStyle.blueText
});

export default styles;
