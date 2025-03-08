import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProjectsScreen() {
    // Example list of projects
    const projects = [
        {
            id: 1,
            title: "Community Health Program",
            description: "Provides free medical checkups and health awareness seminars.",
            image: "https://source.unsplash.com/400x300/?health,clinic",
        },
        {
            id: 2,
            title: "Scholarship for Students",
            description: "A scholarship program aimed at helping underprivileged students.",
            image: "https://source.unsplash.com/400x300/?education,school",
        },
        {
            id: 3,
            title: "Road Infrastructure Development",
            description: "Improving roads and bridges for safer and better transport.",
            image: "https://source.unsplash.com/400x300/?road,construction",
        },
        {
            id: 4,
            title: "Environmental Awareness Campaign",
            description: "A campaign focused on clean-up drives and tree planting activities.",
            image: "https://source.unsplash.com/400x300/?environment,trees",
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Icon name="clipboard-list" size={30} color="#ffffff" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Projects</Text>
            </View>

            {/* Scrollable List of Projects */}
            <ScrollView style={styles.projectsContainer} showsVerticalScrollIndicator={false}>
                {projects.map((project) => (
                    <Card key={project.id} style={styles.projectCard}>
                        <Card.Cover source={{ uri: project.image }} style={styles.projectImage} />
                        <Card.Content>
                            <Text style={styles.projectTitle}>{project.title}</Text>
                            <Text style={styles.projectDescription}>{project.description}</Text>
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
        backgroundColor: "#003366",
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
    projectsContainer: {
        padding: 15,
    },
    projectCard: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    projectImage: {
        height: 150,
    },
    projectTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#003366",
        marginTop: 8,
    },
    projectDescription: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
});
