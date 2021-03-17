import { StyleSheet, Dimensions } from 'react-native';
import { homeStyle, performance } from '../../../AppStyles';

// screen sizing
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const ICONNumColums = 4;
// item size
const ICON_ITEM_OFFSET = 5;
const ICON_ITEM_MARGIN = ICON_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: homeStyle.container,
  titleContainer: homeStyle.titleContainer,
  title: homeStyle.title,
  stepsText: homeStyle.greenTextSensor,
  mainText: homeStyle.mainText,
  secText: homeStyle.secText,
  detailsContainer: performance.detailsContainer,
  performanceContainer: performance.performanceContainer,
  performanceContainerBorderless: performance.performanceContainerBorderless,
  performanceRowContainer: performance.performanceRowContainer,
  performanceIcon: performance.performanceIcon,
  performanceTextContainer: performance.performanceTextContainer,
  infoContainer: homeStyle.infoContainer,
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    marginLeft: 40,
    marginRight: 40
  },
  columnContainer: {
    flexDirection: 'column',
    alignSelf: 'center'
  },
  line: {
    width: 1,
    height: 40,
    backgroundColor: 'silver',
    marginLeft: 20,
    marginRight: 20
  },
  circleContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: SCREEN_WIDTH - 100
  },
  circleText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    fontWeight: 'bold'
  },
  circleImg: {
    width: 30,
    height: 30,
    alignSelf: 'center'
  },
  chartContainer: {
    height: 400,
    borderColor: '#000',
    borderWidth: 1
  },
  statisticContainer: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  statisticTxt: { ...homeStyle.mainText, margin: 10 },
  goalAchievedIcon: {
    width: 30,
    height: 30,
    margin: 20,
    alignSelf: 'center'
  },
  greenContainer: homeStyle.greenContainer,
  greenText: homeStyle.greenText,
  blueContainer: homeStyle.blueContainer,
  blueText: homeStyle.blueText,

  rowContainer: {
    flexDirection: 'row'
  },
  rowContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnContainer: homeStyle.btnContainer,
  btnText: homeStyle.btnText,
  warningBtnContainer: homeStyle.warningBtnContainer,
  warningBtnText: homeStyle.warningBtnText,
  questionIcon: {
    alignSelf: 'center',
    width: 50,
    height: 50
  },
  textContainer: {
    width: '50%',
    marginTop: 0,
    fontWeight: 'bold',
    margin: 20
  },
  bar: {
    marginLeft: 20,
    height: 4,
    width: '92%',
    borderRadius: 40,
    alignContent: 'stretch',
    flexDirection: 'row'
  },
  columnContainer: {
    marginTop: 0,
    margin: 10,
    flex: 1,
    alignContent: 'stretch'
  },
  bar1: {
    width: '33.33%',
    backgroundColor: '#fe9c5e',
    height: '100%',
    zIndex: 1
  },
  bar2: {
    width: '33.33%',
    backgroundColor: '#f77777',
    height: '100%',
    zIndex: 1
  },
  bar3: {
    width: '33.33%',
    backgroundColor: '#7265e3',
    height: '100%',
    zIndex: 1
  },
  sensorIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20
  },
  titleContainer: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    width: SCREEN_WIDTH - 100
  }
});

export default styles;
