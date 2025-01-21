import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppScreens} from './AppScreens';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import {StatusBar} from 'react-native';
import {AppColors} from './AppColors';
import SplashScreen from '../screens/SplashScreen';

const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={AppColors.BACKGROUND_COLOR}
      />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={AppScreens.SPLASH_SCREEN}
          component={SplashScreen}
        />
        <Stack.Screen
          name={AppScreens.SIGN_UP_SCREEN}
          component={SignUpScreen}
        />
        <Stack.Screen name={AppScreens.HOME_SCREEN} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current.navigate(name, params);
}

export function forcePush(props, screen, data) {
  props?.navigation?.reset({
    index: 0,
    routes: [{name: screen, params: data}],
  });
}
