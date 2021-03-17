import { StyleSheet } from 'react-native';
import { homeStyle,SECONDARY_COLOR, post } from '../../AppStyles';

const styles = StyleSheet.create({
  container: homeStyle.container,
  titleContainer: homeStyle.titleContainer,
  title: homeStyle.title,
  caloriesText: homeStyle.purpleText,
  foodName: { ...homeStyle.mainText, marginBottom: 5 },
  secText: homeStyle.secText,
  mainText: homeStyle.mainText,

  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowContainer: {
    width: '95%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orangeBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#ffa56c'
  },

  greenBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#3fc7bc'
  },

  addIcon: {
    width: 35,
    height: 35,
    margin: 20,
    alignSelf: 'center'
  },
  deleteIcon: {
    width: 25,
    height: 25
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  deleteContainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 30,
    borderRadius: 10
  },
  deleteTxt: {
    textAlign: 'center',
    fontFamily: 'Rubik',
    color: '#2d3142',
    fontSize: 18,
    margin: 10
  },
  deleteSecTxt: {
    fontFamily: 'Rubik',
    color: '#2d3142',
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    fontFamily: 'Rubik'
  },
  headerContainer: {
    width: '100%',
    // marginTop: 10,
    backgroundColor: '#fff',
    textAlign: 'left',
    padding: 20
  },
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

  boldText: {
    margin: 10,
    fontSize: 30,
    color: '#2D3142',
    fontWeight: 'bold',
    lineHeight: 30
  },
  normalText: {
    margin: 10,
    color: '#2D3142',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  detailText: {
    margin: 10,
    color: '#7265e3',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
    letterSpacing: 0.2
  },
  infoContainer: {

    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: 'silver'
  },
  infoContainer2: {
    backgroundColor: '#2eff97',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: 'silver'
  },
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
  textContainer2: {
    width: '60%',
    marginTop: 0,
    margin: 20
  },
  textContainer: {
    width: '80%',
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
  bar2: {
    width: '33.33%',
    backgroundColor: 'black',
    height: '100%',
    zIndex: 1
  },
  bar3: {
    width: '33.33%',
    backgroundColor: SECONDARY_COLOR,
    height: '100%',
    zIndex: 1
  },
  headerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  greenContainer: homeStyle.greenContainer,
  greenText: homeStyle.greenText,
  blueContainer: homeStyle.blueContainer,
  blueText: homeStyle.blueText,


  warningContainer: homeStyle.warningContainer,
  warningText: homeStyle.warningText,






  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    fontFamily: 'Rubik'
  },
  title: {
    lineHeight: 30,
    fontSize: 30,
    color: '#2d3142',
    fontWeight: 'bold'
  },
  titleContainer: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inscription: {
    height: 20,
    width: 20,
    marginRight: 10
  },
  cardImg: {
    width: 60,
    height: 60,
    borderRadius: 60,
    margin: 10,
    marginLeft: 0,
    marginRight: 20
  },
  carouselContainer: {
    margin: 20
  },
  postContainer: post.postContainer,
  rowContainer: post.rowContainer,
  authorImg: post.authorImg,
  authorName: post.authorName,
  date: post.date,
  postImg: post.postImg,
  postTitle: post.postTitle,
  icon: post.icon,
  iconText: post.iconText

});

export default styles;
