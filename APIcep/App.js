// App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import ApiCep from './components/ApiCep';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ApiCep />
    </SafeAreaView>
  );
};

export default App;
