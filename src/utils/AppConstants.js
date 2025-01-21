import {Dimensions, StyleSheet, Text} from 'react-native';
import {AppColors} from './AppColors';
import { showMessage } from 'react-native-flash-message';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const SemiBoldText = props => {
  return (
    <Text
      style={{
        fontSize: 16,
        fontWeight: 600,
        color: AppColors.MAIN_TEXT,
        ...props?.styles,
      }}>
      {props?.text}
    </Text>
  );
};

export const RegulareText = props => {
  return (
    <Text 
    numberOfLines={props?.numberOfLines}
    style={{fontSize: 16, color: AppColors.MAIN_TEXT, ...props?.styles}}>
      {props?.text}
    </Text>
  );
};

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND_COLOR,
  },
});

export const ShowMessage=(messaage)=>{
   showMessage({
     message:messaage,
     color:'#fff'
   })
}
