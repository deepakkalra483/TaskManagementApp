import {Modal, TouchableOpacity, View} from 'react-native';
import InputView from './InputView';
import {ImageButton, RightImageText} from '../screens/HomeScreen';
import {AppImages} from '../utils/AppImages';
import {RegulareText} from '../utils/AppConstants';
import ButtonView from './ButtonView';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';

const AddPopUp = props => {
  const item = props?.item;
  console.log('item--', item);
  const [title, setTitle] = useState(item?.title);
  const [description, setDescription] = useState(item?.description);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  let DateStrng =
    item?.due ||
    date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  return (
    <Modal visible={props?.visible} transparent>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          paddingHorizontal: 15,
        }}
        >
        <View style={{flex: 0.5, backgroundColor: '#fff', borderRadius: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <InputView
              styles={{
                fontWeight: 500,
                fontSize: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#D4D4D4',
                flex: 1,
              }}
              defaultValue={item?.title}
              placeholder={'What to do'}
              onChangeText={i => setTitle(i)}
            />
            <ImageButton
              btnStyles={{height: 40, width: 40, borderWidth: 0, marginTop: 5}}
              src={AppImages?.CLOSE_ICON}
              onPress={props?.onCancel}
            />
          </View>
          <InputView
            styles={{
              borderWidth: 1,
              borderBottomColor: '#D4D4D4',
              flex: 1,
              marginTop: 10,
            }}
            placeholder={'Task..'}
            defaultValue={item?.description}
            onChangeText={i => setDescription(i)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
              paddingHorizontal: 15,
            }}>
            <RightImageText
              text={`due on ${item?.due || DateStrng}`}
              src={AppImages.CALENDAR_ICON}
              onPress={() => setOpen(true)}
            />
            <ButtonView
              btnStyles={{width: '40%', paddingVertical: 10}}
              text={item ? 'Update' : 'Save'}
              onPress={() => {
                const task = {
                  title: title,
                  description: description,
                  due: DateStrng,
                  status: 'pending',
                };
                item ? props?.onUpdate(task) : props?.onSave(task);
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddPopUp;
