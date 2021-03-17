import React from 'react';
import { KeyboardAvoidingView , Platform,Text, View, TextInput, TouchableWithoutFeedback, Keyboard,Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../../components/ContinueButton/ContinueButton';
import styles from './styles';

import LoadingController from '../../../../components/loading/LoadingController'
import {updateSensorNode} from '../../../../redux/actions/SensorNodes'
import NavigatorService from '../../../../util/navigator'

import { translate } from "../../../../../App";

class UpdateSensornodeNameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensornode_name: ''
    };
  }

  async componentDidMount(){
    if(!this.props.updating_sensornode){
      NavigatorService.navigate('Home')
    }
  }

  checkCharacters() {
    if (this.state.sensornode_name.length < 3) return 1;
    return 0;
  }


  onPressButton = async () => {
    this.props.updateSensornode_name(this.state.sensornode_name);
    const sendingData = {
      sensornode_name : this.state.sensornode_name,
      sensornode_product : this.props.updating_sensornode.sensornode_product,
      isactive : 1,
      id_sensornode : this.props.updating_sensornode.id_sensornode
    }
    //ONLY UPDATE IF the sensor alreadu exists
    if(!this.props.current_sensornode.iswaiting){
      this.props.updateSensorNode(sendingData)
    }else{
      NavigatorService.navigate('UpdateSensornodeProduct');
    }
  };


  navigateBack(){
    if(this.props.current_sensornode.sensornode_product){
      NavigatorService.navigate('SensornodeState');
    }else{
      NavigatorService.navigate('PendingDevices');
    }
  }

  render() {
    const error = this.props.common.error
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={80}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView >
          <LogoHeader
            onPress={() => {
              this.navigateBack();
            }}
          />
        <Text style={styles.title}>{translate("SENSORNODE_NAME_TITLE")}</Text>
          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={translate("SENSORNODE_NAME_ENTRY")}
                onChangeText={text => this.setState({ sensornode_name: text })}
                value={this.state.sensornode_name}
              />
            </View>
            <View style={styles.rowContainer}>
              <View style={this.checkCharacters() ? styles.emptyBox : styles.fullBox} />
              <Text style={styles.conditionText}>{translate("SENSORNODE_NAME_VALID")}</Text>
            </View>
          </View>

          <ContinueButton onPress={() => { this.onPressButton() }} />

        </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}


function mapStateToProps(state) {
  return {
    current_sensornode:state.sensor.current_sensornode,
    updating_sensornode:state.sensor.updating_sensornode,
    common:state.common
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    updateSensorNode: sensornode => dispatch(updateSensorNode(sensornode)),
    updateSensornode_name: sensornode_name => dispatch({ type: 'UPDATE_SENSORNODE_NAME', sensornode_name })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateSensornodeNameScreen);
