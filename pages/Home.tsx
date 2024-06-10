import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
//import LogoTitle from './imgs/logotitle.svg';   <LogoTitle width={200} height={50} style={styles.logo} />;

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const Home: React.FC<Props> = ({navigation}) => {
  return (
    <LinearGradient colors={['#FFFFFF', '#007ACC']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Legal Eyes</Text>
        <Button
          title="Scan Document"
          onPress={() => navigation.navigate('DocumentScanner')}
          color="#FFD700"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#333333',
    marginBottom: 20,
  },
});

export default Home;
