import React from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeaderBack from '../../../components/LogoHeaderBack/LogoHeaderBack';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import {validateResetCode, validateRegistrationCode} from "../../../redux/actions/Auth";
import LoadingController from '../../../components/loading/LoadingController';
import NavigatorService from '../../../util/navigator'


function CodeErrors(props) {
  const {isPressed,apiErrors} = props;
  if (apiErrors){
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          { (apiErrors.response.status == 400 || apiErrors.response.status ==401) ? "Invalid Code" :  "an error happenned"}
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


class CodeValidationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verification_code: ''
    };
  }

  componentDidMount(){
    console.log(this.props.registration.username)
    const state = {
      route:this.props.navigation.state.routeName,
      date:Date.now()
    }
    AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state))

  }

  onPressButton = () => {
    this.setState({isPressed:true})
    if(this.props.resetpassword.username ){
      this.props.addResetcode(this.props.resetpassword.verification_code)
      this.props.validateResetCode({
        username:this.props.resetpassword.username,
        verification_code:this.state.verification_code
      })
    }else if(this.props.registration.username){
      this.props.addRegistrationcode(this.props.registration.verification_code)
      this.props.validateRegistrationCode({
        username:this.props.registration.username,
        verification_code:this.state.verification_code
      })
    }else if(this.props.username){
      this.props.addResetcode(this.props.registration.verification_code)
      this.props.validateResetCode({
        username:this.props.username,
        verification_code:this.state.verification_code
      })
    }else{
      this.goLandingBack()
    }
  };


  async goLandingBack(){
    const userToken = await AsyncStorage.getItem('userToken');
    if(userToken){
      this.props.navigation.push('Home')
    }else{
      const state = {
        route:'Landing',
        date:Date.now()
      }
      AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state))
      NavigatorService.goBack()

    }
  }


  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <LogoHeaderBack
            onPress={() => {
              this.goLandingBack();
            }}
          />
        <Text style={styles.title}>
          Enter the verification code we sent to:   {this.props.registration.username ? this.props.registration.username : this.props.resetpassword.username}
        </Text>
          <CodeErrors isPressed={this.state.isPressed} apiErrors={this.props.common.error}/>
          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="YOUR 8 DIGIT CODE"
                onChangeText={text => this.setState({verification_code: text})}
                value={this.state.verification_code}
              />
            </View>
          </View>

          <ContinueButton onPress={() => { this.onPressButton() }} />
        </ScrollView>
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
    validateRegistrationCode:verification_code => dispatch(validateRegistrationCode(verification_code)),
    validateResetCode:verification_code => dispatch(validateResetCode(verification_code)),
    addResetcode: verification_code => dispatch({ type: 'ADD_RESET_CODE', verification_code }),
    addRegistrationcode: verification_code => dispatch({ type: 'ADD_REGISTRATION_CODE', verification_code })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeValidationScreen);
