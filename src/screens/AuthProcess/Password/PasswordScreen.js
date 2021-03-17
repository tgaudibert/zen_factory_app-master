import React from 'react';
import {KeyboardAvoidingView , Platform, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Image ,Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeaderBack from '../../../components/LogoHeaderBack/LogoHeaderBack';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import {userSignUp} from "../../../redux/actions/Register";

import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";
import * as RNLocalize from "react-native-localize";



function RegisterErrors(props) {

  const {viewErrors,isPressed,apiErrors} = props;
  if (viewErrors.isLenghtEnought && viewErrors.hasUpperCase && viewErrors.checkNumber && isPressed) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          {translate("AUTH_PASSWORD_WARNING")}
        </Text>
      </View>
    )
  }
  else if (apiErrors){
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          { (apiErrors.response.status == 400 || apiErrors.response.status ==403) ? translate(JSON.parse(apiErrors.request.response).error) :  "an error happenned"}
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


class PasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm_password:'',
      isLenghtEnought: false,
      hasUpperCase : false,
      checkNumber : false,
      isValid:false
    };
  }



  checkCharacters() {
    if (this.state.password.length < 8) {
      this.setState({isLenghtEnought :false})
    }else{
      this.setState({isLenghtEnought :true})
    }
  }

  checkUpperCase() {
    if (this.state.password.toUpperCase() == this.state.password){
      this.setState({hasUpperCase:false})
    }else{
      this.setState({hasUpperCase:true})
    }
  }

  checkNumber() {
    if(/\d/.test(this.state.password)){
      this.setState({checkNumber:true})
    }else{
      this.setState({checkNumber:false})
    }
  }

  updatePassword(input){
    this.setState({password:input})
    this.checkNumber()
    this.checkUpperCase()
    this.checkCharacters()
  }

  checkConfirmed(input) {
    if((this.state.password == input)){
      this.setState({isPasswordConfirmed:true})
    }else{
      this.setState({isPasswordConfirmed:false})
    }
  }

  updateConfirmPassword(input){
    this.setState({confirm_password:input})
    this.checkConfirmed(input)
  }

  onPressButton = async () => {
    this.setState({
      isPressed:true
    })

    const user = {
      password:this.state.password,
      confirm_password:this.state.password,
      username:this.props.username,
      name:this.props.name,
      verification_code:this.props.verification_code,
      profilepic_url:this.props.profilepic_url,
      lang:RNLocalize.getLocales()[0].languageCode
    }

    if(this.state.hasUpperCase && this.state.checkNumber && this.state.isLenghtEnought){
      this.props.userSignUp(user)
    }
  };

  render() {
    const error = this.props.common.error
    if(this.state.loading){
      return(
        <LoadingController/>
      )
    }else{
      return (
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={40}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView >
            <LogoHeaderBack
              onPress={() => { NavigatorService.goBack(); }}
            />

            <Text style={styles.title}>{translate("AUTH_PASSWORD_TITLE")}</Text>


            <RegisterErrors viewErrors={this.state} isPressed={this.state.isPressed} apiErrors={this.props.common.error} />


            <View style={styles.conditionContainer}>
              <View style={styles.inputContainer}>
                <Image style={styles.icon} source={require('../../../../assets/icons/password.png')} />
                <TextInput
                  secureTextEntry
                  style={styles.input}
                  placeholder={translate("AUTH_PASSWORD_ENTRY")}
                  onChangeText={text => this.updatePassword(text)}
                  value={this.state.password}
                />
              </View>

              <View style={styles.rowContainer}>
                <View style={this.state.isLenghtEnought ? styles.fullBox : styles.emptyBox } />
                <Text style={styles.conditionText}>{translate("AUTH_PASSWORD_POLICY1")}</Text>
              </View>
              <View style={styles.rowContainer}>
                <View style={this.state.hasUpperCase ? styles.fullBox : styles.emptyBox } />
                <Text style={styles.conditionText}>{translate("AUTH_PASSWORD_POLICY2")}</Text>
              </View>
              <View style={styles.rowContainer}>
                <View style={this.state.checkNumber ? styles.fullBox :styles.emptyBox } />
                <Text style={styles.conditionText}>{translate("AUTH_PASSWORD_POLICY3")}</Text>
              </View>
            </View>
            <ContinueButton onPress={() => { this.onPressButton() }} />
          </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    name: state.registration.name,
    username: state.registration.username,
    userPhoto: state.registration.userPhoto,
    verification_code:state.registration.verification_code,
    profilepic_url:state.registration.profilepic_url,
    common:state.common
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    userSignUp:user => dispatch(userSignUp(user)),
    addUserPassword: password => dispatch({ type: 'ADD_USERPASSWORD', password })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordScreen);
