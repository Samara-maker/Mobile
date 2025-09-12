import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import ModalComponent from "./ModalComponent";
import TouchableOpacityComponent from "./TouchableOpacityComponent";
import TextInputComponent from "./TextInputComponent";

export default function FlatListComponent({ tasks, setTasks }) {
    const [filter, setFilter] = useState(null);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editText, setEditText] = useState("");
    const [deleteTaskId, setDeleteTaskId] = useState(null);

    const filteredTasks = tasks.filter((task) => {
        if (filter === null) return true;
        return task.done === filter;
    });

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
        );
    };

    const saveEdit = () => {
        setTasks((prev) =>
            prev.map((task) => (task.id === editTaskId ? { ...task, text: editText } : task))
        );
        setEditTaskId(null);
        setEditText("");
    };

    const deleteTask = () => {
        setTasks((prev) => prev.filter((task) => task.id !== deleteTaskId));
        setDeleteTaskId(null);
    };

    return (
        <View style={{ flex: 1, width: "100%" }}>
            <View style={styles.filterContainer}>
                {["Todas", "Pendentes", "Concluídas"].map((label, id) => {



                    let value;
                    if (id === 0) value = null;
                    else if (id === 1) value = false;
                    else value = true;


                    return (
                        <TouchableOpacityComponent
                            key={label}
                            onPress={() => setFilter(value)}
                            text={label}
                            hexColor="#E0E0E0"
                            hexTextColor="#333"
                        />
                    );
                })}
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.taskItem, item.done && styles.doneTask]}>
                        <TouchableOpacity style={styles.checkbox} onPress={() => toggleTask(item.id)}>
                            <Text style={styles.checkboxText}>{item.done ? "✔" : ""}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.taskText, item.done && styles.doneTaskText]}>{item.text}</Text>


                        <View style={{ gap: 4, flexDirection: 'row', alignItems: "center" }}>


                            <TouchableOpacityComponent
                                style={styles.editButton}
                                onPress={() => {
                                    setEditTaskId(item.id);
                                    setEditText(item.text);
                                }}
                                text={'✏'}
                                hexColor="#FFA500"
                            />



                            <TouchableOpacityComponent
                                onPress={() => setDeleteTaskId(item.id)}
                                text={'🗑'}
                                hexColor="#FF4C4C"
                            />
                        </View>

                    </View>
                )}
            />

            <ModalComponent
                visible={editTaskId !== null}
                title="Editar Tarefa"
                onClose={() => setEditTaskId(null)}
                onConfirm={saveEdit}
                confirmText="Salvar"
            >
                <TextInputComponent
                    value={editText}
                    onChangeText={setEditText}
                />
            </ModalComponent>

            <ModalComponent
                visible={deleteTaskId !== null}
                title="Excluir Tarefa"
                onClose={() => setDeleteTaskId(null)}
                onConfirm={deleteTask}
                confirmText="Excluir"
                confirmButtonColor="red"
            >
                <Text>Tem certeza que deseja excluir esta tarefa?</Text>
            </ModalComponent>
        </View>
    );
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 10,
        marginBottom: 10,
    },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#e0e0e0",
        borderRadius: 6,
    },
    activeFilter: {
        backgroundColor: "#c71414ff",
    },
    filterText: {
        color: "#000",
        fontWeight: "bold",
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#c71414ff",
        borderRadius: 6,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxText: {
        color: "#c71414ff",
        fontWeight: "bold",
        fontSize: 14,
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    doneTask: {
        backgroundColor: "#d1ffd6",
    },
    doneTaskText: {
        textDecorationLine: "line-through",
        color: "#666",
    },

});
