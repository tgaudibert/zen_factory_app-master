import React from 'react';
import { Text, View, TouchableHighlight, Image, ImageBackground } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import {DeviceEventEmitter} from 'react-native'
import NavigatorService from '../../util/navigator'

import { translate } from "../../../App";

class SuccessScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  onPressArrow = () => {
    NavigatorService.navigate('Home');
  };


  render() {
    return (
      <ImageBackground
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../../assets/icons/monitor.png')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.mainTxt}>{this.props.common.subject}</Text>
          <Text style={styles.secTxt}>
            {this.props.common.message}
          </Text>
        </View>
        <TouchableHighlight style={styles.arrowContainer} onPress={() => this.onPressArrow()}>
          <Image style={styles.arrow} source={require('../../../assets/icons/validated.png')} />
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}


function mapStateToProps(state) {
  return {
    common:state.common
  };
}


export default connect(
  mapStateToProps,
  null
)(SuccessScreen);
