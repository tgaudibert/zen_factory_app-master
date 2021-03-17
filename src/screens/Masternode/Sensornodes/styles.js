import { StyleSheet, Dimensions } from 'react-native';
import { homeStyle, performance ,SECONDARY_COLOR} from '../../../AppStyles';
// screen sizing
const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width < height ? width : height;

const glassNumColums = 4;
// item size

const GLASS_ITEM_OFFSET = 25;
const GLASS_ITEM_MARGIN = GLASS_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: homeStyle.container,
  titleContainer: homeStyle.titleContainer,
  title: homeStyle.title,
  waterText: homeStyle.purpleText,
  mainText: homeStyle.mainText,
  secText: homeStyle.secText,
  infoContainer: homeStyle.infoContainer,
  infoContainer2: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: 'silver'
  },
  sensorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: GLASS_ITEM_OFFSET,
    marginTop: 20,
    width: (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN,
    height: (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN + 10
  },
  glass: {
    //marginLeft: 100,
    width: (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN,
    height: (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN
  },
  glass2: {
    width: (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN,
    height: (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN
  },
  photoContainer: {
    margin: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    marginLeft: GLASS_ITEM_OFFSET,
    marginRight: GLASS_ITEM_OFFSET
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
  plus: {
    alignSelf: 'center',
    position: 'absolute',
    top: ((SCREEN_WIDTH - GLASS_ITEM_MARGIN) / glassNumColums - GLASS_ITEM_OFFSET) / 2 - 20,
    width: ((SCREEN_WIDTH - GLASS_ITEM_MARGIN) / glassNumColums - GLASS_ITEM_OFFSET) / 2,
    height: ((SCREEN_WIDTH - GLASS_ITEM_MARGIN) / glassNumColums - GLASS_ITEM_OFFSET) / 2
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
    backgroundColor: SECONDARY_COLOR,
    height: '100%',
    zIndex: 1
  },
  bar3: {
    width: '33.33%',
    backgroundColor: 'black',
    height: '100%',
    zIndex: 1
  },



  detailsContainer: performance.detailsContainer,
  performanceContainer: performance.performanceContainer,
  performanceContainerBorderless: performance.performanceContainerBorderless,
  performanceRowContainer: performance.performanceRowContainer,
  performanceIcon: performance.performanceIcon,
  performanceTextContainer: performance.performanceTextContainer
});

export default styles;
