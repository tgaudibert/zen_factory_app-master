import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, Switch, Image } from 'react-native';
import MenuImage from '../../components/MenuImage/MenuImage';
import styles from './styles';
import { connect } from 'react-redux';
import { GREEN_CONTAINER_COLOR } from '../../AppStyles';
import NavigatorService from '../../util/navigator'

import { translate } from "../../../App";

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
              {translate("SETTINGS_PARAMETERS")}
            </Text>
          </View>


        <View style={styles.rowContainer}>
          <Text style={styles.settingText}>{this.props.settings[0].title}</Text>
          <Switch
            onValueChange={() => this.props.update(0)}
            value={this.props.settings[0].switch}
          />
        </View>



        <TouchableHighlight style={styles.settingContainer} underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.settingText}>Support</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.settingContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => {
            NavigatorService.navigate('MasternodeAppairing');
        }}>
          <Text style={styles.settingText}>{translate("SETTINGS_RESTARTAPPAIRING")}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.settingContainer} underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.settingText}>Log Out</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    update: id => dispatch({ type: 'UPDATE_SETTINGS', id }),
    changeLanguage: language => dispatch({ type: 'CHANGE_LANGUAGE', language })
  };
}

function mapStateToProps(state) {
  return {
    settings: state.setting.settings,
    language:state.setting.settings[2].language
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
