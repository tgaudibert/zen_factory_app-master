import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import LogoHeader from '../../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import axios from 'axios'
import {generateMasterNodeKey} from "../../../../redux/actions/Appairing";

import LoadingController from '../../../../components/loading/LoadingController'
import NavigatorService from '../../../../util/navigator'
import AsyncStorage from '@react-native-community/async-storage';

import { translate } from "../../../../../App";

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


class MasternodeAppairingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: '',
      deviceConnected:false,
      loading:false,
      error:''
    };
  }


  async componentDidMount(){
    if(!this.props.masternodes[0]){
      NavigatorService.navigate('Home')
    }else{
      this.props.generateMasterNodeKey(this.props.masternodes[0].id_masternode)
    }
  }


  setValid = (response) => {
    console.log(response.data)

  }

  setInvalid = (error) => {
    console.log(error)
    NavigatorService.navigate('WifiName');
  }

  onPressButton = async (event) => {
    if (this.state.loading) {
        return;
    }
    console.log(this.props.appairing)
    var apiKey = await AsyncStorage.getItem('masternodeKey');
    console.log(apiKey)
    if(apiKey){
      NavigatorService.navigate("MasternodeWifiParams")

    }else{
      this.setState({loading:false, error: "we couldn't send some information to the device, check the connection"})
    }
  };



  render() {
    return (
      <ScrollView style={styles.container}>
        <LogoHeader
          onPress={() => {
            this.props.navigation.push('Home');
          }}
        />

        <View style={styles.iconContainer}>
          <Text style={styles.boldText}>{translate("MASTERNODE_APPAIRING_TITLE")}</Text>

          <Text style={styles.normalText}>
            {translate("MASTERNODE_APPAIRING_SUBTITLE")}
          </Text>
          <Image style={styles.icon} source={require('../../../../../assets/icons/fingerprint.png')} />

        </View>
        <MasternodeAppairingErrors error={this.state.error} />

        <ContinueButton
           onPress={() => {
             this.onPressButton();
           }}
       />

      </ScrollView>
    );
  }
}




function mapStateToProps(state) {
  return {
    appairing : state.appairing,
    common : state.common,
    masternodes:state.masternodes.masternodes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    generateMasterNodeKey: id_masternode => dispatch(generateMasterNodeKey(id_masternode)),
    addApiKey: api_key => dispatch({ type: 'ADD_API_KEY', api_key: api_key })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasternodeAppairingScreen);
