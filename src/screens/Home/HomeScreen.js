import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, RefreshControl, FlatList, Alert } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import { connect } from 'react-redux';
import { homeStyle ,SECONDARY_COLOR, SECONDARY_COLOR_COMPLEMENTARY} from '../../AppStyles';
import {DeviceEventEmitter} from 'react-native'


import NavigatorService from '../../util/navigator'
import { translate } from "../../../App";


function NetworkErrors(props) {
  return(
    <View style={ styles.greenContainer } >
      <Text style={ styles.greenText} ></Text>
    </View>
  )
}



class HomeScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      refreshing:false,
      idWaitingMasternode:""
    };
  }



  async componentDidMount() {
    this.props.navigation.setParams({
      profilepic_url: this.props.profilepic_url
    });
  }




  //Function to work on
  _onRefresh = () => {
    this.setState({refreshing: true});
    DeviceEventEmitter.emit('reloadCentralInformations')
    this.setState({refreshing: false});
  }


  render() {

    const problemsContainer= this.props.sensornodes.filter(sensor =>  sensor.filling_porcent <= 25 ).length
    const problemsSensors = this.props.sensornodes.filter(sensor =>  sensor.battery_porcent <= 25 ).length
    const error = this.props.common.error
    const masternodes = this.props.masternodes


    //(masternodes.length == 0  && !isLoading) ||
    if((!masternodes) ||(masternodes.length == 0)){
      return(
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing}
              onRefresh={this._onRefresh} />
          }>

            <View style={styles.headerContainer}>
              <Text style={styles.boldText}>{translate("HOME_WELCOME")} {this.props.name}</Text>
            </View>
            <View style={ styles.greenContainer } >
              <Text style={ styles.greenText} >

              </Text>
            </View>

            <TouchableHighlight
              style={styles.infoContainer}
              onPress={() => NavigatorService.navigate('AcceptCommunity')}
            >
              <View style={styles.rowContainer}>
                <Image
                  style={styles.questionIcon}
                  source={require('../../../assets/icons/join.png')}
                />
                <View style={styles.columnContainer}>
                  <View style={styles.rowContainer2}>
                    <View style={styles.textContainer}>
                      <Text style={styles.mainText}>{translate("HOME_JOINNODE")}</Text>

                    </View>
                    <View style={ styles.btnContainer } >
                      <Text style={styles.btnText } >
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
                            left: 100 + '%',
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

            <TouchableHighlight
              style={styles.infoContainer}
              onPress={() => NavigatorService.navigate('MasternodeName')}
            >
              <View style={styles.rowContainer}>
                <Image
                  style={styles.questionIcon}
                  source={require('../../../assets/icons/masternode.png')}
                />
                <View style={styles.columnContainer}>
                  <View style={styles.rowContainer2}>
                    <View style={styles.textContainer}>
                      <Text style={styles.mainText}>{translate("HOME_CREATENODE")}</Text>

                    </View>
                    <View style={ styles.btnContainer } >
                      <Text style={styles.btnText } >
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
                            left: 100 + '%',
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
              <Text style={styles.boldText}>{translate("HOME_WELCOME")} {this.props.name}</Text>
            </View>
            <View style={ styles.greenContainer } >
              <Text style={ styles.greenText} >
                { this.state.idWaitingMasternode == masternodes[0].id_masternode ? translate("HOME_MASTERNODEPENDING"): translate("HOME_MASTERNODECREATED") }
              </Text>
            </View>

            <TouchableHighlight
              style={styles.infoContainer}
              onPress={() => NavigatorService.navigate('MasternodeAppairing')}
            >
              <View style={styles.rowContainer}>
                <Image
                  style={styles.questionIcon}
                  source={require('../../../assets/icons/appairing.png')}
                />
                <View style={styles.columnContainer}>
                  <View style={styles.rowContainer2}>
                    <View style={styles.textContainer}>
                      <Text style={styles.mainText}>{ this.state.idWaitingMasternode == masternodes[0].id_masternode ? translate("HOME_RESTARTAPPAIRING"): translate("HOME_STARTAPPAIRING") }</Text>
                    </View>
                    <View style={ problemsSensors >= 1 ? styles.warningBtnContainer : styles.btnContainer } >
                      <Text style={ problemsSensors >= 1 ? styles.warningBtnText : styles.btnText } >
                        {problemsSensors >= 1 ? translate("HOME_WARNING")  : 'On'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.bar}>
                    <View
                      style={{
                            height: 12,
                            width: 2,
                            backgroundColor: 'black',
                            position: 'absolute',
                            left: '100%',
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

            <NetworkErrors error={error} />

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
            <Text style={styles.boldText}>{translate("HOME_WELCOME")} {this.props.name}</Text>
          </View>
          <NetworkErrors error={error} />
          <TouchableHighlight
            style={styles.infoContainer}
            onPress={() => NavigatorService.navigate('Sensornodes')}
          >
            <View style={styles.rowContainer}>
              <Image
                style={styles.questionIcon}
                source={require('../../../assets/icons/containers.png')}
              />
              <View style={styles.columnContainer}>
                <View style={styles.rowContainer2}>
                  <View style={styles.textContainer}>
                    <Text style={styles.mainText}>{translate("HOME_ACCESSSENSORNODES_TITLE")}</Text>
                    <Text style={styles.secText}>
                      {(this.props.sensornodesLenght - problemsContainer)} / {this.props.sensornodesLenght} {translate("HOME_ACCESSSENSORNODES_SUBTITLE")}
                    </Text>
                  </View>
                  <View style={ problemsContainer >= 1 ? styles.warningBtnContainer : styles.btnContainer } >
                    <Text style={ problemsContainer >= 1 ? styles.warningBtnText : styles.btnText } >
                      {problemsContainer >= 1 ? translate("HOME_WARNING") : 'On'}
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
                            left: ( (this.props.sensornodesLenght - problemsContainer) / this.props.sensornodesLenght) * 100 + '%',
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


          <View  style={ styles.greenContainer }>
            <Text style={ styles.greenText }  >
              {problemsSensors >=  1
                ? translate("HOME_ACCESSDEVICES_WARNING")
                : ''}
            </Text>
          </View>

          <TouchableHighlight
            style={styles.infoContainer}
            onPress={() => NavigatorService.navigate('Devices')}
          >
            <View style={styles.rowContainer}>
              <Image
                style={styles.questionIcon}
                source={require('../../../assets/icons/device-pending.png')}
              />
              <View style={styles.columnContainer}>
                <View style={styles.rowContainer2}>
                  <View style={styles.textContainer}>
                    <Text style={styles.mainText}>{translate("HOME_ACCESSDEVICES_TITLE")}</Text>
                    <Text style={styles.secText}>
                      {this.props.sensornodesLenght} / {this.props.sensornodesLenght} {translate("HOME_ACCESSDEVICES_SUBTITLE")}
                    </Text>
                  </View>
                  <View style={ problemsSensors >= 1 ? styles.warningBtnContainer : styles.btnContainer } >
                    <Text style={ problemsSensors >= 1 ? styles.warningBtnText : styles.btnText } >
                      {problemsSensors >= 1 ? translate("HOME_WARNING") : 'On'}
                    </Text>
                  </View>
                </View>
                <View style={styles.bar}>
                  <View
                    style={
                      problemsSensors >= 1
                        ? {
                            height: 12,
                            width: 2,
                            backgroundColor: 'black',
                            position: 'absolute',
                            left: (this.props.sensornodesLenght/ this.props.sensornodesLenght) * 100 + '%',
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

          <View style={ styles.greenContainer} >
            <Text  style={ styles.greenText }>
              {this.props.sensornodes_waitingLength  >= 1
                ? translate("HOME_ACCESSPENDINGDEVICES_WARNING")
                : translate("HOME_ACCESSPENDINGDEVICES_OK")}
            </Text>
          </View>

          <TouchableHighlight
            style={styles.infoContainer}
            onPress={() => NavigatorService.navigate('PendingDevices')}
          >
            <View style={styles.rowContainer}>
              <Image
                style={styles.questionIcon}
                source={require('../../../assets/icons/waiting-appairing.png')}
              />
              <View style={styles.columnContainer}>
                <View style={styles.rowContainer2}>
                  <View style={styles.textContainer}>
                    <Text style={styles.mainText}>{translate("HOME_ACCESSPENDINGDEVICES_TITLE")}</Text>
                    <Text style={styles.secText}>
                      {this.props.sensornodes_waitingLength } {translate("HOME_ACCESSPENDINGDEVICES_SUBTITLE")}
                    </Text>
                  </View>
                  <View style={
                      this.props.sensornodes_waitingLength  >= 1
                        ? styles.warningBtnContainer
                        : styles.btnContainer
                    } >
                    <Text style={
                        this.props.sensornodes_waitingLength  >= 1
                          ? styles.warningBtnText
                          : styles.btnText
                      } >
                      {this.props.sensornodes_waitingLength  >= 1 ? translate("HOME_WARNING") : 'Ok'}
                    </Text>
                  </View>
                </View>
                <View style={styles.bar}>
                  <View
                    style={{
                        height: 12,
                        width: 2,
                        backgroundColor: 'black',
                        position: 'absolute',
                        left: 100 + '%',
                        top: -4,
                        zIndex: 5
                      }}
                  />
                  <View style={styles.bar3}></View>

                </View>
              </View>
            </View>
          </TouchableHighlight>

        <View style={styles.headerContainer}>
          <Text style={styles.normalText}>

          </Text>
        </View>

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
    common : state.common
  };
}



export default connect(
  mapStateToProps,
  null
)(HomeScreen);
