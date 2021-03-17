import React from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';

import {createSensorNode} from '../../../redux/actions/SensorNodes'

import LoadingController from '../../../components/loading/LoadingController'


function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function NewSensorNodeErrors(props) {
  const error = props.error;
  if (error && error.response) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          { (error.response.status == 400 || error.response.status ==401) ? "We could not create new Sensor" :  "An error happenned"}
        </Text>
      </View>
    )
  }
  if (error && !error.response) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          network error - check your connection
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


String.random = function (length) {
	let radom13chars = function () {
		return Math.random().toString(16).substring(2, 15)
	}
	let loops = Math.ceil(length / 13)
	return new Array(loops).fill(radom13chars).reduce((string, func) => {
		return string + func()
	}, '').substring(0, length)
}


class NewSensorProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensornode_product: '',
      loading:false
    };
  }


  componentDidMount(){
    console.log(this.props.updating_sensornode)
  }


  checkCharacters() {
    if (this.state.sensornode_product.length < 2) return 1;
    return 0;
  }


  onPressButton = async () => {
    this.setState({loading:true})
    const successObject = {
      mainMessage:"Sensor successfully created",
      secMessage:"You can now appair it to the sensor in the pending device menu"
    }
    this.props.updateSensornode_name(this.state.sensornode_name);

    const sendingData = {
      sensornode_name : this.state.sensornode_name,
      sensornode_product : this.props.updating_sensornode.sensornode_product,
      isactive : 1,
      id_sensornode : this.props.updating_sensornode.id_sensornode
    }
    //ONLY UPDATE IF the sensor alreadu exists
    this.props.updateSensorNode(sendingData)
    console.log(this.props.updating_sensornode)
    await sleep(2000)
    if(this.props.common.message){
      this.props.navigation.navigate('Success',{ successObject });
    }else{
      this.props.showModal("Oops,a problem happenned")
    }
    this.setState({loading:false})
    //this.props.navigation.navigate('Success',{ successObject });
  };



  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <LogoHeader
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Text style={styles.title}>Let's set new sensor content</Text>
          <NewSensorNodeErrors error={this.props.common.error} />
          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter sensor Content"
                onChangeText={text => this.setState({ sensornode_product: text })}
                value={this.state.sensornode_product}
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
    common:state.common,
    masternodes:state.masternodes.masternodes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSensorNode: sensornode => dispatch(createSensorNode(sensornode)),
    newSensornode_product: sensornode_product => dispatch({ type: 'NEW_SENSORNODE_PRODUCT', sensornode_product }),
    newSensornode_idDevice: id_device =>dispatch({type:'NEW_SENSORNODE_ID', id_device})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSensorProductScreen);
