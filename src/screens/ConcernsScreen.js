import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ConcernsScreen() {
    const [concerns, setConcerns] = useState([
        { id: 1, title: "Road Repair Needed", description: "There are potholes in our area that need fixing." },
        { id: 2, title: "Garbage Collection Issue", description: "Garbage trucks haven’t picked up waste for 3 days." },
    ]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        if (!title || !description) {
            Alert.alert("Missing Fields", "Please enter both title and description.");
            return;
        }
        const newConcern = {
            id: concerns.length + 1,
            title,
            description,
        };
        setConcerns([...concerns, newConcern]);
        setTitle("");
        setDescription("");
        Alert.alert("Concern Submitted", "Your concern has been recorded.");
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Icon name="alert-circle" size={30} color="#ffffff" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Concerns</Text>
            </View>

            {/* Concern Submission Form */}
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Concern Title"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describe your concern..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit Concern</Text>
                </TouchableOpacity>
            </View>

            {/* List of Concerns */}
            <ScrollView style={styles.concernList} showsVerticalScrollIndicator={false}>
                {concerns.map((concern) => (
                    <Card key={concern.id} style={styles.concernCard}>
                        <Card.Content>
                            <Text style={styles.concernTitle}>{concern.title}</Text>
                            <Text style={styles.concernDescription}>{concern.description}</Text>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    header: {
        backgroundColor: "#d9534f",
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    headerIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ffffff",
    },
    formContainer: {
        padding: 15,
    },
    input: {
        backgroundColor: "#ffffff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 16,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    submitButton: {
        backgroundColor: "#d9534f",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 5,
    },
    submitButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    concernList: {
        padding: 15,
    },
    concernCard: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        padding: 10,
    },
    concernTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#d9534f",
    },
    concernDescription: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
});
