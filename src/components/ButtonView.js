import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {AppColors} from '../utils/AppColors';

const ButtonView = props => {
  return (
    <TouchableOpacity
    activeOpacity={0.9}
      style={{
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor:AppColors.BLUE_COLOR,
        borderRadius:5,
        ...props?.btnStyles
      }}onPress={props?.onPress}>
     {props?.loading?
     (
       <ActivityIndicator size={30} color={AppColors.WHITE}/>
     ):
      <Text style={{color: AppColors.WHITE}}>{props?.text}</Text>}
    </TouchableOpacity>
  );
};

export default ButtonView