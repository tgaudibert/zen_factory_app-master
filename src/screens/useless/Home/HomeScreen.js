import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, RefreshControl, FlatList, Alert } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import { connect } from 'react-redux';
import { homeStyle ,SECONDARY_COLOR, SECONDARY_COLOR_COMPLEMENTARY} from '../../AppStyles';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import {DeviceEventEmitter} from 'react-native'

import {getUser} from "../../redux/actions/Auth";
import {getMasterNodes} from "../../redux/actions/MasterNodes";
import {getSensorNodes, getWaitingSensorNodes} from "../../redux/actions/SensorNodes";




function NetworkErrors(props) {
  const error = props.error;
  if (error) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          { error.code == "ECONNABORTED" ? "you are disconnected" :  "you are disconnected"}
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



class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    //console.log(navigation.state)
    const { params = {} } = navigation.state;
    console.log(navigation.state)
    return {
      headerStyle: homeStyle.headerStyle,
      headerLeft: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: (
        <View style={styles.photoContainer}>
          <View style={styles.greenDot}></View>
          <Image style={styles.userPhoto} source={{ uri: params.profilepic_url }} />
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      sensorsList: [],
      refreshing:false,
      isLoading:false,
      userToken:"",
      idWaitingMasternode:""
    };
  }



    renderMasternodeList = ({ item }) => {
      console.log(item)
      return (
        <TouchableHighlight
          style={styles.infoContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.props.navigation.navigate('MasternodeAppairing')}
        >
          <View style={styles.rowContainer}>
            <Image
              style={styles.questionIcon}
              source={require('../../../assets/icons/device-pending.png')}
            />
            <View style={styles.columnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>gdeisufgseiug</Text>

                </View>
                <View
                  style={ styles.btnContainer}
                >
                  <Text
                    style={styles.btnText }
                  >
                    On
                  </Text>
                </View>
              </View>
              <View style={styles.bar}>
                <View
                  style={
                    {
                      height: 12,
                      width: 2,
                      backgroundColor: 'black',
                      position: 'absolute',
                      left:  100 + '%',
                      top: -4,
                      zIndex: 5
                    }}
                />
                <View style={styles.bar3}></View>
                <View style={styles.bar3}></View>
                <View style={styles.bar3}></View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      );
    };



  async componentDidMount() {
    this.setState({isLoading:true})

    DeviceEventEmitter.addListener('reloadAPP', async (r)=>{
      this.setState({isLoading:true})
      const state = {
        route:this.props.navigation.state.routeName,
        date:Date.now()
      }
      AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state))

      const userToken = await AsyncStorage.getItem('userToken');
      this.setState({userToken:userToken})
      if(!userToken){
        this.props.navigation.push('Landing');
      }
      this.props.getMasterNodes("")
      this.setState({isLoading:false})
    })



    const user = await AsyncStorage.getItem('user');
    if(user){
      this.props.dispatchUser(JSON.parse(user))
    }

    const masternodes = await AsyncStorage.getItem('masternodes');
    if(masternodes){
      this.props.dispatchMasternodes(JSON.parse(masternodes))
    }

    this.props.navigation.setParams({
      profilepic_url: this.props.profilepic_url
    });
    this.setState({isLoading:false})
  }




  //Function to work on
  _onRefresh = () => {
    this.props.fetchStart()
    this.props.hideError()
    this.setState({refreshing: true});
    this.props.getUser(this.state.userToken)
    this.props.getMasterNodes(this.state.userToken)
    this.setState({refreshing: false});
  }


  render() {

    const isLoading = this.props.common.loading
    const error = this.props.common.error
    const masternodes = this.props.masternodes
    //(masternodes.length == 0  && !isLoading) ||
    if(isLoading){
      return(
        <LottieView
            progress={this.state.progress}
            source={require('./loading4.json')}
          />
      )
    }
    else if((!masternodes) ||(masternodes.length == 0)){
      return(
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing}
              onRefresh={this._onRefresh} />
          }>


        </ScrollView>
      )
    }
    else if (masternodes[0] && masternodes[0].isactive == 0 ){
      return(
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing}
              onRefresh={this._onRefresh} />
          }>

            <View style={styles.headerContainer}>
              <Text style={styles.boldText}>Welcome, {this.props.name}</Text>
            </View>
            <View style={ styles.greenContainer } >
              <Text style={ styles.greenText} >
                { this.state.idWaitingMasternode == masternodes[0].id_masternode ? "Wait a minute for the sensor to connect to your account" : "You don't have any devices appaired" }
              </Text>
            </View>

            <TouchableHighlight
              style={styles.infoContainer}
              underlayColor="rgba(73,182,77,1,0.9)"
              onPress={() => this.props.navigation.navigate('MasternodeAppairing')}
            >
              <View style={styles.rowContainer}>
                <Image
                  style={styles.questionIcon}
                  source={require('../../../assets/icons/device-pending.png')}
                />
                <View style={styles.columnContainer}>
                  <View style={styles.rowContainer2}>
                    <View style={styles.textContainer}>
                      <Text style={styles.mainText}>{ this.state.idWaitingMasternode == masternodes[0].id_masternode ? "Modify appairing parameters" : "Start appairing process" }</Text>

                    </View>
                    <View
                      style={ styles.btnContainer}
                    >
                      <Text
                        style={styles.btnText }
                      >
                        On
                      </Text>
                    </View>
                  </View>
                  <View style={styles.bar}>
                    <View
                      style={
                        problemsContainer >= 1
                          ? {
                              height: 12,
                              width: 2,
                              backgroundColor: 'black',
                              position: 'absolute',
                              left:  100 + '%',
                              top: -4,
                              zIndex: 5
                            }
                          : {
                              height: 12,
                              width: 2,
                              backgroundColor: 'black',
                              position: 'absolute',
                              left: '100%',
                              top: -4,
                              zIndex: 5
                            }
                      }
                    />
                    <View style={styles.bar3}></View>
                    <View style={styles.bar3}></View>
                    <View style={styles.bar3}></View>
                  </View>
                </View>
              </View>
            </TouchableHighlight>

            <NetworkErrors error={error} />
              <TouchableHighlight
                style={styles.infoContainer}
                underlayColor="rgba(73,182,77,1,0.9)"
                onPress={() => this.props.navigation.navigate('MasternodeAppairing')}
              >
                <View style={styles.rowContainer}>
                  <Image
                    style={styles.questionIcon}
                    source={require('../../../assets/icons/device-pending.png')}
                  />
                  <View style={styles.columnContainer}>
                    <View style={styles.rowContainer2}>
                      <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Join an existing node</Text>

                      </View>
                      <View
                        style={ styles.btnContainer }
                      >
                        <Text
                          style={ styles.btnText }
                        >
                            On
                        </Text>
                      </View>
                    </View>
                    <View style={styles.bar}>
                      <View
                        style={
                          problemsContainer >= 1
                            ? {
                                height: 12,
                                width: 2,
                                backgroundColor: 'black',
                                position: 'absolute',
                                left:  100 + '%',
                                top: -4,
                                zIndex: 5
                              }
                            : {
                                height: 12,
                                width: 2,
                                backgroundColor: 'black',
                                position: 'absolute',
                                left: '100%',
                                top: -4,
                                zIndex: 5
                              }
                        }
                      />
                      <View style={styles.bar3}></View>
                      <View style={styles.bar3}></View>
                      <View style={styles.bar3}></View>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
        </ScrollView>
      )
    }
    else if(masternodes.length >= 1){
      return (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
          }>
          <View style={styles.headerContainer}>
            <Text style={styles.boldText}>Your masternodes</Text>
          </View>


            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={masternodes}
              renderItem={this.renderMasternodeList}
              extraData={this.state}
              keyExtractor={item => `${item}`}
            />

        <NetworkErrors error={error} />
          <View style={styles.headerContainer}>
            <Text style={styles.boldText}>Shared Masternodes</Text>
          </View>


            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={masternodes}
              renderItem={this.renderMasternodeList}
              extraData={this.state}
              keyExtractor={item => `${item}`}
            />

        </ScrollView>
      );
    }

  }
}

