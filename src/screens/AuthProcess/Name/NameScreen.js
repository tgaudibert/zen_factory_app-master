import React from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView , Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeaderBack from '../../../components/LogoHeaderBack/LogoHeaderBack';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';

import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";

function NameErrors(props) {
  const {error , isPressed} = props.error;
  if (error && isPressed) {
    return(
      <View style={ styles.greenContainer } >
        <Text style={ styles.greenText} >
          {translate("AUTH_NAME_VALID")}
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


class NameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isValid:false,
      isPressed:false
    };
  }

  componentDidMount(){
    if(!this.props.registration.username){
      NavigatorService.navigate('Home')
    }
    console.log(this.props.registration)
    console.log(this.props.registration.username)

  }


  onPressButton = () => {
    this.setState({isPressed:true})
    this.props.addName(this.state.name);
    if(!this.props.registration.username){
      NavigatorService.navigate('Landing')
    }
    else if(this.state.isValid){
      NavigatorService.navigate('ProfilePicture');
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
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={40}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView >
          <LogoHeaderBack
            onPress={() => { NavigatorService.goBack(); }}
          />

          <Text style={styles.title}>{translate("AUTH_NAME_TITLE")}</Text>
          <NameErrors error={!this.state.isValid} isPressed={this.state.isPressed}/>
          <View style={styles.conditionContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={translate("AUTH_NAME_ENTRY")}
                onChangeText={text => this.updateName(text)}
                value={this.state.name}
              />
            </View>
            <View style={styles.rowContainer}>
              <View style={this.state.isValid ? styles.fullBox : styles.emptyBox } />
              <Text style={styles.conditionText}>{translate("AUTH_NAME_VALID")}</Text>
            </View>
          </View>

          <ContinueButton onPress={() => this.onPressButton()} />

        </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}


function mapStateToProps(state) {
  return {
    name: state.registration.name,
    registration:state.registration,
    common:state.common
  };
}


function mapDispatchToProps(dispatch) {
  return {
    addName: name => dispatch({ type: 'ADD_NAME', name})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameScreen);
