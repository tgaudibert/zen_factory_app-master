import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView , Platform
} from 'react-native';
import LogoHeaderBack from '../../../components/LogoHeaderBack/LogoHeaderBack';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {userSignIn} from "../../../redux/actions/Auth";
import LoadingController from '../../../components/loading/LoadingController';
import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";

import AsyncStorage from '@react-native-community/async-storage';


function LoginErrors(props) {
  return(
    <View style={ styles.greenContainer } >
      <Text style={ styles.greenText} >

      </Text>
    </View>
  )
}


class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      entryPassword:''
    };
  }


  goLandingBack(){
    const state = {
      route:'Home',
      date:Date.now()
    }
    AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state))
    NavigatorService.navigate('Home')
  }


  onPressButton = async () => {
    console.log(this.state)
    this.props.userSignIn(this.state)
  };

  onPressResetPassword = () => {
    NavigatorService.navigate('ResetPassword');
  };

  onUpdatePassword = (entry) => {
    const letter = '☉';
    this.setState({
      entryPassword:letter.repeat(entry.length),
      password: (entry.length !=0 && entry[entry.length -1] != letter) ? this.state.password += entry[entry.length -1] : this.state.password.substring(0,entry.length)
    })
  }

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
              onPress={() => { this.goLandingBack() }}
            />

            <Text style={styles.title}>{translate("AUTH_SIGNIN_TITLE")}</Text>

            <LoginErrors error={this.props.common.error} />

            <View style={styles.mainContainer}>

              <View style={styles.inputContainer}>
                <Image style={styles.icon} source={require('../../../../assets/icons/email.png')} />
                <TextInput
                  style={styles.input}
                  placeholder={translate("AUTH_SIGNIN_EMAIL")}
                  onChangeText={text => this.setState({ username: text })}
                  value={this.state.username}
                />
              </View>

              <View style={styles.inputContainer}>
                <Image style={styles.icon} source={require('../../../../assets/icons/password.png')} />
                <TextInput
                  secureTextEntry
                  style={styles.input}
                  placeholder={translate("AUTH_SIGNIN_PASSWORD")}
                  onChangeText={text =>this.onUpdatePassword(text)}
                  value={ this.state.entryPassword}
                />
              </View>
            </View>

            <View style={styles.logContainer}>
              {this.props.common.loading
                ?
                  <LoadingController/>
                :
                <TouchableHighlight
                  style={styles.btnContainer}
                  onPress={() => this.onPressButton()}
                >
                  <Text style={styles.btnText}>{translate("AUTH_SIGNIN_BUTTON")} </Text>
                </TouchableHighlight>
              }

              <View style={styles.bottomRowContainer}>
                <Text style={styles.text}>{translate("AUTH_SIGNIN_FORGOTPASSWORD")}</Text>
                <TouchableHighlight
                  onPress={() => this.onPressResetPassword()}
                >
                  <Text style={styles.signText}>{translate("AUTH_SIGNIN_RESETPASSWORD")}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    common : state.common
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    userSignIn:user => dispatch(userSignIn(user)),
    showModal: message => dispatch({ type: 'SHOW_MODAL', message})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
