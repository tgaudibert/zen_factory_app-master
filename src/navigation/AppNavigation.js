
import React from 'react';
import { View, Button , Image,TouchableHighlight } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

import HomeScreen from '../screens/Home/HomeScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';


//ACCOUNT PARAMETER SCREEN
import AccountPictureScreen from '../screens/Account/AccountPicture/AccountPictureScreen';
import UpdateAccountNameScreen from '../screens/Account/AccountName/UpdateAccountNameScreen';
import AccountHelpScreen from '../screens/Account/AccountHelp/AccountHelpScreen';

//ACCOUNT PARAMETER SCREEN
import SettingsScreen from '../screens/Settings/SettingsScreen';
import SuccessScreen from '../screens/Success/SuccessScreen';

//SENSOR && CONTAINERS PART
import UpdateSensornodeNameScreen from '../screens/Masternode/SensornodeUpdate/UpdateSensornodeName/UpdateSensornodeNameScreen';
import UpdateSensornodeProductScreen from '../screens/Masternode/SensornodeUpdate/UpdateSensornodeProduct/UpdateSensornodeProductScreen';
import SensornodeStateScreen from '../screens/Masternode/SensornodeState/SensornodeStateScreen';
import SensornodesScreen from '../screens/Masternode/Sensornodes/SensornodesScreen';
import PendingDevicesScreen from '../screens/Masternode/PendingDevices/PendingDevicesScreen';
import DevicesScreen from '../screens/Masternode/Devices/DevicesScreen';
import SensornodeHelpScreen from '../screens/Masternode/SensornodeUpdate/SensornodeHelp/SensornodeHelpScreen';
import HelpAppairingScreen from '../screens/Masternode/SensornodeUpdate/HelpAppairing/HelpAppairingScreen';

//COMMUNITY PART
import HelpCommunityScreen from '../screens/Community/HelpCommunity/HelpCommunityScreen';
import CommunityScreen from '../screens/Community/CommunityScreen';
import AcceptCommunityScreen from '../screens/Community/AcceptCommunity/AcceptCommunityScreen';
import InviteCommunityScreen from '../screens/Community/InviteCommunity/InviteCommunityScreen';

//AUTHENTIFICATION PART
import ProfilePictureScreen from '../screens/AuthProcess/ProfilePicture/ProfilePictureScreen';
import LandingScreen from '../screens/AuthProcess/Landing/LandingScreen';
import EmailAdressScreen from '../screens/AuthProcess/EmailAdress/EmailAdressScreen';
import PasswordScreen from '../screens/AuthProcess/Password/PasswordScreen';
import SignInScreen from '../screens/AuthProcess/SignIn/SignInScreen';
import NameScreen from '../screens/AuthProcess/Name/NameScreen';
import ResetPasswordScreen from '../screens/AuthProcess/ResetPassword/ResetPasswordScreen';
//import CodeValidationScreen from '../screens/AuthProcess/CodeValidation/CodeValidationScreen';
import CodeValidationDigitScreen from '../screens/AuthProcess/CodeValidationDigit/CodeValidationDigitScreen';
import NewPasswordScreen from '../screens/AuthProcess/NewPassword/NewPasswordScreen';

//MAIN APPAIRING PROCESS
import MasternodeNameScreen from '../screens/Masternode/MasternodeAppairingProcess/MasternodeName/MasternodeNameScreen';
import MasternodeAppairingScreen from '../screens/Masternode/MasternodeAppairingProcess/MasternodeAppairing/MasternodeAppairingScreen';
import MasternodeWifiParamsScreen from '../screens/Masternode/MasternodeAppairingProcess/MasternodeWifiParams/MasternodeWifiParamsScreen';


import { Animated, Easing } from 'react-native';




import NavigatorService from '../util/navigator'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { GREEN_CONTAINER_COLOR } from '../AppStyles';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();




function LandingStack() {
  return (
    <Stack.Navigator
    initialRouteName="Home"
    headerMode="none"
    swipeEnabled="false"
    screenOptions={({ route, navigation }) => ({
      gestureEnabled: true,
      swipeEnabled:false,
      cardOverlayEnabled: true,
      headerStatusBarHeight:
        navigation.dangerouslyGetState().routes.indexOf(route) > 0
          ? 0
          : undefined,
        ...TransitionPresets.ModalPresentationIOS,
    })}>
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="Home" component={LandingScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
      <Stack.Screen name="SignIn" component={SignInScreen}/>
      <Stack.Screen name="Name" component={NameScreen}/>
      <Stack.Screen name="Email" component={EmailAdressScreen}/>
      <Stack.Screen name="CodeValidationDigit" component={CodeValidationDigitScreen}/>
      <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen}/>
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
    </Stack.Navigator>
  );
}


import MenuImage from '../components/MenuImage/MenuImage';

