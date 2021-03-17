import { StyleSheet, Dimensions } from 'react-native';
import { registration,SECONDARY_COLOR, homeStyle} from '../../../AppStyles';

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
  conditionContainer: {
    margin: 10
  },
  rowContainer: {
    flexDirection: 'row',
    margin: 10,
    marginLeft: 20
  },
  emptyBox: {
    margin: 5,
    marginTop: 3,
    backgroundColor: '#d6d9e0',
    width: 16,
    height: 16,
    borderRadius: 4
  },
  fullBox: {
    margin: 5,
    marginTop: 3,
    backgroundColor: SECONDARY_COLOR,
    width: 16,
    height: 16,
    borderRadius: 4
  },
  conditionText: {
    color: '#9c9eb9',
    fontSize: 14,
    margin: 5,
    marginTop: 2
  },
  greenContainer: homeStyle.greenContainer,
  greenText: homeStyle.greenText,
  blueContainer: homeStyle.blueContainer,
  blueText: homeStyle.blueText
});

export default styles;
