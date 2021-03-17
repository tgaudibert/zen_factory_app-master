import { StyleSheet, Dimensions } from 'react-native';
import {SECONDARY_COLOR} from '../../AppStyles';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor:'white'
  },
  btnContainer: {
    width: SCREEN_WIDTH - 100,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: SECONDARY_COLOR,
    borderColor: SECONDARY_COLOR,
    borderRadius: 60,
    alignSelf: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 60,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
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
    width: '100%'
  },
  mainTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SECONDARY_COLOR,
    textAlign: 'center',
    margin: 0
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
