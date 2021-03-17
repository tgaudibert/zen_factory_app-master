
import React from 'react';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Image
} from "react-native";
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import { registration } from '../../AppStyles';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import { translate } from "../../../App";

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


function HandleErrors(props) {
  const error = props.error;
  if(error && error.request && error.request.response){
    //console.log(JSON.parse(error.request.response).error)
    switch(error.request.status){
      case 0:
        return( <Text style={styles.secTxt}> {translate('CONNECTION_ERROR')} </Text>)
        break
      case 400:
        return( <Text style={styles.secTxt}>{translate(JSON.parse(error.request.response).error)} </Text> )
        break
      case 401:
        return( <Text style={styles.secTxt}>{translate(JSON.parse(error.request.response).error)} </Text> )
        break
      case 403:
        return( <Text style={styles.secTxt}>{translate(JSON.parse(error.request.response).error)} </Text> )
        break
      case 500:
        return( <Text style={styles.secTxt}>{translate(JSON.parse(error.request.response).error)} </Text> )
        break
      case 502:
        return( <Text style={styles.secTxt}> {translate('CONNECTION_ERROR')} </Text>)
        break

      default:
        return( <Text style={styles.secTxt}> {translate('CONNECTION_ERROR')} </Text>)
    }
  }else{
    return( <Text style={styles.secTxt}> {translate('CONNECTION_ERROR')} </Text>)
  }

}




class ModalController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      token:true
    };
  }

  async componentDidMount(){
    this.animation.play();
    this.setState({token:false})
  }

  _hideModal(){
    console.log("touched")
    this.props.hideMessage("")
  }


  render() {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={true}
      >
      {this.state.token || (this.props.common.loading  && !this.props.common.is_error)
        ?
          <View style={styles.centeredView}>
            <LottieView
                ref={animation => {
                  this.animation = animation;
                }}
                source={require('./loading4.json')}
              />
          </View>
        :

          <View style={styles.modalView}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../../../assets/icons/monitor.png')} />
            </View>
            <Text style={styles.mainTxt}>Hi :)</Text>
            <HandleErrors error={this.props.common.error}/>
            <TouchableHighlight style={styles.arrowContainer} onPress={() => this._hideModal()}>
              <Image style={styles.arrow} source={require('../../../assets/icons/validated.png')} />
            </TouchableHighlight>
          </View>

        }
      </Modal>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return {
    hideMessage: data => dispatch({ type: 'HIDE_MESSAGE', data})
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    common : state.common
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalController);
