import React from 'react';
import { Text, View, TouchableHighlight, Image, ImageBackground } from 'react-native';

import styles from './styles';

export default class SuccessScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: 'true',
    headerStyle: {
      height: 60
    },
    headerLeft: <View />
  });

  constructor(props) {
    super(props);
  }

  onPressArrow = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <ImageBackground
        source={require('../../../assets/images/logBackground.png')}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../../assets/icons/monitor.png')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.mainTxt}>You are ready to go!</Text>
          <Text style={styles.secTxt}>
            Thanks for taking your time to create account with us. Now this is the fun part, let's
            explore the app.
          </Text>
        </View>
        <TouchableHighlight style={styles.arrowContainer} onPress={() => this.onPressArrow()}>
          <Image style={styles.arrow} source={require('../../../assets/icons/rightArrow.png')} />
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}
