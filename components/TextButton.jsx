import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { purple } from '../utils/colors';

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.deleteBtn, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteBtn: {
    textAlign: 'center',
    color: purple,
  },
});
