import React from 'react';
import {
  StatusBar,
} from 'react-native';

import MainScreen from './src/screens/MainScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MainScreen></MainScreen>
    </>
  );
};

export default App;
