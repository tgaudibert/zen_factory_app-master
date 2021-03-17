import { StyleSheet } from 'react-native';
import { homeStyle, performance } from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    fontFamily: 'Rubik',
    padding: 20,
    paddingTop: 10
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 30,
    color: '#2d3142',
    fontWeight: 'bold'
  },
  settingContainer: {
    alignSelf: 'center',
    padding: 15,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderColor: 'silver',
    width: '100%'
  },
  settingText: {
    fontSize: 16,
    color: '#2d3142',
    fontWeight: 'bold'
  },
  rowContainer: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'silver',
    padding: 15,
    paddingLeft: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backArrow: {
    width: 25,
    height: 25
  },
  greenContainer: homeStyle.greenContainer,
  greenText: homeStyle.greenText,
  blueContainer: homeStyle.blueContainer,
  blueText: homeStyle.blueText,
});

export default styles;
