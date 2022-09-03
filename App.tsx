import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {Navigator} from './src/navigator/Navigator';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Tabs } from './src/navigator/Tabs';
import { styles } from './src/theme/appTheme';
styles
const App = () => {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
      {/* <Navigator /> */}
      <Tabs/>
    </NavigationContainer>
  );
};

export default App;
