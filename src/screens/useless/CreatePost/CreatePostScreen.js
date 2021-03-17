import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, TextInput } from 'react-native';
import styles from './styles';

export default class CreateCommentScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: 'true',
    headerStyle: {
      height: 60
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  onPressPhoto = () => {};
  onPressPoll = () => {};
  onPressPostComment = () => {
  };
  onPressSmiley = () => {};

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.middleContainer}>
          <View style={styles.bar}></View>
          <Text style={styles.title}>Create Post</Text>
          <View style={styles.rowContainer}>
            <Image style={styles.authorImg} source={{ uri: this.props.userPhoto }} />
            <TextInput
              style={styles.input}
              placeholder="Share your thoughts"
              onChangeText={text => this.setState({ text: text })}
              value={this.state.text}
            />
          </View>
        </View>

      </ScrollView>
    );
  }
}
