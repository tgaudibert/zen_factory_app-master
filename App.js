import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppContainer from './src/navigation/AppNavigation';

import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance

import codePush from "react-native-code-push";

import {
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import en from "./src/translations/en.json";
import fr from "./src/translations/fr.json";

const data = {
  fr,
  en
};
const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)

  en: () => en,
  fr: () => fr
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;
  console.log('------LANGUAGE TAG-----')
  console.log(languageTag)

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};



class App extends React.Component  {

  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config
  }

  componentDidMount() {
    console.log(RNLocalize.getLocales()[0].languageCode)
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };


  render() {
    return (
      <Provider store={store}>
            <AppContainer/>
      </Provider>
    );
  }
}

export default App = codePush(App);
/*


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
*/
