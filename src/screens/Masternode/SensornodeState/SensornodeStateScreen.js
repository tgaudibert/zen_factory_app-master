import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import styles from './styles';
//mport { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import ProgressCircle from 'react-native-progress-circle';
//import GoalAchievedScreen from '../GoalAchieved/GoalAchievedScreen';
import { connect } from 'react-redux';

import { SECONDARY_COLOR , BLACK_COLOR} from '../../../AppStyles';
import NavigatorService from '../../../util/navigator'

import { translate } from "../../../../App";


class SensornodeStateScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: '#F4F6FA',
        elevation: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerRight: (
        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => NavigatorService.navigate('SensornodeHelp')}
        >
          <Image
            style={styles.goalAchievedIcon}
            source={require('../../../../assets/icons/sensor-settings.png')}
          />
        </TouchableHighlight>
      )
    };
  };



  async componentDidMount(){
    console.log(this.props.current_sensornode)
    if(!this.props.current_sensornode){
      this.props.navigation.push('Home')
    }
    const sensornode =  this.props.current_sensornode
    this.setState({sensornode:sensornode})

  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      sensornode:{
        name:"Wait",
        id:"Wait",
        group:"Wait",
        batteryPercent:0,
        contentPercent:0,
        timeAwaken:0,
        isValidated:false,
        capacity:5000,
        added_at:''
      }
    };
  }



  render() {
    const { navigation } = this.props;
    const deltaHours =  ((Date.now() - Date.parse(this.state.sensornode.added_at))/3600000)
    const deltaMinutes = deltaHours * 60
    //const sensor = this.props.navigation.getParam('sensor');
    //var sensor = navigation.getParam('SensorState');

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          {translate("SENSORNODESTATE_TITLE")}<Text style={styles.stepsText}>{this.state.sensornode.sensornode_name}</Text>
        </Text>

        <View style={styles.greenContainer} >
          <Text style={styles.greenText} >
            {this.state.sensornode.filling_porcent <= 33 ? translate("SENSORNODESTATE_FILLINGWARNING") : translate("SENSORNODESTATE_FILLINGOK")}
          </Text>
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.circleContainer}>

            <ProgressCircle
              percent={this.state.sensornode.filling_porcent}
              radius={80}
              borderWidth={16}
              color={SECONDARY_COLOR}
              shadowColor="#ffff"
              bgColor={BLACK_COLOR}
            >
              <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                <Image
                  style={styles.circleImg}
                  source={require('../../../../assets/icons/walk.png')}
                />
              <Text style={styles.circleText}>{this.state.sensornode.filling_porcent} % </Text>
                <Text style={{ fontWeight: '500', textAlign: 'center',fontWeight: 'bold' }}>{translate("SENSORNODESTATE_FILLINGREMAINGING")}</Text>
              </View>
            </ProgressCircle>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>{translate("SENSORNODESTATE_SIGNAL1")}</Text>
            <Text style={styles.secText}>{this.state.sensornode.rssi} snni</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>{translate("SENSORNODESTATE_UPDATED1")}</Text>
            <Text style={styles.secText}>{deltaMinutes < 60 ? Math.floor(deltaMinutes)+" mn" : Math.floor(deltaHours) + " h"} {translate("SENSORNODESTATE_UPDATED2")}</Text>
          </View>
        </View>


        <Text style={styles.title}>
          {translate("SENSORNODESTATE_CONTAIN")} <Text style={styles.stepsText}>{this.state.sensornode.sensornode_product} </Text>
        </Text>
        <View style={styles.greenContainer }  >
          <Text style={ styles.greenText } >
            {this.state.sensornode.battery_porcent <= 25
              ? translate("SENSORNODESTATE_BATTERYWARNING")
              : translate("SENSORNODESTATE_BATTERYOK")}
          </Text>
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.circleContainer}>
            <ProgressCircle
              percent={this.state.sensornode.battery_porcent}
              radius={80}
              borderWidth={16}
              color={SECONDARY_COLOR}
              shadowColor="#ffff"
              bgColor={BLACK_COLOR}
            >
              <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                <Image
                  style={styles.circleImg}
                  source={require('../../../../assets/icons/walk.png')}
                />
              <Text style={styles.circleText}>{this.state.sensornode.battery_porcent} % </Text>
                <Text style={{ fontWeight: '500', textAlign: 'center',fontWeight: 'bold' }}>Battery</Text>
              </View>
            </ProgressCircle>
          </View>
        </View>

      </ScrollView>
    );
  }
}


function mapStateToProps(state) {
  return {
    current_sensornode:state.sensor.current_sensornode,
    name: state.user.name,
    userPhoto: state.user.userPhoto
  };
}

export default connect(
  mapStateToProps,
  null
)(SensornodeStateScreen);

//initial chart
/*

<Modal isVisible={this.state.modal}>
  <GoalAchievedScreen toggleModal={this.toggleModal} />
</Modal>


  <LineChart
            data={{
              labels: ['6AM', '9AM', '12AM', '3PM', '6PM'],
              datasets: [
                {
                  data: [0, 0, 0, 1000, 2000, 400, 3000, 0, 0, 0],
                  color: (opacity = 1) => `rgba(254, 156, 94, ${opacity})` // optional
                }
              ]
            }}
            width={SCREEN_WIDTH - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffff',
              backgroundGradientFrom: '#ffff',
              backgroundGradientTo: '#ffff',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(254, 156, 94, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
          />
          */
