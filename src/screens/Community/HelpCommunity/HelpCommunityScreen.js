import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView ,Alert} from 'react-native';
import { connect } from 'react-redux';
import LogoHeader from '../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import {leaveCommunity, deleteCommunity} from '../../../redux/actions/Community'
import LoadingController from '../../../components/loading/LoadingController'

import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";

class HelpCommunityScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invite: false,
      leave: false,
      delete:false
    };
  }



  action = () =>
    Alert.alert(
      translate("COMMUNITY_LEAVE_TITLE"),
      translate("COMMUNITY_LEAVE_WARNING"),
      [{
          text: translate("COMMUNITY_LEAVE_CANCEL"),
          style: "cancel"
        },
        { text: translate("COMMUNITY_LEAVE_CONFIRM"), onPress: async () => {
          this.state.leave
          ? this.props.leaveCommunity(this.props.masternodes[0].id_masternode)
          : this.props.deleteCommunity(this.props.masternodes[0].id_masternode)
        }}
      ],
      { cancelable: false }
    );




  onPressButton = () => {
    if (this.state.invite) {
      NavigatorService.navigate('InviteCommunity');
    }
    if (this.state.delete) {
      this.action()
    }
    if(this.state.leave){
      this.action()
    }
  };


  selectInvite(){
    this.setState(prevState => ({ invite: !prevState.invite}))
    this.setState({
      leave: false,
      delete:false
    })
  }

  selectDelete(){
    this.setState(prevState => ({ delete: !prevState.delete}))
    this.setState({
      leave: false,
      invite: false
    })
  }

  selectLeave(){
    this.setState(prevState => ({ leave: !prevState.leave}))
    this.setState({
      invite: false,
      delete:false
    })
  }



  render() {
    const error = this.props.common.error
    const masternodes = this.props.masternodes

    return (
      <ScrollView style={styles.container}>
        <LogoHeader
          onPress={() => {
            NavigatorService.goBack();
          }}
        />

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>{translate("COMMUNITY_HELP_TITLE")}</Text>
          <Text style={styles.secText}></Text>
        </View>

        <TouchableHighlight
          style={styles.helpContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.selectInvite()}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.helpText}> {translate("COMMUNITY_HELP_SENDINVITATION")}</Text>
            <Image
              style={styles.icon}
              source={
                this.state.invite
                  ? require('../../../../assets/icons/fullCircle.png')
                  : require('../../../../assets/icons/emptyCircle.png')
              }
            />
          </View>
        </TouchableHighlight>

        {masternodes[0] && masternodes[0].isowner == 1
          ?
          <TouchableHighlight
            style={styles.helpContainer}
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => this.selectDelete()}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.helpText}>{translate("COMMUNITY_HELP_DELETE")}</Text>
              <Image
                style={styles.icon}
                source={
                  this.state.delete
                    ? require('../../../../assets/icons/fullCircle.png')
                    : require('../../../../assets/icons/emptyCircle.png')
                }
              />
            </View>
          </TouchableHighlight>
          :
          <TouchableHighlight
            style={styles.helpContainer}
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => this.selectLeave()}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.helpText}>{translate("COMMUNITY_HELP_LEAVE")}</Text>
              <Image
                style={styles.icon}
                source={
                  this.state.leave
                    ? require('../../../../assets/icons/fullCircle.png')
                    : require('../../../../assets/icons/emptyCircle.png')
                }
              />
            </View>
          </TouchableHighlight>

        }

        <ContinueButton onPress={() => { this.onPressButton() }} />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    masternodes: state.masternodes.masternodes,
    common:state.common
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    deleteCommunity: id_masternode => dispatch(deleteCommunity(id_masternode)),
    leaveCommunity: id_masternode => dispatch(leaveCommunity(id_masternode))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpCommunityScreen);
