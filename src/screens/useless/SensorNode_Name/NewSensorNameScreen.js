import React from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';

import LoadingController from '../../../components/loading/LoadingController'
import ModalController from '../../../components/modal/ModalController';
import {updateSensorNode} from '../../../redux/actions/SensorNodes'

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }


class NewSensorNameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensornode_name: '',
      loading:false
    };
  }

  componentDidMount(){
    console.log(this.props.current_sensornode)
    console.log(this.props.updating_sensornode)
  }

  checkCharacters() {
    if (this.state.sensornode_name.length < 3) return 1;
    return 0;
  }


  onPressButton = async () => {

    this.props.newSensornode_name(this.state.sensornode_name);
    this.props.navigation.navigate('NewSensorProduct');

  };


  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <LogoHeader
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
          />
          <Text style={styles.title}>Let's set new sensor name</Text>
          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter sensor Name"
                onChangeText={text => this.setState({ sensornode_name: text })}
                value={this.state.sensornode_name}
              />
            </View>

            <View style={styles.rowContainer}>
              <View style={this.checkCharacters() ? styles.emptyBox : styles.fullBox} />
              <Text style={styles.conditionText}>3+ characters</Text>
            </View>

          </View>
          {this.state.loading
            ?
              <LoadingController/>
            :
             <ContinueButton
              onPress={() => {
                this.onPressButton();
              }}
          />}
        </ScrollView>
      </TouchableWithoutFeedback>
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
    newSensornode_name: sensornode_name => dispatch({ type: 'NEW_SENSORNODE_NAME', sensornode_name })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSensorNameScreen);
