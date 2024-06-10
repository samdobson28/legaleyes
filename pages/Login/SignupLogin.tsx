import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text, Alert} from 'react-native';
import {useAuth} from './AuthContext';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../NavigationTypes';

const SignupLogin = () => {
  const {login} = useAuth();
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, username, password}),
      });

      const responseText = await response.text();
      if (!response.ok) {
        Alert.alert('Error during signup', responseText);
        return;
      }

      try {
        const user = JSON.parse(responseText);
        login(user);
        Alert.alert('Signup Successful', 'You are now logged in!');
        navigation.navigate('Home');
      } catch (error) {
        console.error('JSON parse error:', error);
        Alert.alert('Signup Error', 'Invalid server response');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error during signup:', error.message);
        Alert.alert('Signup Error', error.message);
      } else {
        console.error('Unknown error during signup:', error);
        Alert.alert('Signup Error', 'An unknown error occurred');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });

      const responseText = await response.text();
      if (!response.ok) {
        Alert.alert('Login Failed', responseText);
        return;
      }

      try {
        const user = JSON.parse(responseText);
        login(user);
        Alert.alert('Login Successful', 'You are now logged in!');
        navigation.navigate('Home');
      } catch (error) {
        console.error('JSON parse error:', error);
        Alert.alert('Login Error', 'Invalid server response');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error during login:', error.message);
        Alert.alert('Login Error', error.message);
      } else {
        console.error('Unknown error during login:', error);
        Alert.alert('Login Error', 'An unknown error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isLogin ? 'Login' : 'Sign Up'}
        onPress={isLogin ? handleLogin : handleSignup}
      />
      <Text style={styles.switch} onPress={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don't have an account? Sign Up"
          : 'Already have an account? Login'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  switch: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});

export default SignupLogin;
