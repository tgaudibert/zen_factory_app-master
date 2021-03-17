import { CommonActions, NavigationRoute } from '@react-navigation/native';
//import type { NavigationParams, NavigationRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@segment/analytics-react-native'


let _container; // eslint-disable-line

function setContainer(container: Object) {
  _container = container;
}

function goBack() {
  _container.dispatch(
    CommonActions.goBack()
  );
}

function navigate(routeName: string, params?: NavigationParams) {
  console.log(routeName)
  _container.dispatch(
    CommonActions.navigate({
      type: 'Navigation/NAVIGATE',
      name:routeName,
      params,
    }),
  );

  analytics.screen(routeName)


  const state = {
    route:routeName,
    date:Date.now()
  }
  AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state))
}


function push(routeName: string, params?: NavigationParams) {
  console.log("hello")
  _container.dispatch(
    CommonActions.push({
      routeName,
      params,
    }),
  );
}


function navigateDeep(actions: { routeName: string, params?: NavigationParams }[]) {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action): any =>
        CommonActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName: action.routeName,
          params: action.params,
          action: prevAction,
        }),
      undefined,
    ),
  );
}

function getCurrentRoute(): NavigationRoute | null {
  if (!_container || !_container.state.nav) {
    return null;
  }

  return _container.state.nav.routes[_container.state.nav.index] || null;
}

export default {
  setContainer,
  navigateDeep,
  navigate,
  goBack,
  getCurrentRoute,
  push,
};
