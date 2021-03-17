import { StyleSheet, Dimensions } from 'react-native';
import { registration, homeStyle, SECONDARY_COLOR } from '../../../AppStyles';
// screen sizing
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;


const styles = StyleSheet.create({
  container: registration.container,
  title: {
    marginTop: 70,
    marginBottom: 20,
    margin: 30,
    fontSize: 24,
    color: '#2d3142',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  mainContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  signContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10
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
    marginRight: 25,
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
  description: {
    fontSize: 16,
    color: '#9c9eb9',
    textAlign: 'center'
  },
  conditionText: {
    color: 'red',
    fontSize: 14,
    margin: 5,
    marginTop: 2
  },
  logContainer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },
  text: {
    margin: 10,
    fontSize: 17,
    color: '#9c9eb9'
  },
  bottomRowContainer: {
    margin: 5,
    flexDirection: 'row',
    width: SCREEN_WIDTH - 100,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  btnContainer: {
    marginTop: 30,
    borderRadius: 60,
    width: SCREEN_WIDTH - 100,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: SECONDARY_COLOR,
    borderColor: SECONDARY_COLOR
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  signText: {
    margin: 10,
    marginLeft: 0,
    color: SECONDARY_COLOR,
    fontWeight: 'bold',
    fontSize: 17
  },
  greenContainer: homeStyle.greenContainer,
  greenText: homeStyle.greenText,
  blueContainer: homeStyle.blueContainer,
  blueText: homeStyle.blueText,
});

export default styles;
