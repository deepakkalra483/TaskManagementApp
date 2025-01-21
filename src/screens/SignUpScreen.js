import {Dimensions, Image, StatusBar, View} from 'react-native';
import {AppColors} from '../utils/AppColors';
import {AppImages} from '../utils/AppImages';
import {SemiBoldText, ShowMessage} from '../utils/AppConstants';
import InputView from '../components/InputView';
import {useState} from 'react';
import ButtonView from '../components/ButtonView';
import * as RootNavigation from '../utils/RootNavigation';
import {AppScreens} from '../utils/AppScreens';
import {AddUser} from '../service/Firebase';
import {showMessage} from 'react-native-flash-message';

const SignUpScreen = props => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);

  const createAccount = () => {
    if (name) {
      setLoading(true);
      console.log('call');
      // return
      AddUser({name: name}, res => {
        console.log('succeess');
        RootNavigation.forcePush(props, AppScreens.HOME_SCREEN, {user: res});
        setLoading(false);
      });
    } else {
      console.log('eror')
       ShowMessage('Please Enter Name')
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.BACKGROUND_COLOR,
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 0.7,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <SemiBoldText styles={{fontSize: 20}} text={'Welcome!'} />
        <Image
          style={{
            height: screenHeight / 4,
            width: screenWidth,
            resizeMode: 'contain',
          }}
          source={AppImages.WELCOME_AVTAR}
        />
        <InputView placeholder={'Full Name'} onChangeText={i => setName(i)} />
        <ButtonView onPress={createAccount} text={'Next'} loading={loading} />
      </View>
    </View>
  );
};

export default SignUpScreen;
