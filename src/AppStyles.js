import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const CONTAINER_HEIGHT = 50;
const SCREEN_WIDTH = width < height ? width : height;


export const BLACK_COLOR = "#cbf7dd"
export const PRIMARY_COLOR = '#2eff97'
//export const PRIMARY_COLOR = '#c4f4ff'
//export const SECONDARY_COLOR = '#26baff'
export const SECONDARY_COLOR_COMPLEMENTARY = '#2eff97'

export const BLUE_CONTAINER_COLOR = '#2eff97'
export const BLUE_TEXT_COLOR= '#004724'

//export const GREEN_CONTAINER_COLOR = '#c4f4ff'
//export const GREEN_TEXT_COLOR= '#020d0f'

export const SECONDARY_COLOR = '#00d169'

export const GREEN_CONTAINER_COLOR = '#2eff97'
export const GREEN_TEXT_COLOR= '#004724'

export const WARNING_TEXT_COLOR = '#fe9c5e'
export const WARNING_CONTAINER_COLOR = '#ffefe5'


const POST_WHITE_COLOR = '#ffffff'



export const logoContainer = StyleSheet.create({
  headerContainer: {
    height: CONTAINER_HEIGHT,
    marginTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logo: {
    alignSelf: 'center',
    width: 60,
    height: 60
  },
  backIcon: {
    width: 25,
    height: 25
  },
  iconContainer: {
    position: 'absolute',
    left: 25,
    top: 10
  }
});

export const registration = StyleSheet.create({
  keyboard: {
    flex:1,
    opacity:0.1
  },
  container: {
    flex: 1,
    marginTop:-70,
    backgroundColor: '#F4F6FA',
    fontFamily: 'Rubik'
  },
  container2: {
    flex: 1,
    marginTop:-80,
    backgroundColor: '#F4F6FA',
    fontFamily: 'Rubik'
  }

});

export const homeStyle = StyleSheet.create({
  headerStyle: {
    backgroundColor: PRIMARY_COLOR,
    elevation: 0,
    height: 80,
    shadowColor: 'transparent',
    borderBottomWidth: 0
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Rubik'
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    width: SCREEN_WIDTH - 100
  },
  title: {
    fontWeight: 'bold',
    color: '#2d3142',
    fontSize: 24,
    textAlign: 'center'
  },
  greenTextSensor: {
    color: SECONDARY_COLOR
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2d3142'
  },
  secText: {
    fontWeight: 'bold',
    color: '#9c9eb9',
    fontSize: 14
  },
  infoContainer: {
    backgroundColor: PRIMARY_COLOR,
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: 'silver'
  },

  warningContainer: {
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: WARNING_CONTAINER_COLOR
  },
  warningText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: WARNING_TEXT_COLOR
  },

  greenContainer: {
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: GREEN_CONTAINER_COLOR
  },
  greenText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GREEN_TEXT_COLOR
  },
  blueContainer: {
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: BLUE_CONTAINER_COLOR
  },
  blueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BLUE_TEXT_COLOR
  },
  btnContainer: {
    backgroundColor: GREEN_CONTAINER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 5,
    width: 80,
    height: 30
  },
  btnText: {
    color: GREEN_TEXT_COLOR,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    fontWeight: 'bold'
  },
  warningBtnContainer: {
    backgroundColor: WARNING_CONTAINER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 5,
    width: 80,
    height: 30
  },
  warningBtnText: {
    color: WARNING_TEXT_COLOR,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 12
  }
});

export const post = StyleSheet.create({
  postContainer: {
    backgroundColor: POST_WHITE_COLOR,
    borderColor: '#ffff',
    borderRadius: 10,
    width: '100%',
    paddingTop: 15,
    padding: 5,
    marginBottom: 10
  },
  rowContainer: {

    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10
  },
  authorImg: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10
  },
  authorName: {
    fontSize: 16,
    color: '#2d3142',
    fontWeight: 'bold'
  },
  date: {
    fontSize: 12,
    color: '#9c9eb9'
  },
  postImg: {
    margin: 10,
    width: '100%',
    height: 250,
    borderRadius: 10,
    alignSelf: 'center'
  },
  postTitle: {
    color: '#2d3142',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10
  },
  icon: {
    width: 26,
    height: 26
  },
  iconText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9c9eb9',
    marginRight: 20,
    marginLeft: 5,
    marginTop: 4
  }
});

export const performance = StyleSheet.create({
  detailsContainer: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#ffff',
    padding: 10
  },
  performanceContainer: {
    width: '95%',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: 'silver',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  performanceContainerBorderless: {
    width: '95%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  performanceRowContainer: {
    flexDirection: 'row'
  },
  performanceIcon: {
    alignSelf: 'center',
    width: 24,
    height: 24,
    marginRight: 20
  },
  performanceTextContainer: {
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});
