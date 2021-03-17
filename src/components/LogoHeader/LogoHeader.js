import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import styles from './styles';

export default class LogoHeader extends React.Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        

        <Image style={styles.logo} source={require('../../../assets/icons/monitor.png')} />
      </View>
    );
  }
}