function InAppStack({ navigation })  {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={({ route, navigation }) => ({
        gestureEnabled: true,
        swipeEnabled:false,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation.dangerouslyGetState().routes.indexOf(route) > 0
            ? 0
            : undefined,
          ...TransitionPresets.ModalPresentationIOS,
      })}>

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: 'white',
            elevation: 0,
            height: 80,
            shadowColor: 'transparent',
            borderBottomWidth: 0
          },
          headerRight: () => (
            <View style={styles.photoContainer}>
              <View style={styles.greenDot}></View>
              <Image style={styles.userPhoto} source={require('../../assets/icons/settings2.png')} />
            </View>
          ),
          headerLeft: () => (
            <MenuImage
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AccountPicture"
        component={AccountPictureScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="UpdateAccountName"
        component={UpdateAccountNameScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="AccountHelp"
        component={AccountHelpScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="UpdateSensornodeName"
        component={UpdateSensornodeNameScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="UpdateSensornodeProduct"
        component={UpdateSensornodeProductScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="SensornodeState"
        component={SensornodeStateScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#F4F6FA',
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0
          },
          headerRight: () =>(
            <TouchableHighlight
              onPress={() => NavigatorService.navigate('SensornodeHelp')}
            >
              <Image
                style={styles.goalAchievedIcon}
                source={require('../../assets/icons/sensor-settings.png')}
              />
            </TouchableHighlight>
          )
        }}
      />
      <Stack.Screen
        name="Sensornodes"
        component={SensornodesScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="PendingDevices"
        component={PendingDevicesScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Devices"
        component={DevicesScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="SensornodeHelp"
        component={SensornodeHelpScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="HelpAppairing"
        component={HelpAppairingScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="HelpCommunity"
        component={HelpCommunityScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="AcceptCommunity"
        component={AcceptCommunityScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="InviteCommunity"
        component={InviteCommunityScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="MasternodeName"
        component={MasternodeNameScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="MasternodeAppairing"
        component={MasternodeAppairingScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="MasternodeWifiParams"
        component={MasternodeWifiParamsScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{
        title: '',
      }}/>
      <Stack.Screen name="CodeValidationDigit" component={CodeValidationDigitScreen} options={{
        title: '',
      }}/>
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{
        title: '',
      }}/>

    </Stack.Navigator>
  );
}





import axios from '../util/Api'
import AsyncStorage from '@react-native-community/async-storage';
import {DeviceEventEmitter} from 'react-native'

class AppContainer extends React.Component  {


  async componentDidMount() {
    const savedStateString = await AsyncStorage.getItem('NAVIGATION_STATE');
    const state = JSON.parse(savedStateString);

    const userToken = await AsyncStorage.getItem('userToken');
    if(userToken){
      this.props.login(userToken)
      axios.defaults.headers.common['Authorization'] = userToken;
      if(state && state.route && (state.route == 'MasternodeAppairing' || state.route == 'CodeValidation' || state.route == 'MasternodeWifiParams')){
        NavigatorService.navigate(state.route)
      }else{
        NavigatorService.navigate('Home')
      }

      DeviceEventEmitter.emit('reloadCentralInformations')

    }else{
      if(state && state.route){
        NavigatorService.navigate(state.route)
      }
    }

  }

  async componentWillReceiveProps(nextProps) {
    //console.log('received props')

  }


  render() {
    const user = this.props.user
    return (
      <NavigationContainer ref={navigatorRef => {
        NavigatorService.setContainer(navigatorRef);
      }}>

        <Drawer.Navigator
          initialRouteName="Home"
          options={{
            gestureEnabled:false,
            swipeEnabled: false
          }}
          drawerContent={(props) => <DrawerContainer {...props} />}>
            { user.is_authentified ?
              <Drawer.Screen name="Home" component={InAppStack} />
              :
                <Drawer.Screen name="Landing" component={LandingStack} options={{
                  gestureEnabled:false,
                  swipeEnabled: false
                }}/>
            }
        </Drawer.Navigator>
      </NavigationContainer>

    );
  }
}



function mapStateToProps(state) {
  return {
    common : state.common,
    user:state.user
  };
}


function mapDispatchToProps(dispatch) {
  return {
    hideError:message =>dispatch({type:'HIDE_MESSAGE'}),
    login: token => dispatch({type: 'LOGIN', token: token})
  /*  getUser:token => dispatch(getUser(token)),
    getSensors:token => dispatch(getSensors(token)),
    getMasterNodes:token => dispatch(getMasterNodes(token)),
    getSensorNodes: id_masternode => dispatch(getSensorNodes(id_masternode)),
    getWaitingSensorNodes: id_masternode => dispatch(getWaitingSensorNodes(id_masternode))*/
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
