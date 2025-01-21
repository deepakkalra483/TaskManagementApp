import {Image, View} from 'react-native';
import {
  screenHeight,
  screenWidth,
  SemiBoldText,
  Styles,
} from '../utils/AppConstants';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from '../utils/RootNavigation';
import {AppScreens} from '../utils/AppScreens';
import {getUser} from '../service/AsyncStorageHelper';
import {AppImages} from '../utils/AppImages';

const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      getUser(res => {
        if (res) {
          RootNavigation.forcePush(props, AppScreens.HOME_SCREEN, {user: res});
        } else {
          RootNavigation.forcePush(props, AppScreens.SIGN_UP_SCREEN);
        }
      });
    }, 1000);
  }, []);
  return (
    <View
      style={[
        Styles.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <Image
        style={{
          height: screenHeight / 4,
          width: screenWidth,
          resizeMode: 'contain',
        }}
        source={AppImages.SPLASH_AVTAR}
      />
      <SemiBoldText text={'Get things done with TODo'} />
    </View>
  );
};
export default SplashScreen;
