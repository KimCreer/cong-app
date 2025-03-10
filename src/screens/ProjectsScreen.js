import React, { useRef } from "react";
import { 
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated 
} from "react-native";
import { Card, Button, Chip, ProgressBar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import projects from "../../projectsData"; // Import project data

export default function ProjectsScreen() {
    const navigation = useNavigation();
    
    // Animated scaling effect (useRef to persist value)
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <LinearGradient colors={["#001F3F", "#003366"]} style={styles.header}>
                <Icon name="clipboard-list" size={32} color="#ffffff" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Projects</Text>
            </LinearGradient>

            {/* Scrollable List of Projects */}
            <ScrollView style={styles.projectsContainer} showsVerticalScrollIndicator={false}>
                {projects.map((project) => (
                    <TouchableOpacity 
                        key={project.id} 
                        activeOpacity={0.9}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={() => navigation.navigate("ProjectDetails", { project })} // Fix navigation
                    >
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <Card style={styles.projectCard}>
                                <Card.Cover source={{ uri: project.image }} style={styles.projectImage} />
                                <Card.Content style={styles.cardContent}>
                                    {/* Category & Status Labels */}
                                    <View style={styles.row}>
                                        <Chip icon={project.icon} style={styles.categoryChip}>
                                            {project.category}
                                        </Chip>
                                        <Chip 
                                            style={[
                                                styles.statusChip,
                                                project.status === "Completed" 
                                                    ? styles.completedStatus 
                                                    : styles.ongoingStatus
                                            ]}
                                        >
                                            {project.status}
                                        </Chip>
                                    </View>

                                    {/* Title & Description */}
                                    <Text style={styles.projectTitle}>{project.title}</Text>
                                    <Text style={styles.projectDescription}>{project.description}</Text>

                                    {/* Progress Bar */}
                                    <View style={styles.progressContainer}>
                                        <ProgressBar 
                                            progress={project.progress} 
                                            color={project.status === "Completed" ? "#4CAF50" : "#FFC107"} 
                                            style={styles.progressBar}
                                        />
                                        <Text style={styles.progressText}>
                                            {Math.round(project.progress * 100)}% Completed
                                        </Text>
                                    </View>

                                    {/* Learn More Button */}
                                    <Button 
                                        mode="contained" 
                                        style={styles.learnMoreButton} 
                                        labelStyle={styles.learnMoreText}
                                        onPress={() => navigation.navigate("ProjectDetails", { project })}
                                    >
                                        Learn More
                                    </Button>
                                </Card.Content>
                            </Card>
                        </Animated.View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        paddingVertical: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        elevation: 6,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#ffffff",
    },
    projectsContainer: {
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    projectCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
        overflow: "hidden",
    },
    projectImage: {
        height: 190,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    cardContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    categoryChip: {
        backgroundColor: "#e3f2fd",
        fontSize: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    statusChip: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 16,
        fontWeight: "bold",
    },
    completedStatus: {
        backgroundColor: "#4CAF50",
        color: "#ffffff",
    },
    ongoingStatus: {
        backgroundColor: "#FFC107",
        color: "#000",
    },
    projectTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#003366",
        marginBottom: 6,
    },
    projectDescription: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
        marginBottom: 8,
    },
    progressContainer: {
        marginTop: 10,
    },
    progressBar: {
        height: 10,
        borderRadius: 6,
    },
    progressText: {
        fontSize: 13,
        color: "#444",
        textAlign: "right",
        marginTop: 5,
    },
    learnMoreButton: {
        marginTop: 15,
        backgroundColor: "#003366",
        borderRadius: 10,
        paddingVertical: 6,
    },
    learnMoreText: {
        fontSize: 15,
        fontWeight: "bold",
    },
});
