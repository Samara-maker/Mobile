import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import TouchableOpacityComponent from "./TouchableOpacityComponent";

export default function ModalComponent({
    visible,
    title,
    children,
    onClose,
    onConfirm,
    confirmText = "Salvar",
    cancelText = "Cancelar",
    confirmButtonColor = "#c71414ff",
}) {
    return (
        <Modal visible={visible} transparent >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    {title && <Text style={styles.title}>{title}</Text>}

                    <View style={styles.content}>{children}</View>

                    <View style={styles.footer}>

                        <View style={{ flex: 1, flexDirection: 'column' }}>

                            <TouchableOpacityComponent onPress={onClose} text={cancelText} />

                            {onConfirm && (
                                <TouchableOpacityComponent
                                    onPress={onConfirm}
                                    text={confirmText}
                                />

                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        width: "80%",
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#c71414ff",
        textAlign: "center",
    },
    content: {
        marginBottom: 20,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
