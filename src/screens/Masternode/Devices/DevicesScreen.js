import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";

class DevicesScreen extends React.Component {
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
    //console.log(item)
    const sensornode = this.props.sensornodes[item]
    this.props.setCurrent_sensornode(sensornode)
    console.log(sensornode)
    NavigatorService.navigate('SensornodeState', { sensornode });
  }


  //render Active SENSORS
  renderSensors = ({ item }) => {
    if(this.props.sensornodes[item].battery_porcent > 50){
      return (
        <View style={styles.sensorContainer}>
            <TouchableHighlight
              onPress={() => this.changeView(item)}
            >
              <View>
                <Image
                  style={styles.glass}
                  source={require('../../../../assets/icons/battery-full.png')}
                />
              </View>
            </TouchableHighlight>
        </View>
      );
    }else if(this.props.sensornodes[item].battery_porcent <= 50 && this.props.sensornodes[item].battery_porcent > 25){
      return (
        <View style={styles.sensorContainer}>
            <TouchableHighlight
              onPress={() => this.changeView(item)}
            >
              <View>
                <Image
                  style={styles.glass}
                  source={require('../../../../assets/icons/battery-mid.png')}
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
                  source={require('../../../../assets/icons/battery-low.png')}
                />
              </View>
            </TouchableHighlight>
        </View>
      );
    }
  };


  render() {

    const problemsSensors = this.props.sensornodes.filter(sensor =>  sensor.battery_porcent <= 25 ).length
    const sensorsArray = new Array(this.props.sensornodesLength).fill(null).map((u, i) => i);


    return (
      <ScrollView style={styles.container}>

        <TouchableHighlight
          style={styles.infoContainer}
          onPress={() => NavigatorService.navigate('Devices')}
        >
          <View style={styles.rowContainer}>
            <Image
              style={styles.questionIcon}
              source={require('../../../../assets/icons/device-pending.png')}
            />
            <View style={styles.columnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>{translate("DEVICES_TITLE")}</Text>

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
                          left: (this.props.sensornodesLength / this.props.sensornodesLength) * 100 + '%',
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
            <Text style={styles.mainText}>{problemsSensors} {translate("DEVICES_BATTERY1")} </Text>
            <Text style={styles.secText}>{translate("DEVICES_BATTERY2")}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>{this.props.sensornodesLength} {translate("DEVICES_AVAILABLE1")}</Text>
            <Text style={styles.secText}>{translate("DEVICES_AVAILABLE2")}</Text>
          </View>
        </View>
        <View  style={styles.greenContainer} >
          <Text  style={styles.greenText} >
            {problemsSensors >=  1
              ? translate("DEVICES_WARNING")
              : translate("DEVICES_OK")}
          </Text>
        </View>

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
    batteryLimit: 25,
    common : state.common
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevicesScreen);
