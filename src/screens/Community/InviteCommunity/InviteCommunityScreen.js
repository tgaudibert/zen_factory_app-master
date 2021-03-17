import React from 'react';
import { KeyboardAvoidingView , Platform,Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Image ,Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import LoadingController from '../../../components/loading/LoadingController';
import {sendInvitationCommunity} from "../../../redux/actions/Community";
import { translate } from "../../../../App";

function EmailErrors(props) {
  const {viewErrors,isPressed,apiErrors} = props;
  if (viewErrors && isPressed) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          {translate("COMMUNITY_INVITE_WARNING")}
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


class InviteCommunityScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isValid:false,
      isPressed:false
    };
  }


  onPressButton = () => {
    console.log(this.props.masternodes)
    this.setState({isPressed:true})
    const meta = {
      id_masternode:this.props.masternodes[0].id_masternode,
      email:this.state.email,
      action_type:'invite'
    }
    if(this.state.isValid){
      this.props.sendInvitationCommunity(meta)
    }else{
      console.log("invalid Email")
    }
  };


  updateUsername(input){
    this.setState({email:input})
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(this.state.email.toLowerCase()) == 0){
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
        keyboardVerticalOffset={80}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView >
          <LogoHeader
            onPress={() => {
              NavigatorService.goBack();
            }}
          />

          <Text style={styles.title}>{translate("COMMUNITY_INVITE_TITLE")}</Text>
          <EmailErrors viewErrors={!this.state.isValid} isPressed={this.state.isPressed} apiErrors={this.props.common.error}/>

          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <Image style={styles.icon} source={require('../../../../assets/icons/email.png')} />
              <TextInput
                style={styles.input}
                placeholder={translate("COMMUNITY_INVITE_ENTRY")}
                onChangeText={text => this.updateUsername(text)}
                value={this.state.email}
              />
            </View>
            <View style={styles.rowContainer}>
              <View style={this.state.isValid ?  styles.fullBox : styles.emptyBox} />
              <Text style={styles.conditionText}>{translate("COMMUNITY_INVITE_VALID")}</Text>
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
    masternodes:state.masternodes.masternodes,
    common:state.common
  };
}


function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    sendInvitationCommunity:meta =>dispatch(sendInvitationCommunity(meta))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteCommunityScreen);
