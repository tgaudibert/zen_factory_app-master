import React from 'react';
import { Text, View, TouchableHighlight, Image, Dimensions, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from './styles';
import { landingArray } from '../../../data/dataArrays';
import { connect } from 'react-redux';
import axios from '../../../util/Api'
import LottieView from 'lottie-react-native';
import NavigatorService from '../../../util/navigator'
import { translate } from "../../../../App";

/*
import {getUser} from "../../../redux/actions/Auth";
import {getMasterNodes} from "../../../redux/actions/MasterNodes";
import {getSensorNodes, getWaitingSensorNodes} from "../../../redux/actions/SensorNodes";
*/


const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

class LandingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      isLoading:true
    };
  }



  async componentDidMount(){
    console.log('mounted')
    this.animation.play();



    this.setState({ isLoading:false })

  }

  renderImage = ({ item }) => (
    <TouchableHighlight >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.photoUrl }} />
      </View>
    </TouchableHighlight>
  );

  onPressGetStarted = () => {
    NavigatorService.navigate('Email');
  };

  onPressLogin = () => {
    NavigatorService.navigate('SignIn');
  };

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    if(this.state.isLoading){
      return(
        <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            source={require('./loading4.json')}
          />
      )
    }else{
      return (
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Image style={styles.logo} source={require('../../../../assets/icons/monitor.png')} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{translate("AUTH_LANDING_TITLE")}</Text>
            <Text style={styles.description}>{translate("AUTH_LANDING_SUBTITLE")}</Text>
          </View>
          <ScrollView style={styles.carouselContainer}>
            <View style={styles.carousel}>
              <Carousel
                ref={c => {
                  this.slider1Ref = c;
                }}
                data={landingArray}
                renderItem={this.renderImage}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={SCREEN_WIDTH}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                firstItem={0}
                loop={false}
                autoplay={false}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={index => this.setState({ activeSlide: index })}
              />
              <Pagination
                dotsLength={landingArray.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotColor="rgba(255, 255, 255, 0.92)"
                dotStyle={styles.paginationDot}
                inactiveDotColor="white"
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this.slider1Ref}
                tappableDots={!!this.slider1Ref}
              />
            </View>
          </ScrollView>
          <View style={styles.logContainer}>
            <TouchableHighlight
              style={styles.btnContainer}
              onPress={() => this.onPressGetStarted()}
            >
              <Text style={styles.btnText}>{translate("AUTH_LANDING_GETSTARTED")}</Text>
            </TouchableHighlight>

            <View style={styles.bottomRowContainer}>
              <Text style={styles.text}>{translate("AUTH_LANDING_ALREADYSIGNUP")}</Text>
              <TouchableHighlight
                onPress={() => this.onPressLogin()}
              >
                <Text style={styles.signText}>{translate("AUTH_LANDING_SIGNIN")}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}



function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'})
  /*  getUser:token => dispatch(getUser(token)),
    getSensors:token => dispatch(getSensors(token)),
    getMasterNodes:token => dispatch(getMasterNodes(token)),
    getSensorNodes: id_masternode => dispatch(getSensorNodes(id_masternode)),
    getWaitingSensorNodes: id_masternode => dispatch(getWaitingSensorNodes(id_masternode))*/
  };
}

export default connect(
  null,
  mapDispatchToProps
)(LandingScreen);
