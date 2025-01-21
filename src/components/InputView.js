import {TextInput} from 'react-native';
import {AppColors} from '../utils/AppColors';

const InputView = props => {
  return (
    <TextInput
      style={{
        backgroundColor: '#fff',
        width: '90%',
        marginHorizontal: 15,
        borderRadius: 10,
        paddingLeft: 10,
        textAlignVertical:'top',
        color:'#000',
        ...props?.styles
      }}
      multiline
      defaultValue={props?.defaultValue}
      keyboardType={props?.keyboardType}
      placeholder={props?.placeholder}
      onChangeText={props?.onChangeText}
      placeholderTextColor={AppColors?.LIGHT_TEXT}
    />
  );
};
export default InputView;
