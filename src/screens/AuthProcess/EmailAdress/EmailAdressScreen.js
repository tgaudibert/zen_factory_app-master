import React from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Image ,Alert, KeyboardAvoidingView , Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeaderBack from '../../../components/LogoHeaderBack/LogoHeaderBack';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import LoadingController from '../../../components/loading/LoadingController';
import {checkEmail} from "../../../redux/actions/Register";
import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";


function EmailErrors(props) {
  const {viewErrors,isPressed,apiErrors} = props;
  if (viewErrors && isPressed) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          {translate("AUTH_EMAIL_WARNING")}
        </Text>
      </View>
    )
  }
  return(
    <View style={ styles.greenContainer } >
      <Text style={ styles.greenText} ></Text>
    </View>
  )
}


class EmailAdressScreen extends React.Component {
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
    this.props.addUsername(this.state.username);
    if(this.state.isValid){
      this.props.checkEmail(this.state.username)
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

  goLandingBack(){
    const state = {
      route:'Home',
      date:Date.now()
    }
    AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state))
    NavigatorService.goBack();
  }


  render() {
    const error = this.props.common.error
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "height" : "height"}
        style={styles.container}
        keyboardVerticalOffset={40}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView scrollEnabled={true}>
          <LogoHeaderBack
            onPress={() => { this.goLandingBack();}}
          />

          <Text style={styles.title}>{translate("AUTH_EMAIL_TITLE")}</Text>

          <EmailErrors viewErrors={!this.state.isValid} isPressed={this.state.isPressed} apiErrors={this.props.common.error}/>
          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <Image style={styles.icon} source={require('../../../../assets/icons/email.png')} />
              <TextInput
                style={styles.input}
                placeholder={translate("AUTH_EMAIL_ENTRY")}
                onChangeText={text => this.updateUsername(text)}
                value={this.state.username}
              />
            </View>
            <View style={styles.rowContainer}>
              <View style={this.state.isValid ?  styles.fullBox : styles.emptyBox} />
              <Text style={styles.conditionText}>{translate("AUTH_EMAIL_VALID")}</Text>
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
    username: state.registration.username,
    common:state.common
  };
}


function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    addUsername: username => dispatch({ type: 'ADD_USERNAME', username:username }),
    checkEmail: username => dispatch(checkEmail(username))

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailAdressScreen);
