import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import LogoHeader from '../../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import {deleteSensorNode} from '../../../../redux/actions/SensorNodes'

import LoadingController from '../../../../components/loading/LoadingController'
import NavigatorService from '../../../../util/navigator'

import { translate } from "../../../../../App";

class SensornodeHelpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateSensornode_name: false,
      updateSensornode_product: false,
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
          }
      }],{ cancelable: false }
    );

  onPressButton = () => {
    if (this.state.updateSensornode_name) {
      NavigatorService.navigate('UpdateSensornodeName');
    }
    if (this.state.updateSensornode_product) {
      NavigatorService.navigate('UpdateSensornodeProduct');
    }
    if (this.state.delete) {
      this.deleteDevice();
    }
  };


  selectName(){
    this.setState(prevState => ({ updateSensornode_name: !prevState.updateSensornode_name}))
    this.setState({
      updateSensornode_product: false,
      delete: false
    })
  }

  selectDelete(){
    this.setState(prevState => ({ delete: !prevState.delete}))
    this.setState({
      updateSensornode_product: false,
      updateSensornode_name: false
    })
  }

  selectProduct(){
    this.setState(prevState => ({ updateSensornode_product: !prevState.updateSensornode_product}))
    this.setState({
      updateSensornode_name: false,
      delete: false
    })
  }


  navigateBack(){
    NavigatorService.navigate('SensornodeState');
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
          onPress={() => this.selectName()}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.helpText}>{translate("SENSORNODE_HELP_UPDATENAME")}</Text>
            <Image
              style={styles.icon}
              source={
                this.state.updateSensornode_name
                  ? require('../../../../../assets/icons/fullCircle.png')
                  : require('../../../../../assets/icons/emptyCircle.png')
              }
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.helpContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.selectProduct()}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.helpText}>{translate("SENSORNODE_HELP_CONTENT")}</Text>
            <Image
              style={styles.icon}
              source={
                this.state.updateSensornode_product
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
            <Text style={styles.helpText}>{translate("SENSORNODE_HELP_DELETE")}</Text>
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


        <ContinueButton onPress={() => { this.onPressButton() }} />
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
    deleteSensorNode: id_sensornode => dispatch(deleteSensorNode(id_sensornode))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SensornodeHelpScreen);
