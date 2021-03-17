import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import LogoHeader from '../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import axios from 'axios'
import {generateMasterNodeKey} from "../../../redux/actions/AppairingSensor";

import LoadingController from '../../../components/loading/LoadingController'
import ModalController from '../../../components/modal/ModalController';


import { setApi_key, setDevice_id, setSyncword  } from '../../../redux/actions/AppairingSensor';
import AsyncStorage from '@react-native-community/async-storage';

function removeDuplicates(json) {
            const jsonObject = json.map(JSON.stringify);
            const uniqueSet = new Set(jsonObject);
            const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
            return uniqueArray
        }


function AppairingErrors(props) {
  const error = props.error;
  if (error ) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          {error}
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


class NodeAppairingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: '',
      deviceConnected:false,
      loading:false,
      error:null
    };
  }




  onPressButton = async (event) => {
    //this.animation.play();
    this.setState({loading:true})
    if (this.state.loading) {
        return;
    }
    var apiKey = await AsyncStorage.getItem('masternodeKey');
    console.log(apiKey)
    if(apiKey){
      try{
        await setDevice_idn(this.props.current_sensornode.device_id)
        await setApi_key(apiKey)
        await setSyncword(this.props.current_sensornode.syncword)

        const sensornodes_waitinSig = await AsyncStorage.getItem('sensornodes_waitinSig');
        if(!sensornodes_waitinSig){
          AsyncStorage.setItem('sensornodes_waitinSig',JSON.stringify(this.props.current_sensornode));
        }else{
          const newSensornodes_waitingSig = JSON.parse(sensornodes_waitinSig).concat(this.props.current_sensornode)
          AsyncStorage.setItem('sensornodes_waitinSig',removeDuplicates(newSensornodes_waitingSig));
        }

        this.setState({loading:false})
        const successObject = {
          mainMessage:"Sensornode successfully appaired",
          secMessage:"Push the main button of the node, the sensor will be available in minutes"
        }
        this.props.navigation.navigate('Success',{ successObject });

      }catch(error){
              this.props.showModal("we couldn't send some information to the device, check the connection")
        this.setState({
          loading:false
          //error:"we couldn't send some information to the device, check the connection"
        })
      }

    }else{
      this.setState({loading:false})
      this.props.showModal("make sure to be connected to your 4G")
    }
    //this.props.addApiKey(this.state.deviceId);
  };



  render() {
    return (
      <ScrollView style={styles.container}>
        <LogoHeader
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
        />
        <View style={styles.iconContainer}>
          <Text style={styles.boldText}>Appairing</Text>

          <Text style={styles.normalText}>
            Press the main button of the sensor and connect you to the hotspot created (yourApp)
            then click on continue
          </Text>
          <Image style={styles.icon} source={require('../../../../assets/icons/fingerprint.png')} />

        </View>
        <AppairingErrors error={this.state.error}/>


        {this.state.loading
          ?
            <LoadingController/>
          :
           <ContinueButton
            onPress={() => {
              this.onPressButton();
            }}
        />}
        <ModalController />

      </ScrollView>
    );
  }
}




function mapStateToProps(state) {
  return {
    current_sensornode:state.sensor.current_sensornode,
    appairing : state.appairing,
    common : state.common
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: message => dispatch({ type: 'SHOW_MODAL', message})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeAppairingScreen);
