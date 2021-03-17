import React from 'react';
import { KeyboardAvoidingView , Platform,Text, View, TextInput, TouchableWithoutFeedback, Keyboard ,Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import LoadingController from '../../../components/loading/LoadingController';
import {updateProfile} from "../../../redux/actions/Profile";
import { translate } from "../../../../App";


function NameErrors(props) {
  const error = props.error;
  if (error) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          {translate("ACCOUNT_NAME_WARNING")}
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


class UpdateAccountNameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isValid:false,
      isPressed:false
    };
  }

  onPressButton = async () => {

    if(this.state.isValid){
      const profile = {
        name:this.state.name
      }
      this.props.updateProfile(profile)
    }
  };

  updateName(input){
    this.setState({ name: input })
    this.checkCharacters()
  }

  checkCharacters() {
    if (this.state.name.length < 3) {
      this.setState({isValid:false})
    }else{
      this.setState({isValid:true})
    }
  }

  render() {
    const error =this.props.common.error
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={80}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView >
          <LogoHeader
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />

          <Text style={styles.title}>{translate("ACCOUNT_NAME_TITLE")}</Text>

            <NameErrors error={!this.state.isValid} />

          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={translate("ACCOUNT_NAME_ENTRY")}
                onChangeText={text => this.updateName(text)}
                value={this.state.name}
              />
            </View>
            <View style={styles.rowContainer}>
              <View style={this.state.isValid ? styles.fullBox : styles.emptyBox } />
              <Text style={styles.conditionText}>{translate("ACCOUNT_NAME_VALID")}</Text>
            </View>
          </View>

          <ContinueButton
           onPress={() => {
             this.onPressButton();
           }}
       />

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
    updateProfile: profile=> dispatch(updateProfile(profile))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAccountNameScreen);
