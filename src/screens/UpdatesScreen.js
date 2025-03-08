import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function UpdateScreen() {
    const [updates, setUpdates] = useState([
        { id: 1, title: "New Law Passed", description: "A new education reform bill has been signed into law.", date: "March 5, 2025" },
        { id: 2, title: "Infrastructure Project", description: "A new road-widening project is set to begin in April.", date: "March 3, 2025" },
        { id: 3, title: "Health Program", description: "Free medical check-ups available for senior citizens.", date: "February 28, 2025" },
    ]);

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Icon name="update" size={30} color="#ffffff" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Latest Updates</Text>
            </View>

            {/* Updates List */}
            <ScrollView style={styles.updateList} showsVerticalScrollIndicator={false}>
                {updates.map((update) => (
                    <Card key={update.id} style={styles.updateCard}>
                        <Card.Content>
                            <Text style={styles.updateTitle}>{update.title}</Text>
                            <Text style={styles.updateDescription}>{update.description}</Text>
                            <Text style={styles.updateDate}>{update.date}</Text>
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
        backgroundColor: "#0275d8",
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
    updateList: {
        padding: 15,
    },
    updateCard: {
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
    updateTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0275d8",
    },
    updateDescription: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
    updateDate: {
        fontSize: 12,
        color: "#888",
        marginTop: 5,
        fontStyle: "italic",
    },
});
