import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function TextInputComponent({ value, onChangeText, placeholder }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "white",
    shadowRadius: 2,
    elevation: 2,
  },
});
