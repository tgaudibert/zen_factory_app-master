import React from 'react';
import { KeyboardAvoidingView , Platform,Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Image ,Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeaderBack from '../../../components/LogoHeaderBack/LogoHeaderBack';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import {resetPassword} from "../../../redux/actions/ResetPassword";
import LoadingController from '../../../components/loading/LoadingController';
import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";


function EmailErrors(props) {
  const {error,isPressed,apiErrors} = props;
  if (error && isPressed) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          {translate("AUTH_RESETPASSWORD_WARNING")}
        </Text>
      </View>
    )
  }
  return(
    <View style={ styles.greenContainer } >
      <Text style={ styles.greenText} >

      </Text>
    </View>
  )
}


class ResetPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isValid:false,
      isPressed:false
    };
  }


  onPressButton = () => {
    this.setState({isPressed:true})
    if(this.state.isValid){
      this.props.addResetusername(this.state.username)
      this.props.resetPassword(this.state.username)
    }else{
      console.log("invalid Email")
    }
  };


  updateUsername(input){
    this.setState({username:input})

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(this.state.username.toLowerCase()) == 0){
      this.setState({isValid:false})
    }else{
      this.setState({isValid:true})
    };
  }



  render() {
    const error = this.props.common.error
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={40}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <LogoHeaderBack
            onPress={() => { NavigatorService.goBack() }}
          />
        <Text style={styles.title}>{translate("AUTH_RESETPASSWORD_TITLE")}</Text>

          <EmailErrors error={!this.state.isValid} isPressed={this.state.isPressed} apiErrors={this.props.common.error}/>

          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <Image style={styles.icon} source={require('../../../../assets/icons/email.png')} />
              <TextInput
                style={styles.input}
                placeholder={translate("AUTH_RESETPASSWORD_EMAIL")}
                onChangeText={text => this.updateUsername(text)}
                value={this.state.username}
              />
            </View>
            <View style={styles.rowContainer}>
              <View style={this.state.isValid ?  styles.fullBox : styles.emptyBox} />
              <Text style={styles.conditionText}>{translate("AUTH_RESETPASSWORD_VALID")}</Text>
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
    common:state.common,
    username:state.registration.username
  };
}


function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    resetPassword:username => dispatch(resetPassword(username)),
    addResetusername: username => dispatch({ type: 'ADD_RESET_USERNAME', username })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordScreen);
