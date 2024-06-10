import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './pages/NavigationTypes';
import {View, ActivityIndicator} from 'react-native';

import Home from './pages/Home';
import DocumentScanner from './pages/DocumentScanner';
import SignupLogin from './pages/Login/SignupLogin';
import {AuthProvider, useAuth} from './pages/Login/AuthContext';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const {user, isLoading} = useAuth();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={user ? 'Home' : 'SignupLogin'}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SignupLogin" component={SignupLogin} />
      <Stack.Screen name="DocumentScanner" component={DocumentScanner} />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
