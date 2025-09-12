import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextInputComponent from "./components/TextInputComponent";
import FlatListComponent from "./components/FlatListComponent";
import TouchableOpacityComponent from "./components/TouchableOpacityComponent";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (text.trim().length === 0) return;
    setTasks([...tasks, { id: Date.now().toString(), text, done: false }]);
    setText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>

      <View style={styles.addContainer}>
        <TextInputComponent
          value={text}
          onChangeText={setText}
          placeholder="Insira uma Task"
        />

        <TouchableOpacityComponent text="Adicionar" onPress={addTask} />
      </View>

      <View style={styles.listContainer}>
        {tasks.length > 0 && <FlatListComponent tasks={tasks} setTasks={setTasks} />}

        {tasks.length == 0 && <Text>Insira a Primeira Task</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#c71414ff",
    alignSelf: "center",
  },
  addContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    overflow: "auto",
  },
});
