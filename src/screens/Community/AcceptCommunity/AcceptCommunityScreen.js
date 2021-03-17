import React, {useState} from 'react';
import { View, TextInput, TouchableWithoutFeedback, Keyboard, Image,ScrollView,SafeAreaView, Text ,Alert} from 'react-native';
import { connect } from 'react-redux';
import {acceptInvitationCommunity} from "../../../redux/actions/Community";
import LogoHeader from '../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import LoadingController from '../../../components/loading/LoadingController';
import styles from './styles';
import Code from './CodeComponent'
import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";

function CodeErrors(props) {
  const {isPressed,apiErrors} = props;
  return(
    <View style={ styles.greenContainer } >
      <Text style={ styles.greenText} >

      </Text>
    </View>
  )
}

class AcceptCommunityScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verification_code: ''

    };
  }


  render() {
    const error = this.props.common.error
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <LogoHeader
            onPress={() => {
              NavigatorService.goBack();
            }}
          />
          <Text style={styles.title}>{translate("COMMUNITY_JOIN_TITLE")}</Text>

            <CodeErrors isPressed={this.state.isPressed} apiErrors={this.props.common.error}/>
            <Code data={this.props}/>
            <ContinueButton onPress={() => { this.onPressButton() }} />

          </SafeAreaView>
        </TouchableWithoutFeedback>
    );

  }
}


function mapStateToProps(state) {
  return {
    common:state.common,
    username: state.user.username
  };
}


function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    acceptInvitationCommunity:data => dispatch(acceptInvitationCommunity(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptCommunityScreen);
