import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from './styles';

export default class ContinueButton extends React.Component {
  render() {
    return (
      <View style={{ justifyContent: 'flex-end', marginBottom: 30, marginTop: 50, flex: 1 }}>
        <TouchableHighlight
          onPress={this.props.onPress}
          style={styles.btnContainer}
        >
          <Text style={styles.btnText}>Continue</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
