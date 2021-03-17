import React from 'react';
import { KeyboardAvoidingView , Platform,Text, View, TouchableHighlight, Image, ScrollView ,Alert} from 'react-native';
import LogoHeader from '../../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../../components/ContinueButton/ContinueButton';
import styles from './styles';
import { profileIcons } from '../../../data/dataArrays';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker'

import {updateProfilePicture, updateProfilePictureFromURL} from "../../../redux/actions/Profile";
import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";

class AccountPictureScreen extends React.Component {
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
        this.setState({ photo: response })
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
      this.props.updateProfilePicture(this.state.pic_meta)
    }
    if(this.state.iconId){
      this.props.updateProfilePictureFromURL(profileIcons[this.state.iconId-1].url)
    }else{
      console.log("error")
    }
  }

  onPressText = () => {};

  renderCard = item => (
    <TouchableHighlight
      key={item.id}
      onPress={() => this.onPressCard(item)}
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
      style={styles.container}>
      <ScrollView style={styles.container}>
        <LogoHeader
          onPress={() => {
            this.props.navigation.goBack();
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
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => this.onPressCard(this.state.photo)}
            style={this.state.iconUri == this.state.photo.uri ? styles.selectedCardContainer : styles.cardContainer}
          >
            <Image style={styles.cardImg} source={{ uri: this.state.photo.uri }} />
          </TouchableHighlight>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>{translate("ACCOUNT_PROFILEPICTURE_TITLE")}</Text>
          <Text style={styles.secText}>
            {translate("ACCOUNT_PROFILEPICTURE_SUBTITLE")}
          </Text>
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => this.handleChoosePhoto()}
          >
            <Text style={styles.customText}>{translate("ACCOUNT_PROFILEPICTURE_CUSTOM")}</Text>
          </TouchableHighlight>
        </View>
           <ContinueButton
            onPress={() => {
              this.onPressButton();
            }}
        />
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
    addUserPhoto: photo => dispatch({ type: 'ADD_USERPHOTO', photo }),
    updateProfilePicture: pic_meta =>dispatch(updateProfilePicture(pic_meta)),
    updateProfilePictureFromURL: pic_url => dispatch(updateProfilePictureFromURL(pic_url))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPictureScreen);
