import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import TextInputComponent from "./components/TextInputComponent";
import FlatListComponent from "./components/FlatListComponent.js";

const addTask = () => {
  if (taskText.trim().length === 0) return;
  setTasks([...tasks, { id: Date.now().toString(), text: taskText, done: false }]);
  setTaskText("");
};



