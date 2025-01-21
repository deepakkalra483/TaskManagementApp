import FlashMessage from 'react-native-flash-message';
import RootNavigation from './src/utils/RootNavigation';
import {Platform} from 'react-native';
import {AppColors} from './src/utils/AppColors';

const App = () => {
  return (
    <>
      <FlashMessage
        position={'top'}
        statusBarHeight={0}
        style={{
          backgroundColor: AppColors.BLUE_COLOR,
          marginHorizontal: 15,
          borderRadius: 15,
          marginTop:10
        }}
      />
      <RootNavigation />
    </>
  );
};
export default App;
