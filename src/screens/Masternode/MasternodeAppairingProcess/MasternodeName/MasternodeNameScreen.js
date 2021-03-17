import React from 'react';
import { KeyboardAvoidingView , Platform,Text, View, TextInput, TouchableWithoutFeedback, Keyboard ,Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../../components/ContinueButton/ContinueButton';
import styles from './styles';

import NavigatorService from '../../../../util/navigator'
import LoadingController from '../../../../components/loading/LoadingController'
import {createMasterNode} from '../../../../redux/actions/MasterNodes'

import { translate } from "../../../../../App";

function NameErrors(props) {
  const {error , isPressed} = props.error;
  if (error && isPressed) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          {translate("MASTERNODE_NAME_ERROR")}
        </Text>
      </View>
    )
  }
  return(
    <View style={ styles.greenContainer } >
      <Text style={ styles.greenText} >

      </Text>
    </View>
  )
}

class MasternodeNameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masternode_name: '',
      loading:false
    };
  }


  checkCharacters() {
    if (this.state.masternode_name.length < 3) return 1;
    return 0;
  }


  onPressButton = async () => {

    this.props.createMasterNode(this.state.masternode_name);
    //this.props.navigation.navigate('MasternodeAppairing');

  };


  render() {
    const error = this.props.common.error
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={80}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView >
          <LogoHeader
            onPress={() => {
              NavigatorService.navigate('Home');
            }}
          />

        <Text style={styles.title}>{translate("MASTERNODE_NAME_TITLE")}</Text>
          <NameErrors isPressed={this.state.isPressed} error={this.props.common.error}/>
          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={translate("MASTERNODE_NAME_ENTRY")}
                onChangeText={text => this.setState({ masternode_name: text })}
                value={this.state.masternode_name}
              />
            </View>

            <View style={styles.rowContainer}>
              <View style={this.checkCharacters() ? styles.emptyBox : styles.fullBox} />
              <Text style={styles.conditionText}>{translate("MASTERNODE_NAME_VALID")}</Text>
            </View>

          </View>
          {this.state.loading
            ?
              <LoadingController/>
            :
             <ContinueButton
              onPress={() => {
                this.onPressButton();
              }}
          />}
        </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}


function mapStateToProps(state) {
  return {
    common:state.common
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    createMasterNode: masternode_name => dispatch(createMasterNode(masternode_name))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasternodeNameScreen);
