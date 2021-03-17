import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";

class PendingDevicesScreen extends React.Component {
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

  constructor(props) {
    super(props);
  }


  changeView(item){
    console.log(this.props.sensornodes_waiting[item])
    const sensornode = this.props.sensornodes_waiting[item]
    this.props.setCurrent_sensornode(sensornode)
    NavigatorService.navigate('UpdateSensornodeName');
  }

  appairView(item){
    const sensornode = this.props.sensornodes_waiting[item]
    this.props.setCurrent_sensornode(sensornode)
    NavigatorService.navigate('HelpAppairing');
  }

  //render Sensors with action needed
  renderPendingSensors = ({ item }) => {
    return (
      <View style={styles.sensorContainer}>
        {
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => this.changeView(item)}
          >
            <View>
              <Image
                style={styles.glass}
                source={require('../../../../assets/icons/device-pending.png')}
              />

            </View>
          </TouchableHighlight>
        }
      </View>
    );
  };


  renderPendingSensorsList = ({ item }) => {
    return (
      <TouchableHighlight
        style={styles.infoContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => this.appairView(item)}
      >
        <View style={styles.rowContainer}>
          <Image
            style={styles.questionIcon}
            source={require('../../../../assets/icons/waiting-appairing.png')}
          />
          <View style={styles.columnContainer}>
            <View style={styles.rowContainer2}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}> {this.props.sensornodes_waiting[item].sensornode_name}</Text>
                <Text style={styles.secText}>
                   {this.props.sensornodes_waiting[item].sensornode_product}
                </Text>
              </View>
              <View style={ styles.btnContainer } >
                <Text style={ styles.btnText }  >
                  {translate("DEVICESPENDING_WATING")}
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
    );
  };


  render() {
    const waiting_sensorArray = new Array(this.props.sensornodes_waiting.length).fill(null).map((u, i) => i);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.detailsContainer}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              <Text style={styles.waterText}>{this.props.sensornodes_waiting.length} {translate("DEVICESPENDING_TITLE")}</Text>{' '}
            </Text>
          </View>

          <View style={ styles.greenContainer } >
            <Text style={ styles.greenText } >
              {1 <= this.props.sensornodes_waiting.length
                ? translate("DEVICESPENDING_WARNING")
                : translate("DEVICESPENDING_OK")
              }
            </Text>
          </View>
        </View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={waiting_sensorArray}
          renderItem={this.renderPendingSensorsList}
          extraData={this.state}
          keyExtractor={item => `${item}`}
        />

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    sensornodes_waiting: state.sensor.sensornodes_waiting
  };
}



function mapDispatchToProps(dispatch) {
  return {
    newSensor: () => dispatch({ type: 'NEW_SENSOR' }),
    setCurrent_sensornode: sensornode => dispatch({ type: 'CURRENT_SENSOR_NODE', sensornode })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingDevicesScreen);



//OLD CONTAINER
/*
<View style={styles.photoContainer}>
  <FlatList
    vertical
    showsVerticalScrollIndicator={false}
    numColumns={4}
    data={waterArray}
    renderItem={this.renderPendingSensors}
    extraData={this.state}
    keyExtractor={item => `${item}`}
  />
</View>

*/
