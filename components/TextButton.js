import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { purple } from '../utils/colors';

export default function TextButton({
  children,
  onPress,
  disabled,
  style = {},
}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={[styles.deleteBtn, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteBtn: {
    textAlign: 'center',
    color: purple,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
