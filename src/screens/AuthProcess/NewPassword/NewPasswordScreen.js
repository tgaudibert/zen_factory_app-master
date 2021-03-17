import React from 'react';
import { KeyboardAvoidingView , Platform, Text, View, TextInput, TouchableWithoutFeedback, Keyboard , Image, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeaderBack from '../../../components/LogoHeaderBack/LogoHeaderBack';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import {newPassword} from "../../../redux/actions/ResetPassword";



import LottieView from 'lottie-react-native';
import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";


function NewPasswordErrors(props) {
  const {viewErrors,isPressed,apiErrors} = props;
  if ((!viewErrors.isLenghtEnought || !viewErrors.hasUpperCase || !viewErrors.checkNumber) && isPressed) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          {translate("AUTH_NEWPASSWORD_WARNING")}
        </Text>
      </View>
    )
  }else if (!viewErrors.isPasswordConfirmed && isPressed) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          {translate("AUTH_NEWPASSWORD_NOMATCH")}
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


class NewPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm_password:'',
      isLenghtEnought: false,
      hasUpperCase : false,
      checkNumber : false,
      isPasswordConfirmed:false
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

    if(this.state.hasUpperCase && this.state.checkNumber && this.state.isLenghtEnought && this.state.isPasswordConfirmed){
      if(this.props.logged_username){
        const updateData = {
          password:this.state.password,
          confirm_password:this.state.confirm_password,
          username: this.props.logged_username,
          verification_code:this.props.verification_code
        }
        console.log(updateData)
        this.props.newPassword(updateData)

      }else{
        const updateData = {
          password:this.state.password,
          confirm_password:this.state.confirm_password,
          username: this.props.unlogged_username,
          verification_code:this.props.verification_code
        }
        console.log(updateData)
        this.props.newPassword(updateData)
      }

    }
  };

  render() {
    const error = this.props.common.error
    return(
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={40}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView >
          <LogoHeaderBack
            onPress={() => { NavigatorService.goBack(); }}
          />


        <Text style={styles.title}>{translate("AUTH_NEWPASSWORD_TITLE")}</Text>

          <NewPasswordErrors viewErrors={this.state} isPressed={this.state.isPressed} apiErrors={this.props.common.error} />
          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <Image style={styles.icon} source={require('../../../../assets/icons/password.png')} />
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder={translate("AUTH_NEWPASSWORD_ENTRY")}
                onChangeText={text => this.updatePassword(text)}
                value={this.state.password}
              />
            </View>

            <View style={styles.inputContainer}>
              <Image style={styles.icon} source={require('../../../../assets/icons/password.png')} />
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder={translate("AUTH_NEWPASSWORD_ENTRY2")}
                onChangeText={text => this.updateConfirmPassword(text)}
                value={this.state.confirm_password}
              />
            </View>

            <View style={styles.rowContainer}>
              <View style={this.state.isLenghtEnought ? styles.fullBox : styles.emptyBox } />
              <Text style={styles.conditionText}>{translate("AUTH_NEWPASSWORD_POLICY1")}</Text>
            </View>
            <View style={styles.rowContainer}>
              <View style={this.state.hasUpperCase ? styles.fullBox : styles.emptyBox } />
              <Text style={styles.conditionText}>{translate("AUTH_NEWPASSWORD_POLICY2")}</Text>
            </View>
            <View style={styles.rowContainer}>
              <View style={this.state.checkNumber ? styles.fullBox :styles.emptyBox } />
              <Text style={styles.conditionText}>{translate("AUTH_NEWPASSWORD_POLICY3")}</Text>
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
    logged_username:state.user.username,
    unlogged_username:state.resetpassword.username,
    verification_code:state.resetpassword.verification_code
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    newPassword:data => dispatch(newPassword(data)),
    showError: error => dispatch({ type: 'FETCH_ERROR', payload:error})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPasswordScreen);
