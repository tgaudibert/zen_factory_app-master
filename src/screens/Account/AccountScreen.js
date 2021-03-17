import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, Switch, Image } from 'react-native';
import MenuImage from '../../components/MenuImage/MenuImage';
import styles from './styles';
import { connect } from 'react-redux';
import { GREEN_CONTAINER_COLOR } from '../../AppStyles';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: GREEN_CONTAINER_COLOR ,
      elevation: 0,
      shadowColor: 'transparent',
      borderBottomWidth: 0
    },
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state={
      updateName:false,
      updatePassword:false
    }
  }


  onPressButton = () => {
    if (this.state.updateName) {
      console.log("updateName")
    }
    if (this.state.updatePassword) {
      console.log("updatePAssword")
    }
  };


  selectUpdateName(){
    this.setState(prevState => ({ updateName: !prevState.updateName}))
    this.setState({
      delete: false
    })
  }

  selectUpdatePassword(){
    this.setState(prevState => ({ updatePassword: !prevState.updatePassword}))
    this.setState({
      retryAppairing: false
    })
  }


  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Settings</Text>

          <View
            style={styles.greenContainer}
          >
            <Text
              style={styles.greenText}
            >
              account parameters
            </Text>
          </View>


        <View style={styles.rowContainer}>
          <Text style={styles.settingText}>{this.props.settings[0].title}</Text>
          <Switch
            onValueChange={() => this.props.update(0)}
            value={this.props.settings[0].switch}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.settingText}>{this.props.settings[1].title}</Text>
          <Switch
            onValueChange={() => this.props.update(1)}
            value={this.props.settings[1].switch}
          />
        </View>

        <TouchableHighlight style={styles.settingContainer} underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.settingText}>Help and Support</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.settingContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => {
            navigation.navigate('MainAppairing');
        }}>
          <Text style={styles.settingText}>Main appairing</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.settingContainer} underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.settingText}>Log Out</Text>
        </TouchableHighlight>

        <View
          style={styles.greenContainer}
        >
          <Text
            style={styles.greenText}
          >
            account parameters
          </Text>
        </View>

        <LogoHeader
          onPress={() => {
            this.navigateBack();
          }}
        />

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>What do you want to do?</Text>
          <Text style={styles.secText}></Text>
        </View>
        <TouchableHighlight
          style={styles.helpContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.selectUpdateName()}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.helpText}>update Name</Text>
            <Image
              style={styles.icon}
              source={
                this.state.updateName
                  ? require('../../../assets/icons/fullCircle.png')
                  : require('../../../assets/icons/emptyCircle.png')
              }
            />
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.helpContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.selectUpdatePassword()}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.helpText}>update Password</Text>
            <Image
              style={styles.icon}
              source={
                this.state.updatePassword
                  ? require('../../../assets/icons/fullCircle.png')
                  : require('../../../assets/icons/emptyCircle.png')
              }
            />
          </View>
        </TouchableHighlight>


        {this.state.isLoading
          ?
            <LoadingController/>
          :
           <ContinueButton
            onPress={() => {
              this.onPressButton();
            }}
        />}

      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    update: id => dispatch({ type: 'UPDATE_SETTINGS', id })
  };
}

function mapStateToProps(state) {
  return {
    settings: state.setting.settings
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
