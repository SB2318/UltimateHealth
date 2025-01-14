import React from 'react';
import {View, Text} from 'react-native';
import {ReportScreenProp} from '../../type';
import {PRIMARY_COLOR} from '../../helper/Theme';

export default function ReportScreen({navigation, route}: ReportScreenProp) {

  const {articleId, commentId, authorId} = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 18, color: 'white'}}>Report Screen</Text>
      <Text style={{fontSize: 18, color: 'white'}}>CommentId:{commentId}</Text>
    </View>
  );
}
