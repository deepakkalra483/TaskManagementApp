import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import {USER} from './AsyncStorageHelper';
import {Alert} from 'react-native';

export const getTask = (key, onSuccess) => {
  const taskRef = database().ref(`/user/${key}/tasks`);

  const onValueChange = taskRef.on('value', snapshot => {
    if (snapshot.exists()) {
      onSuccess(snapshot.val());
      console.log('User data updated: ', snapshot.val());
    } else {
      onSuccess(null); // Handle case when data is null
      console.log('No tasks found.');
    }
  });

  // Return a function to unsubscribe the listener
  return () => taskRef.off('value', onValueChange);
};

export const AddUser = (user, onSuccess, onFailure) => {
  const newReference = database().ref('/user').push();
  const userKey = newReference.key;
  console.log('userKey--', userKey);
  const Data = {...user, ...{userKey: userKey}};
  newReference
    .set(user)
    .then(() => {
      console.log('setdata');
      AsyncStorage.setItem(USER, JSON.stringify(Data))
        .then(() => {
          onSuccess(Data);
        })
        .catch(erro => {
          console.log('error', erro);
        });
    })
    .catch(error => {
      Alert.alert(error);
    });
};

export const addTask = (key, data, onSuccess) => {
  const newReference = database().ref(`/user/${key}/tasks`).push();
  newReference
    .set(data)
    .then(() => onSuccess())
    .catch(error => Alert.alert(error));
};

export const updateTask = (key, id, data, onSuccess) => {
  database()
    .ref(`user/${key}/tasks/${id}`)
    .update(data)
    .then(() => onSuccess())
    .catch(error => Alert.alert(error));
};

export const updateTaskStatus = (key, id, data, onSuccess) => {
  database()
    .ref(`user/${key}/tasks/${id}`)
    .update(data)
    .then(() => onSuccess())
    .catch(error => Alert.alert(error));
};

export const DeleteTask = (key, id, onSuccess) => {
  database()
    .ref(`user/${key}/tasks/${id}`)
    .remove()
    .then(() => onSuccess())
    .catch(error => Alert.alert(error));
};
