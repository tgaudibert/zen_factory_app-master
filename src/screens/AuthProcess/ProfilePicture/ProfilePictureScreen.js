import React from 'react';
import { KeyboardAvoidingView , Platform,Text, View, TouchableHighlight, Image, ScrollView ,Alert} from 'react-native';
import LogoHeaderBack from '../../../components/LogoHeaderBack/LogoHeaderBack';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import { profileIcons } from '../../../data/dataArrays';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker'


import {uploadRegisterProfilePicture} from "../../../redux/actions/Register";
import LoadingController from '../../../components/loading/LoadingController';
import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";

class ProfilePictureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      iconId: 1,
      iconUri:'',
      customPhoto: -1,
      pic_meta:null
    };
  }



  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({
          photo: response ,
          iconUri: response.uri
        })
        const pic_meta = {
          photo:response,
          body:{
            name:"profilePic"
          }
        }
        this.setState({ photo: response , pic_meta:pic_meta})
        console.log(pic_meta)
        this.props.addUserPhoto(
          response.uri
        );
      }
    })
  }

  onPressCard = item => {
    this.setState({
      iconUri: item.uri,
      iconId: item.id

    });
  };

  onPressButton = ()=> {
    if(this.state.iconUri){
      this.props.uploadRegisterProfilePicture(this.state.pic_meta)
    }
    if(this.state.iconId){
      this.props.addUserPhoto(profileIcons[this.state.iconId-1].url)
      NavigatorService.navigate('Password')
    }else{
      console.log("error")
    }
  }

  onPressText = () => {};

  renderCard = item => (
    <TouchableHighlight
      onPress={() => this.onPressCard(item)}
      key={item.id}
      style={this.state.iconId == item.id ? styles.selectedCardContainer : styles.cardContainer}
    >
      <Image style={styles.cardImg} source={{ uri: item.url }} />
    </TouchableHighlight>
  );


  render() {
    const error = this.props.common.error
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={40}>
      <ScrollView >
        <LogoHeaderBack
          onPress={() => {
            NavigatorService.goBack();
          }}
        />

        <ScrollView
          horizontal={true}
          style={styles.carouselContainer}
          showsHorizontalScrollIndicator={false}
        >
          {profileIcons.map(item => this.renderCard(item))}
        </ScrollView>
        {this.state.photo && (
          <TouchableHighlight
            onPress={() => this.onPressCard(this.state.photo)}
            style={this.state.iconUri == this.state.photo.uri ? styles.selectedCardContainer : styles.cardContainer}
          >
            <Image style={styles.cardImg} source={{ uri: this.state.photo.uri }} />
          </TouchableHighlight>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>{translate("AUTH_PROFILEPICTURE_TITLE")}</Text>
          <Text style={styles.secText}>
            {translate("AUTH_PROFILEPICTURE_SUBTITLE")}
          </Text>

        </View>

        <ContinueButton onPress={() => { this.onPressButton() }} />
      </ScrollView>
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
    addUserPhoto: profilepic_url => dispatch({type: 'ADD_USER_PIC',profilepic_url}),
    uploadRegisterProfilePicture: pic_meta =>dispatch(uploadRegisterProfilePicture(pic_meta))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePictureScreen);
