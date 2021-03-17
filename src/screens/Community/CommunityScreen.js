import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, FlatList ,TouchableOpacity ,Alert} from 'react-native';
import MenuImage from '../../components/MenuImage/MenuImage';
import Swipeout from 'react-native-swipeout';
import styles from './styles';
import { connect } from 'react-redux';
import { homeStyle ,SECONDARY_COLOR, SECONDARY_COLOR_COMPLEMENTARY} from '../../AppStyles';
import {getCommunity, excludeUser} from "../../redux/actions/Community";
import LoadingController from '../../components/loading/LoadingController';

import NavigatorService from '../../util/navigator'
import { translate } from "../../../App";

class CommunityScreen extends React.Component {


  modSwipeoutBtns = (username, id_masternode) =>  [];

  adminSwipeoutBtns = (username, id_masternode) => [
    {
      text: 'Exclude',
      backgroundColor: SECONDARY_COLOR,
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: (item) => { this.excludeConfirmation(username, id_masternode) }
   }
  ];


  excludeConfirmation = (username, id_masternode) =>
    Alert.alert(
      "Are you sure?",
      "This action cannot be recovered",
      [{
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: async () => {
          this.props.excludeUser({
            username:username,
            id_masternode:id_masternode
          })
          console.log("OK Pressed")
        }}
      ],
      { cancelable: false }
    );


  renderCard = item => <Image style={styles.cardImg} key={item.iduser} source={{ uri: item.profilepic_url }} />;



  renderCommunity = ({ item , id}) => {
    console.log(item)
    return (
      <Swipeout right={
          this.props.masternodes[0] && this.props.masternodes[0].name_linkauthorization == 'ADMIN' && item.username != this.props.username
          ? this.adminSwipeoutBtns(item.username, this.props.masternodes[0].id_masternode)
          : this.modSwipeoutBtns(item.username, this.props.masternodes[0].id_masternode)}>
      <TouchableHighlight  style={styles.postContainer} >
        <View style={styles.rowContainer}>
          <Image style={styles.userPhoto} source={{ uri: item.profilepic_url }} />
          <View style={styles.columnContainer}>
            <View style={styles.rowContainer2}>
              <View style={styles.textContainer2}>
                <Text style={styles.mainText}>{item.name}</Text>
                <Text style={styles.secText}>{item.username}</Text>
              </View>
              <View style={ styles.btnContainer } >
                <Text style={ styles.btnText } >
                    {this.props.masternodes[0] && this.props.masternodes[0].name_linkauthorization == 'ADMIN' ? 'on' : 'on'}
                </Text>
              </View>

            </View>
            <View style={styles.bar}>
              <View
                style={
                  {
                      height: 12,
                      width: 2,
                      backgroundColor: 'black',
                      position: 'absolute',
                      left:  100 + '%',
                      top: -4,
                      zIndex: 5
                    }
                }
              />
              <View style={styles.bar3}></View>
              <View style={styles.bar3}></View>

            </View>
          </View>
        </View>
      </TouchableHighlight>
      </Swipeout>
    );
  };

  render() {
    const masternodes = this.props.masternodes
    return (
      <ScrollView style={styles.container} >
        <TouchableHighlight
          style={styles.infoContainer2}
          onPress={() => {masternodes[0] && masternodes[0].name_linkauthorization == 'ADMIN' ? NavigatorService.navigate('InviteCommunity') : console.log("clicked")}}
        >
          <View style={styles.rowContainer}>
            <Image
              style={styles.questionIcon}
              source={require('../../../assets/icons/community2.png')}
            />
            <View style={styles.columnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>Masternode Community</Text>
                </View>
              </View>
              <View style={styles.bar}>
                <View
                  style={
                    {
                        height: 12,
                        width: 2,
                        backgroundColor: 'black',
                        position: 'absolute',
                        left:  100 + '%',
                        top: -4,
                        zIndex: 5
                      }
                  }
                />
                <View style={styles.bar2}></View>
                <View style={styles.bar2}></View>
                <View style={styles.bar2}></View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
        {this.props.users
          ? <ScrollView
                horizontal={true}
                style={styles.carouselContainer}
                showsHorizontalScrollIndicator={false}
              >
              <TouchableOpacity onPress={() => {this.props.masternodes[0] ? NavigatorService.navigate('HelpCommunity') : NavigatorService.navigate('AcceptCommunity')}}>
                <Image
                  style={styles.cardImg}
                  source={require('../../../assets/icons/plus.png')}/>
              </TouchableOpacity>
                {this.props.users.map(item => this.renderCard(item))}
            </ScrollView>
          : <ScrollView
                horizontal={true}
                style={styles.carouselContainer}
                showsHorizontalScrollIndicator={false}
              >
              <TouchableOpacity onPress={() => {this.props.masternodes[0] ? NavigatorService.navigate('HelpCommunity') : NavigatorService.navigate('AcceptCommunity')}}>
                <Image
                  style={styles.cardImg}
                  source={require('../../../assets/icons/plus.png')}/>
              </TouchableOpacity>
            </ScrollView>
        }
        {this.props.masternodes[0]
          ? <View>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={this.props.users}
              renderItem={this.renderCommunity}
              extraData={this.state}
              key={item => item.iduser}
            />
          </View>
          :
          <View>

          </View>

        }



      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    common:state.common,
    users: state.community.users,
    username: state.user.username,
    masternodes: state.masternodes.masternodes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    excludeUser: data => dispatch(excludeUser(data)),
    getCommunity :id_masternode=> dispatch(getCommunity(id_masternode))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunityScreen);
