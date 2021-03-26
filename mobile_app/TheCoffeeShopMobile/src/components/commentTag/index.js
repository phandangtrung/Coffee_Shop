import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Avatar, Card, Input, Icon, Rating} from 'react-native-elements';
const CommentTag = (props) => {
  return (
    <View style={{paddingTop: 5, paddingBottom: 5}}>
      <View
        style={{
          width: '100%',
          height: 50,
          borderRadius: 20,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,

          flexDirection: 'row',
          alignItems: 'center',

          paddingLeft: 10,
        }}>
        <Avatar
          rounded
          source={{
            uri: 'https://img.icons8.com/bubbles/2x/user-male.png',
          }}
          containerStyle={{
            width: 40,
            height: 40,
          }}
        />
        <View style={{paddingLeft: 10, width: 100}}>
          <Text style={{fontSize: 17}}>{props.accname}</Text>
          <Text style={{fontStyle: 'italic', color: 'grey'}}>
            {props.cmmdate}
          </Text>
        </View>
        <View style={{paddingLeft: 20}}>
          <Rating
            type="heart"
            showRating={false}
            // onFinishRating={this.ratingCompleted}
            style={{paddingVertical: 10}}
            imageSize={25}
            defaultRating={4}
          />
        </View>
      </View>
    </View>
  );
};
export default CommentTag;
