import { StyleSheet } from 'react-native';
import { homeStyle ,SECONDARY_COLOR, SECONDARY_COLOR_COMPLEMENTARY} from '../../AppStyles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff'
  },
  logoContainer: {
    width: 80,
    height: 80,
    padding: 10,
    borderRadius: 80,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  logo: {
    width: 50,
    height: 50
  },
  textContainer: {
    width: '80%'
  },
  mainTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SECONDARY_COLOR,
    textAlign: 'center',
    margin: 5
  },
  secTxt: {
    fontSize: 16,
    fontWeight: '400',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    margin: 5
  },
  arrowContainer: {
    alignSelf: 'center',
    marginTop: 20
  },
  arrow: {
    width: 60,
    height: 60,
    margin: 10
  }
});

export default styles;
