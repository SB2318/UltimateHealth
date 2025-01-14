import React from 'react';
import {View, Text} from 'react-native';
import {ReportConfirmationScreenProp} from '../../type';

export default function ReportConfirmationScreen({
  navigation,
  route,
}: ReportConfirmationScreenProp) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 18, color: 'white'}}>
        Report Confirmation Screen
      </Text>
    </View>
  );
}
