import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux';
import MenuButton from '../../components/MenuButton/MenuButton';
import {userSignOut} from '../../redux/actions/Auth'
import LoadingController from '../../components/loading/LoadingController'
//import ModalController from '../../components/Modal/ModalController'
import NavigatorService from '../../util/navigator'
import {DeviceEventEmitter,  AppState ,Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import {getCommunity} from "../../redux/actions/Community";
import {getUser} from "../../redux/actions/Profile";
import {getMasterNodes} from "../../redux/actions/MasterNodes";
import {getSensorNodes, getWaitingSensorNodes} from "../../redux/actions/SensorNodes";

import { translate } from "../../../App";

var appState = 'active'
var reloadCentralInformations = ''
var reloadCommunityInformations = ''
var reloadSensorNodeInformations = ''


class DrawerContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      appState: ''
    };
  }


  async componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    reloadCentralInformations = DeviceEventEmitter.addListener('reloadCentralInformations', async (r)=>{
      console.log('reloading app')
      this.props.fetchStart()
      const idWaitingMasternode = await AsyncStorage.getItem('waitingMasternode');
      if(idWaitingMasternode ){
        this.setState({idWaitingMasternode:idWaitingMasternode})
      }

      const userToken = await AsyncStorage.getItem('userToken');
      if(!userToken){
        this.props.navigation.push('Landing');
      }

      const user = await AsyncStorage.getItem('user');
      if(user){
        this.props.dispatchUser(JSON.parse(user))
      }

      const masternodes = await AsyncStorage.getItem('masternodes');
      if(masternodes){
        this.props.dispatchMasternodes(JSON.parse(masternodes))
      }

      const sensornodes = await AsyncStorage.getItem('sensornodes');
      if(sensornodes){
        this.props.dispatchSensornodes(JSON.parse(sensornodes))
      }

      const sensornodes_waiting = await AsyncStorage.getItem('sensornodes_waiting');
      if(sensornodes_waiting){
        this.props.dispatchWaitingSensornodes(JSON.parse(sensornodes_waiting))
      }

      const community = await AsyncStorage.getItem('community');
      if(sensornodes_waiting){
        this.props.dispatchCommunity(JSON.parse(community))
      }


      this.props.getUser('')
      this.props.getMasterNodes('')
    })


    reloadSensorNodeInformations = DeviceEventEmitter.addListener('reloadSensorNodeInformations', async (r)=>{
      console.log('reloadSensorNodeInformations called')
      if(this.props.masternodes[0]){
        console.log('reloading sensornodeInformations')
        this.props.getSensorNodes({id_masternode: this.props.masternodes[0].id_masternode})
        this.props.getWaitingSensorNodes({id_masternode: this.props.masternodes[0].id_masternode})
      }else{
        this.props.hideLoading()
      }
    })


    reloadCommunityInformations = DeviceEventEmitter.addListener('reloadCommunityInformations', async (r)=>{
      console.log('reloadCommunityInformations called')
      if(this.props.masternodes[0]){
        console.log('reloading CommunityInformations')
        this.props.getCommunity(this.props.masternodes[0].id_masternode)
      }else{
        this.props.hideLoading()
      }
    })

  }


  _hideModal(){
    console.log("touched")
    this.props.hideMessage("")
    this.setState({
      modalVisible: false,
    })
  }



  handleAppStateChange(nextAppState) {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('active')
    }
    if ( appState === 'active' &&  nextAppState.match(/inactive|background/) ) {
      console.log('inactive')
      //REMOVE it in prod
      //reloadCentralInformations.remove();
      //reloadSensorNodeInformations.remove();
      //reloadCommunityInformations.remove();
    }
    appState = nextAppState
  }



  componentWillUnmount() {
    console.log('removed listener')
    AppState.removeEventListener('change', this.handleAppStateChange);
    reloadCentralInformations.remove();
    reloadSensorNodeInformations.remove();
    reloadCommunityInformations.remove();
  }


  render() {
    const { navigation } = this.props;

    if(this.props.common.loading || this.props.common.is_error){
      return(<LoadingController/>)
    }

    return (
      <View style={styles.content}>

        <View style={styles.container}>
          <View style={styles.photoContainer}>
            <View style={styles.greenDot}></View>
            {this.props.profilepic_url
              ? <Image style={styles.userPhoto} source={{ uri: this.props.profilepic_url }} />
              : <View style={styles.greenDot}></View>
            }
          </View>
          <MenuButton
            title={translate('DRAWER_HOME')}
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              NavigatorService.navigate('Home');
              navigation.closeDrawer();
            }}
          />

          <MenuButton
            title={translate('DRAWER_SETTINGS')}
            source={require('../../../assets/icons/settings.png')}
            onPress={() => {
              NavigatorService.navigate('Settings');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title={translate('DRAWER_COMMUNITY')}
            source={require('../../../assets/icons/notifications.png')}
            onPress={() => {
              NavigatorService.navigate('Community');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title={translate('DRAWER_ACCOUNT')}
            source={require('../../../assets/icons/notifications.png')}
            onPress={() => {
              NavigatorService.navigate('AccountHelp');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title={translate('DRAWER_LOGOUT')}
            source={require('../../../assets/icons/logout.png')}
            onPress={() => {
              this.props.userSignOut()
              navigation.closeDrawer();
            }}
          />
        </View>
      </View>
    );

  }
}

DrawerContainer.propTypes = {
    navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};


function mapStateToProps(state) {
  return {
    profilepic_url: state.user.profilepic_url,
    common : state.common,
    masternodes: state.masternodes.masternodes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userSignOut: user => dispatch(userSignOut()),
    getUser:token => dispatch(getUser(token)),
    getMasterNodes:token => dispatch(getMasterNodes(token)),
    getSensorNodes: id_masternode => dispatch(getSensorNodes(id_masternode)),
    getWaitingSensorNodes: id_masternode => dispatch(getWaitingSensorNodes(id_masternode)),
    getCommunity :id_masternode=> dispatch(getCommunity(id_masternode)),

    hideLoading: data => dispatch({type: 'HIDE_MESSAGE'}),
    fetchStart: data => dispatch({type: 'FETCH_START'}),
    dispatchMasternodes:data => dispatch({type: 'MASTER_NODE_LIST', payload: data }),
    dispatchSensornodes:data => dispatch({type: 'SENSOR_NODES_LIST', payload: data }),
    dispatchWaitingSensornodes:data => dispatch({type: 'SENSOR_NODES_WAITING', payload: data }),
    dispatchUser:data => dispatch({type: 'USER_DATA', payload: data }),
    dispatchCommunity:data => dispatch({type: 'UPDATE_COMMUNITY', payload: data}),
    hideError:data => dispatch({type:'HIDE_MESSAGE'})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerContainer);
