import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import LogoHeader from '../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import {resetPassword} from "../../../redux/actions/ResetPassword";

import NavigatorService from '../../../util/navigator'
import LoadingController from '../../../components/loading/LoadingController'
import { translate } from "../../../../App";

class AccountHelpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateAccount_name: false,
      updateAccount_password: false,
      updateAccount_pic:false
    };
  }

  onPressButton = () => {
    var arr = [];
    if (this.state.updateAccount_name) {
      NavigatorService.navigate('UpdateAccountName');
    }
    if (this.state.updateAccount_password) {
      this.props.resetPassword(this.props.username)
      //this.props.navigation.navigate('UpdateAccountPassword');
    }
    if (this.state.updateAccount_pic) {
      NavigatorService.navigate('AccountPicture');
    }
    //this.props.addUserHelp(arr);
  };


  selectUpdateName(){
    this.setState(prevState => ({ updateAccount_name: !prevState.updateAccount_name}))
    this.setState({
      updateAccount_password: false,
      updateAccount_pic: false
    })
  }

  selectUpdateProfilePic(){
    this.setState(prevState => ({ updateAccount_pic: !prevState.updateAccount_pic}))
    this.setState({
      updateAccount_password: false,
      updateAccount_name: false
    })
  }

  selectUpdatePassword(){
    this.setState(prevState => ({ updateAccount_password: !prevState.updateAccount_password}))
    this.setState({
      updateAccount_name: false,
      updateAccount_pic: false
    })
  }

  navigateBack(){
    NavigatorService.navigate('Home');
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <LogoHeader
          onPress={() => {
            this.navigateBack();
          }}
        />

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>{translate("ACCOUNT_HELP_TITLE")}</Text>
          <Text style={styles.secText}></Text>
        </View>
        <TouchableHighlight
          style={styles.helpContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.selectUpdateName()}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.helpText}>{translate("ACCOUNT_HELP_UPDATENAME")}</Text>
            <Image
              style={styles.icon}
              source={
                this.state.updateAccount_name
                  ? require('../../../../assets/icons/fullCircle.png')
                  : require('../../../../assets/icons/emptyCircle.png')
              }
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.helpContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.selectUpdatePassword()}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.helpText}>{translate("ACCOUNT_HELP_UPATEPASSWORD")}</Text>
            <Image
              style={styles.icon}
              source={
                this.state.updateAccount_password
                  ? require('../../../../assets/icons/fullCircle.png')
                  : require('../../../../assets/icons/emptyCircle.png')
              }
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.helpContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.selectUpdateProfilePic()}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.helpText}>{translate("ACCOUNT_HELP_UPDATEPROFILEPIC")}</Text>
            <Image
              style={styles.icon}
              source={
                this.state.updateAccount_pic
                  ? require('../../../../assets/icons/fullCircle.png')
                  : require('../../../../assets/icons/emptyCircle.png')
              }
            />
          </View>
        </TouchableHighlight>

        {this.props.common.loading
          ?
            <LoadingController/>
          :
           <ContinueButton
            onPress={() => {
              this.onPressButton();
            }}
        />}
      </ScrollView>
    );
  }
}


function mapStateToProps(state) {
  return {
    current_sensornode:state.sensor.current_sensornode,
    common:state.common,
    username: state.user.username
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPassword:username => dispatch(resetPassword(username)),
    addUserHelp: help => dispatch({ type: 'ADD_USERHELP', help })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountHelpScreen);
