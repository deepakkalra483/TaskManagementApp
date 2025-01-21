import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {
  RegulareText,
  screenHeight,
  SemiBoldText,
  Styles,
} from '../utils/AppConstants';
import {AppImages} from '../utils/AppImages';
import {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppColors} from '../utils/AppColors';
import ButtonView from '../components/ButtonView';
import AddPopUp from '../components/AddPopUp';
import {getUser} from '../service/AsyncStorageHelper';
import {
  addTask,
  DeleteTask,
  getTask,
  updateTask,
  updateTaskStatus,
} from '../service/Firebase';
import ShimmerView from '../components/ShimmerView';

const HomeScreen = props => {
  const user = props?.route?.params?.user;
  const [task, setTask] = useState([]);
  const [open, setOpne] = useState(false);
  const [taskItem, setTaskItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTask();
  }, []);

  const saveTask = data => {
    addTask(user?.userKey, data, response => {
      console.log('save atsk');
    });
  };

  const editTask = (id, data) => {
    updateTask(user?.userKey, id, data, () => {
      console.log('updated');
    });
  };

  const markComplete = id => {
    updateTaskStatus(user?.userKey, id, {status: 'complete'}, () => {
      console.log('updated');
    });
  };

  const removeTask = id => {
    DeleteTask(user?.userKey, id, () => {
      console.log('remove');
    });
  };

  const fetchTask = () => {
    getTask(user?.userKey, response => {
      if (response) {
        console.log('list---', response);
        // const parseData=JSON.parse(response)
        const taskArray = Object.keys(response).map(key => ({
          id: key,
          ...response[key],
        }));
        setTask(taskArray);
      }
    });
  };

  return (
    <View style={Styles.container}>
      <Header name={user?.name} />
      <AddPopUp
        visible={open}
        item={taskItem}
        onCancel={() => setOpne(false)}
        onSave={task => {
          saveTask(task);
          setOpne(false);
        }}
        onUpdate={task => {
          editTask(taskItem?.id, task);
          setOpne(false);
        }}
      />
      <SemiBoldText styles={{margin: 15, fontSize: 18}} text={'Your Task'} />
      {loading ? (
        Array.from({length: 3}).map(() => <ShimmerView />)
      ) : (
        <FlatList
          data={task}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 15}}
          renderItem={({item}) => (
            <TaskCell
              onPress={() => null}
              item={item}
              mark={() => markComplete(item?.id)}
              onEdit={() => {
                setTaskItem(item);
                setOpne();
              }}
              onDelete={() => removeTask(item?.id)}
            />
          )}
        />
      )}
      <ImageButton
        btnStyles={{
          height: 45,
          width: 45,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 30,
          right: 20,
          borderRadius: 35,
          padding: 1,
        }}
        onPress={() => {
          setTaskItem(null);
          setOpne(true);
        }}
        imgStyles={{height: 45, width: 45}}
        src={AppImages?.ADD_ICON}
      />
    </View>
  );
};
export default HomeScreen;

export const Header = props => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        style={{
          height: 40,
          width: 40,
          marginRight: 10,
          borderRadius: 30,
        }}
        source={AppImages.DEFAULT_PROFILE}
      />
      <View>
        <RegulareText text={'Hello'} styles={{fontSize: 12}} />
        <SemiBoldText text={props?.name} />
      </View>
    </View>
  );
};

export const TaskCell = props => {
  const item = props?.item;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        height: screenHeight / 3.7,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderColor: '#D4D4D4',
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 10,
        justifyContent: 'space-evenly',
        borderWidth: 1,
      }}
      onPress={props?.onPress}>
      <RightImageText
        src={AppImages.DUE_FLAG}
        text={`Due on ${item?.due}`}
        textStyles={{color: AppColors.BLUE_COLOR}}
      />
      <SemiBoldText text={item?.title} />
      <RegulareText
        numberOfLines={2}
        styles={{color: AppColors.LIGHT_TEXT, lineHeight: 22}}
        text={item?.description}
      />
      <View style={{flexDirection: 'row'}}>
        {/* <RightImageText src={AppImages.CALENDAR_ICON} text={'12 jan 2023'} /> */}
        {/* <RightImageText
          src={AppImages.DUE_FLAG}
          text={'Due on 14 jan 2023'}
          textStyles={{color: '#607D8B'}}
        /> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          right: 10,
          top: 10,
        }}>
        <ImageButton onPress={props?.onEdit} src={AppImages.EDIT_ICON} />
        <ImageButton onPress={props?.onDelete} src={AppImages?.DELETE_ICON} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CheckBox onPress={props?.mark} status={item?.status} />
        <ButtonView
          btnStyles={{
            paddingVertical: 7,
            width: '30%',
            alignSelf: 'flex-end',
            backgroundColor: item?.status == 'pending' ? '#F4B400' : '#34A853',
          }}
          text={item?.status}
        />
      </View>
    </TouchableOpacity>
  );
};

export const RightImageText = props => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}
      onPress={props?.onPress}>
      <Image
        style={{height: 15, width: 15, resizeMode: 'cover', marginRight: 7}}
        source={props?.src}
      />
      <RegulareText
        styles={{color: '#607D8B', fontSize: 12, ...props?.textStyles}}
        text={props?.text}
      />
    </TouchableOpacity>
  );
};

export const ImageButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#D4D4D4',
        borderWidth: 1,
        marginHorizontal: 5,
        ...props?.btnStyles,
      }}
      onPress={props?.onPress}>
      <Image
        source={props?.src}
        style={{
          height: 15,
          width: 15,
          resizeMode: 'contain',
          ...props?.imgStyles,
        }}
      />
    </TouchableOpacity>
  );
};

export const CheckBox = props => {
  const status = props?.status;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={props?.onPress}>
      <RegulareText
        styles={{fontSize: 12, color: AppColors.LIGHT_TEXT}}
        text={status == 'pending' ? 'Mark as complete' : 'completed'}
      />
      <View
        style={{
          height: 5,
          width: 15,
          borderColor: AppColors.MAIN_TEXT,
          backgroundColor:
            status == 'pending' ? AppColors.WHITE : AppColors.BLUE_COLOR,
          height: 15,
          borderRadius: 3,
          borderWidth: status == 'pending' ? 1 : 0,
          marginLeft: 5,
        }}></View>
    </TouchableOpacity>
  );
};
