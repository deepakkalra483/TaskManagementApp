import AsyncStorage from '@react-native-community/async-storage';

export const getUser = onSuccess => {
  AsyncStorage.getItem(USER)
    .then(res => {
      const parsedData=JSON.parse(res)
      onSuccess(parsedData);
    })
    .catch(error => {
      onFailure(error);
    });
};

export const USER = 'user';
