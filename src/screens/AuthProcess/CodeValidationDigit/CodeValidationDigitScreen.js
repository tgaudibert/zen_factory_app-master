import React, {useState} from 'react';
import { View, TextInput, TouchableWithoutFeedback, Keyboard, Image,ScrollView,SafeAreaView, Text ,Alert} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { validateRegistrationCode} from "../../../redux/actions/Register";
import {validateResetCode } from "../../../redux/actions/ResetPassword";
import { translate } from "../../../../App";

import LogoHeaderBack from '../../../components/LogoHeaderBack/LogoHeaderBack';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import LoadingController from '../../../components/loading/LoadingController';
import styles from './styles';
import Code from './CodeComponent'


import NavigatorService from '../../../util/navigator'


function CodeErrors(props) {
  const {isPressed,apiErrors} = props;
  return(
    <View style={ styles.greenContainer } >
      <Text style={ styles.greenText} >

      </Text>
    </View>
  )
}

class CodeValidationDigitScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verification_code: ''

    };
  }



  async goLandingBack(){
    const userToken = await AsyncStorage.getItem('userToken');
    if(userToken){
      NavigatorService.navigate('Home')
    }else{
      const state = {
        route:'Home',
        date:Date.now()
      }
      AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state))
      NavigatorService.goBack()
    }
  }


  render() {
    const error = this.props.common.error
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <LogoHeaderBack
            onPress={() => { this.goLandingBack();}}
          />
          <Text style={styles.title}>{translate("AUTH_CODE_TITLE")}</Text>
            <CodeErrors isPressed={this.state.isPressed} apiErrors={this.props.common.error}/>
            <Code data={this.props}/>
          </SafeAreaView>
        </TouchableWithoutFeedback>
    );

  }
}


function mapStateToProps(state) {
  return {
    common:state.common,
    registration:state.registration,
    resetpassword:state.resetpassword,
    username: state.user.username

  };
}


function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    validateRegistrationCode:verification_code => dispatch(validateRegistrationCode(verification_code)),
    validateResetCode:verification_code => dispatch(validateResetCode(verification_code)),
    addResetcode: verification_code => dispatch({ type: 'ADD_RESET_CODE', verification_code }),
    addRegistrationcode: verification_code => dispatch({ type: 'ADD_REGISTRATION_CODE', verification_code })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeValidationDigitScreen);
