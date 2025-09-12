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
    borderWidth: 1,
    borderColor: "#c71414ff",
    borderRadius: 5,
  },
});
