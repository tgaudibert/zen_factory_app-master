import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView , Platform,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import LogoHeader from '../../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import axios from 'axios'
import LottieView from 'lottie-react-native';

import LoadingController from '../../../../components/loading/LoadingController'

import NavigatorService from '../../../../util/navigator'
import AsyncStorage from '@react-native-community/async-storage';
import {setApi_domain, setApi_key, setWifi_ssid, setWifi_pass, setSyncword  } from '../../../../redux/actions/Appairing';

import { translate } from "../../../../../App";

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function MasternodeAppairingErrors(props) {
  const error = props.error;
  if (error && !error.response) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          {translate("MASTERNODE_APPAIRING_ERROR")}
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


class MasternodeWifiParamsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wifi_ssid: '',
      wifi_pass:'',
      loading:false,
      error:''
    };
  }

  async componentDidMount(){
    this.setState({
      wifi_ssid:this.props.appairing.wifi_ssid,
      wifi_pass:this.props.appairing.wifi_pass,
    })

    if(!this.props.masternodes[0]){
      NavigatorService.navigate('Home')
    }

  }


  setValid = (response) => {
    NavigatorService.navigate('MasternodeAppairing');
  }

  setInvalid = (error) => {
    console.log(error)
  }

  onPressButton = async(event) => {

    this.props.addWifipass(this.state.wifi_pass)
    this.props.addWifissid(this.state.wifi_ssid)
    this.setState({loading:true})
    if (this.state.loading) {
        return;
    }
    var apiKey = await AsyncStorage.getItem('masternodeKey');
    console.log(apiKey)
    if(apiKey){
      try{
        await sleep(2000)
        await setApi_domain("")
        await setApi_key(apiKey)
        //await setWifi_pass(this.state.wifi_pass)
        //await setWifi_ssid(this.state.wifi_ssid)
        if(!this.props.masternodes[0]){
          NavigatorService.navigate('Home')
        }
        AsyncStorage.setItem('waitingMasternode', this.props.masternodes[0].id_masternode);
        this.setState({loading:false})
        this.props.showSuccess({
          subject:translate('MASTERNODE_APPAIRING_SUCCESS'),
          message:""
        })
        NavigatorService.navigate('Success');

      }catch(error){
        this.setState({loading:false, error: "we couldn't send some information to the device, check the connection"})
      }

    }else{
      this.setState({loading:false, error: "we couldn't send some information to the device, check the connection"})
    }

    //this.props.addApiKey(this.state.deviceId);
  };

  render() {
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <LogoHeader
            onPress={() => {
              this.props.navigation.push('MasternodeAppairing');
            }}
          />
          <View style={styles.mainContainer}>
            <Text style={styles.boldText}>{translate("MASTERNODE_WIFIPARAMS_TITLE")}</Text>

            <Text style={styles.normalText}>
              {translate("MASTERNODE_WIFIPARAMS_SUBTITLE")}
            </Text>

            <View style={styles.inputContainer}>
              <Image style={styles.icon} source={require('../../../../../assets/icons/email.png')} />
              <TextInput
                style={styles.input}
                placeholder={translate("MASTERNODE_WIFIPARAMS_SSID")}
                onChangeText={text => this.setState({ wifi_ssid: text })}
                value={this.state.wifi_ssid}
              />
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.icon} source={require('../../../../../assets/icons/password.png')} />
              <TextInput
                style={styles.input}
                placeholder={translate("MASTERNODE_WIFIPARAMS_PASSWORD")}
                onChangeText={text => this.setState({ wifi_pass: text })}
                value={this.state.wifi_pass}
              />
            </View>
          </View>
          <MasternodeAppairingErrors error={this.state.error} />


          {this.state.loading
            ? <LoadingController/>
            :
             <ContinueButton
              onPress={() => {
                this.onPressButton();
              }}
          />}
        </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    appairing : state.appairing,
    common : state.common,
    masternodes: state.masternodes.masternodes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showSuccess: successObject => dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject }),
    addWifipass: wifi_pass => dispatch({ type: 'ADD_WIFI_PASS', wifi_pass: wifi_pass }),
    addWifissid: wifi_ssid => dispatch({ type: 'ADD_WIFI_SSID', wifi_ssid: wifi_ssid })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasternodeWifiParamsScreen);
