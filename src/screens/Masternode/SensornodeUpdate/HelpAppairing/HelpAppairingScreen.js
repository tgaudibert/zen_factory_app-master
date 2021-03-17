import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView ,Alert} from 'react-native';
import { connect } from 'react-redux';
import LogoHeader from '../../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../../components/ContinueButton/ContinueButton';
import styles from './styles';

import {deleteSensorNode} from '../../../../redux/actions/SensorNodes'
import NavigatorService from '../../../../util/navigator'

import { translate } from "../../../../../App";

class HelpAppairingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retryAppairing: false,
      delete: false
    };
  }


  async componentDidMount(){
    if(!this.props.current_sensornode){
      NavigatorService.navigate('Home')
    }
  }


  deleteDevice = () =>
    Alert.alert(
      translate("SENSORNODE_DELETE_TITLE"),
      translate("SENSORNODE_DELETE_WARNING"),
      [{
          text: translate("SENSORNODE_DELETE_CANCEL"),
          style: "cancel"
        },
        { text: translate("SENSORNODE_DELETE_CONFIRM"), onPress: async () => {
          this.props.deleteSensorNode(this.props.current_sensornode.id_sensornode)

        }}
      ],
      { cancelable: false }
    );


  onPressButton = () => {
    if (this.state.retryAppairing) {
      NavigatorService.navigate('UpdateSensornodeName');
    }
    if (this.state.delete) {
      this.deleteDevice()
    }
  };


  selectAppairing(){
    this.setState(prevState => ({ retryAppairing: !prevState.retryAppairing}))
    this.setState({
      delete: false
    })
  }

  selectDelete(){
    this.setState(prevState => ({ delete: !prevState.delete}))
    this.setState({
      retryAppairing: false
    })
  }



  navigateBack(){
    NavigatorService.navigate('PendingDevices');
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
          <Text style={styles.mainText}>{translate("SENSORNODE_HELP_TITLE")}</Text>

        </View>
        <TouchableHighlight
          style={styles.helpContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.selectAppairing()}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.helpText}>{translate("SENSORNODE_HELP_FIRSTAPPAIRING")}</Text>
            <Image
              style={styles.icon}
              source={
                this.state.retryAppairing
                  ? require('../../../../../assets/icons/fullCircle.png')
                  : require('../../../../../assets/icons/emptyCircle.png')
              }
            />
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.helpContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.selectDelete()}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.helpText}>{translate("SENSORNODE_HELP_DELETERDEVICE")}</Text>
            <Image
              style={styles.icon}
              source={
                this.state.delete
                  ? require('../../../../../assets/icons/fullCircle.png')
                  : require('../../../../../assets/icons/emptyCircle.png')
              }
            />
          </View>
        </TouchableHighlight>
        <ContinueButton onPress={() => { this.onPressButton() }}/>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_sensornode:state.sensor.current_sensornode,
    common:state.common
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSensorNode: id_sensornode => dispatch(deleteSensorNode(id_sensornode)),
    addUserHelp: help => dispatch({ type: 'ADD_USERHELP', help })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpAppairingScreen);
