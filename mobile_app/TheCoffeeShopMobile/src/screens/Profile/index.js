import 'react-native-gesture-handler';
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Modal,
  Picker,
} from 'react-native';
import {Avatar, Card, Input, Icon} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Profile = () => {
  const [search, setsearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const drawer = useRef(null);
  const ProfileTag = ({iconP, titleP, dcrP}) => (
    <View
      style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
      <View
        style={{
          height: 85,
          width: '90%',

          backgroundColor: 'white',

          shadowColor: 'grey',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,

          borderRadius: 5,

          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
        }}>
        <FontAwesome5
          style={{color: 'white', fontSize: 32, color: '#4b5d53'}}
          // name={'calendar-week'}
          name={iconP}
          solid
        />
        <View
          style={{
            height: '100%',
            width: '85%',
            paddingLeft: 40,

            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20}}>{titleP}</Text>
          <Text style={{color: 'grey'}}>{dcrP}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '90%',
              height: 450,
              backgroundColor: 'white',

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,

              paddingTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <FontAwesome5
                  style={{
                    color: 'grey',
                    fontSize: 15,
                    textAlign: 'left',
                    marginLeft: 20,
                    marginRight: 40,
                  }}
                  name={'arrow-left'}
                  solid
                />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'grey',
                  fontWeight: 'bold',
                }}>
                {'Cập nhật thông tin'}
              </Text>
            </View>
            <ScrollView>
              <Card>
                <Card.Title style={{textAlign: 'left', fontSize: 18}}>
                  {'Họ và tên'}
                </Card.Title>
                <Card.Divider />
                <Input placeholder="Phan Đăng Trung" />
                <Card.Divider />
                <Card.Title style={{textAlign: 'left', fontSize: 18}}>
                  {'Ngày sinh'}
                </Card.Title>
                <Card.Divider />
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '25%'}}>
                    <Input keyboardType="numeric" placeholder="01" />
                  </View>
                  <Text style={{fontSize: 20, paddingTop: 10, color: 'grey'}}>
                    {'/'}
                  </Text>
                  <View style={{width: '25%'}}>
                    <Input keyboardType="numeric" placeholder="01" />
                  </View>
                  <Text style={{fontSize: 20, paddingTop: 10, color: 'grey'}}>
                    {'/'}
                  </Text>
                  <View style={{width: '30%'}}>
                    <Input keyboardType="numeric" placeholder="19999" />
                  </View>
                </View>

                <Card.Divider />
                <Card.Title style={{textAlign: 'left', fontSize: 18}}>
                  {'Số điện thoại'}
                </Card.Title>
                <Card.Divider />
                <Input placeholder="0566439754" />
                <Card.Divider />
                <Card.Title style={{textAlign: 'left', fontSize: 18}}>
                  {'Giới tính'}
                </Card.Title>
                <Card.Divider />
                <Picker
                  // selectedValue={selectedValue}
                  style={{height: 50, width: 150}}
                  // onValueChange={(itemValue, itemIndex) =>
                  //   setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Nam" value="java" />
                  <Picker.Item label="Nữ" value="js" />
                  <Picker.Item label="Khác" value="js" />
                </Picker>
              </Card>
            </ScrollView>

            <Button title="Cập nhật" color="#4a5d54" />
          </View>
        </View>
      </Modal>

      <View
        style={{
          height: 140,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',

            backgroundColor: '#4b5d53',
            height: 100,
          }}>
          <Avatar
            rounded
            source={{
              uri: 'https://img.icons8.com/bubbles/2x/user-male.png',
            }}
            containerStyle={{
              width: 150,
              height: 150,
            }}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>
          {'Trung Phan'}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 5}}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome5
              style={{color: 'white', fontSize: 15, color: '#4b5d53'}}
              name={'edit'}
              solid
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          color: 'grey',
          fontStyle: 'italic',
        }}>
        {'kaitrung99@gmail.com'}
      </Text>
      <View style={{flexDirection: 'column', paddingTop: 20}}>
        <View style={{marginBottom: 20}}>
          <ProfileTag
            iconP="calendar-week"
            titleP="Ngày sinh"
            dcrP="01/01/1999"
          />
        </View>
        <View style={{marginBottom: 20}}>
          <ProfileTag iconP="phone" titleP="Số điện thoại" dcrP="0566439754" />
        </View>
        <View style={{marginBottom: 20}}>
          <ProfileTag iconP="venus-mars" titleP="Giới tính" dcrP="Nam" />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Profile;