function mapStateToProps(state) {
  return {
    sensornodes_waitingLength : state.sensor.sensornodes_waiting.length,
    sensornodesLenght : state.sensor.sensornodes.length,
    sensornodes: state.sensor.sensornodes,
    masternodes: state.masternodes.masternodes,
    sensornodes_waiting: state.sensor.sensornodes_waiting,
    name: state.user.name,
    profilepic_url: state.user.profilepic_url,
    batteryLimit: 25,
    common : state.common
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStart: data => dispatch({type: 'FETCH_START'}),
    getUser:token => dispatch(getUser(token)),
    getSensors:token => dispatch(getSensors(token)),
    getMasterNodes:token => dispatch(getMasterNodes(token)),
    getSensorNodes: id_masternode => dispatch(getSensorNodes(id_masternode)),
    getWaitingSensorNodes: id_masternode => dispatch(getWaitingSensorNodes(id_masternode)),

    dispatchMasternodes:data => dispatch({type: 'MASTER_NODE_LIST', payload: data }),
    dispatchSensornodes:data => dispatch({type: 'SENSOR_NODES_LIST', payload: data }),
    dispatchWaitingSensornodes:data => dispatch({type: 'SENSOR_NODES_WAITING', payload: data }),
    dispatchUser:data => dispatch({type: 'USER_DATA', payload: data }),
    hideError:data => dispatch({type:'HIDE_MESSAGE'})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
