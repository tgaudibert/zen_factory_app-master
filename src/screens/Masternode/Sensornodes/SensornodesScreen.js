import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import NavigatorService from '../../../util/navigator'

import { translate } from "../../../../App";

class SensornodesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#F4F6FA',
        elevation: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      }
    };
  };



  changeView(item){
    const sensornode = this.props.sensornodes[item]
    console.log(sensornode)
    this.props.setCurrent_sensornode(sensornode)
    NavigatorService.navigate('SensornodeState', { sensornode });
  }


  //render Active SENSORS
  renderSensors = ({ item }) => {
    if(this.props.sensornodes[item].filling_porcent > 66){
      return (
        <View style={styles.sensorContainer}>
            <TouchableHighlight
              onPress={() => this.changeView(item)}
            >
              <View>
                <Image
                  style={styles.glass}
                  source={require('../../../../assets/icons/container-full.png')}
                />
              </View>
            </TouchableHighlight>
        </View>
      );
    }else if(this.props.sensornodes[item].filling_porcent <= 66 && this.props.sensornodes[item].filling_porcent > 33){
      return (
        <View style={styles.sensorContainer}>
            <TouchableHighlight
              onPress={() => this.changeView(item)}
            >
              <View>
                <Image
                  style={styles.glass}
                  source={require('../../../../assets/icons/container-mid.png')}
                />
              </View>
            </TouchableHighlight>
        </View>
      );
    }else{
      return (
        <View style={styles.sensorContainer}>
            <TouchableHighlight
              onPress={() => this.changeView(item)}
            >
              <View>
                <Image
                  style={styles.glass}
                  source={require('../../../../assets/icons/container-low.png')}
                />
              </View>
            </TouchableHighlight>
        </View>
      );
    }
  };


  renderSensorsList = ({ item }) => {
    const deltaHours =  (Date.now() - Date.parse(this.props.sensornodes[item].added_at))/3600000
    const deltaMinutes = deltaHours * 60
    return (
      <TouchableHighlight
        style={styles.infoContainer2}
        onPress={() => this.changeView(item)}
      >
        <View style={styles.rowContainer}>
          <Image
            style={styles.questionIcon}
            source={require('../../../../assets/icons/waiting-appairing.png')}
          />
          <View style={styles.columnContainer}>
            <View style={styles.rowContainer2}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}> {this.props.sensornodes[item].sensornode_name}</Text>
                <Text style={styles.secText}>
                  {' '}
                   {this.props.sensornodes[item].sensornode_product}
                </Text>
              </View>
              <View style={ styles.btnContainer } >
                <Text  style={ styles.btnText } >
                {deltaMinutes < 60 ? Math.floor(deltaMinutes)+" mn" : Math.floor(deltaHours) + " h"}
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
                    left: (this.props.sensornodes[item].battery_porcent / 100) * 100 + '%',
                    top: -4,
                    zIndex: 5
                  }}
              />
            <View style={styles.bar1}></View>
            <View style={styles.bar1}></View>
            <View style={styles.bar1}></View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };



  render() {

    const problemsContainer = this.props.sensornodes.filter(sensor =>  sensor.filling_porcent <= 33 ).length
    const sensorsArray = new Array(this.props.sensornodes.length).fill(null).map((u, i) => i);


    return (
      <ScrollView style={styles.container}>

      <TouchableHighlight
        style={styles.infoContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => this.props.navigation.navigate('Sensornodes')}
      >
        <View style={styles.rowContainer}>
          <Image
            style={styles.questionIcon}
            source={require('../../../../assets/icons/containers.png')}
          />
          <View style={styles.columnContainer}>
            <View style={styles.rowContainer2}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>{translate("SENSORNODES_TITLE")}</Text>
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
                        left: ( (this.props.sensornodesLength - problemsContainer) / this.props.sensornodesLength) * 100 + '%',
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

        <View style={styles.photoContainer}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={4}
            data={sensorsArray}
            renderItem={this.renderSensors}
            extraData={this.state}
            keyExtractor={item => `${item}`}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>{this.props.sensornodesLength - problemsContainer} {translate("SENSORNODES_FILLING1")} </Text>
            <Text style={styles.secText}>{translate("SENSORNODES_FILLING2")}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>{this.props.sensornodesLength} {translate("SENSORNODES_AVAILABLE1")}</Text>
            <Text style={styles.secText}>{translate("SENSORNODES_AVAILABLE2")}</Text>
          </View>
        </View>
        <View
          style={ styles.greenContainer }
        >
          <Text style={ styles.greenText } >
            {problemsContainer >=  1 ? translate("SENSORNODES_WARNING") : translate("SENSORNODES_OK")}
          </Text>
        </View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={sensorsArray}
          renderItem={this.renderSensorsList}
          extraData={this.state}
          keyExtractor={item => `${item}`}
        />
      </ScrollView>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    setCurrent_sensornode: sensornode => dispatch({ type: 'CURRENT_SENSOR_NODE', sensornode })
  };
}

function mapStateToProps(state) {
  return {
    sensornodesLength: state.sensor.sensornodes.length,
    sensornodes: state.sensor.sensornodes,
    batteryLimit: 25
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SensornodesScreen);
