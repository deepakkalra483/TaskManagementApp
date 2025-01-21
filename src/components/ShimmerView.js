import {View} from 'react-native';
import {screenHeight, screenWidth} from '../utils/AppConstants';
import Shimmer from 'react-native-shimmer';
import {AppColors} from '../utils/AppColors';

const ShimmerView = () => {
  return (
    <View
      style={{
        height: screenHeight / 3.7,
        width: screenWidth - 30,
        backgroundColor: '#d3d3d3',
        marginHorizontal: 15,
        padding: 15,
        borderRadius: 15,
        marginBottom:15
      }}>
      <Shimmer
        style={{
          opacity: 0.9,
          borderRadius: 15,
        }}>
        <View
          style={{
            height: 30,
            borderRadius: 15,
            backgroundColor: '#fafafa',
            width: '30%',
          }}></View>
      </Shimmer>
      <Shimmer
        style={{
          opacity: 0.9,
          borderRadius: 15,
          marginTop: 15,
        }}>
        <View
          style={{
            height: 30,
            borderRadius: 15,
            backgroundColor: '#fafafa',
          }}></View>
      </Shimmer>
      <Shimmer
        style={{
          opacity: 0.9,
          borderRadius: 15,
          marginTop: 15,
        }}>
        <View
          style={{
            height: 45,
            borderRadius: 15,
            backgroundColor: '#fafafa',
          }}></View>
      </Shimmer>
      <View
      style={{flexDirection:'row',justifyContent:'center'}}>
       <Shimmer
        style={{
          opacity: 0.9,
          borderRadius: 15,
        }}>
        <View
          style={{
            height: 30,
            borderRadius: 15,
            backgroundColor: '#fafafa',
            width: '30%',
          }}></View>
      </Shimmer>
      </View>
    </View>
  );
};

export default ShimmerView;
