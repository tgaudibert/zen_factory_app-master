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
  Image,
  ImageBackground
} from "react-native";
import { connect } from 'react-redux';
import { registration } from '../../AppStyles';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';



function HandleErrors(props) {
  const error = props.error;
  if (error.request && error.request.status) {
    return(
      <Text style={styles.secTxt}>{error.request.status == 401 ? 'You do not have the authorizations to perform your action' : 'An error happened'} </Text>
    )
  }
  return(
    <Text style={styles.secTxt}> You're not connected </Text>
  )
}


class ModalController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true
    };
  }


  _hideModal(){
    console.log("touched")
    this.props.hideMessage("")
    this.setState({
      modalVisible: false,
    })
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View>
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
        </View>
      </Modal>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return {
    hideMessage: data => dispatch({ type: 'HIDE_MESSAGE'})
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
