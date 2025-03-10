import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share, Dimensions } from "react-native";
import { Button, Chip, ProgressBar, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Carousel from "react-native-reanimated-carousel";
import relatedProjects from "../../projectsData";

const { width } = Dimensions.get("window");

export default function ProjectDetailsScreen({ route, navigation }) {
    const { project } = route.params;

    const handleShare = async () => {
        try {
            await Share.share({
                message: `${project.title}\n${project.description}\nProgress: ${Math.round(project.progress * 100)}% Completed`,
            });
        } catch (error) {
            console.error("Error sharing project:", error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Top Static Image */}
            <Image source={{ uri: project.image }} style={styles.topImage} />

            {/* Image Carousel */}
            {project.images && project.images.length > 0 ? (
                <Carousel
                    loop
                    width={width * 0.9}
                    height={200}
                    data={project.images}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                />
            ) : (
                <Text style={styles.noImageText}>No additional images available</Text>
            )}

            {/* Title */}
            <Text style={styles.title}>{project.title}</Text>

            {/* Category & Status */}
            <View style={styles.row}>
                <Chip style={styles.categoryChip}>
                    <Icon name={project.icon} size={16} color="#003366" /> {project.category}
                </Chip>
                <Chip style={[styles.statusChip, project.status === "Completed" ? styles.completed : styles.ongoing]}>
                    {project.status}
                </Chip>
            </View>
{/* Additional Project Details */}
<View style={styles.detailContainer}>
    <View style={styles.detailRow}>
        <Icon name="map-marker" size={18} color="#003366" />
        <Text style={styles.detailText}> Location: {project.location || "Not specified"}</Text>
    </View>
    <View style={styles.detailRow}>
        <Icon name="cash" size={18} color="#003366" />
        <Text style={styles.detailText}> Budget: {project.budget ? `${project.budget.toLocaleString()}` : "Not specified"}</Text>
    </View>
    <View style={styles.detailRow}>
        <Icon name="account-group" size={18} color="#003366" />
        <Text style={styles.detailText}>
            {" "}
            Stakeholders: {Array.isArray(project.stakeholders) && project.stakeholders.length > 0
                ? project.stakeholders.join(", ")
                : "Not specified"}
        </Text>
    </View>
</View>

            {/* Description */}
            <Text style={styles.description}>{project.description}</Text>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <ProgressBar progress={project.progress} color={project.status === "Completed" ? "#4CAF50" : "#FFC107"} style={styles.progressBar} />
                <Text style={styles.progressText}>{Math.round(project.progress * 100)}% Completed</Text>
            </View>

            {/* Share & Back Buttons */}
            <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={handleShare} style={styles.shareButton}>
                    Share Project
                </Button>
                <Button mode="contained" onPress={() => navigation.goBack()} style={styles.backButton}>
                    Back to Projects
                </Button>
            </View>

            {/* Related Projects */}
            <Text style={styles.relatedTitle}>Related Projects</Text>
            {relatedProjects.filter(p => p.id !== project.id).slice(0, 3).map(related => (
                <TouchableOpacity key={related.id} onPress={() => navigation.push("ProjectDetails", { project: related })}>
                    <Card style={styles.relatedCard}>
                        <Card.Cover source={{ uri: related.image }} style={styles.relatedImage} />
                        <Card.Content>
                            <Text style={styles.relatedTitle}>{related.title}</Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 15,
    },
    topImage: {
        width: "100%",
        height: 250,
        borderRadius: 10,
        marginBottom: 15,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    noImageText: {
        textAlign: "center",
        fontSize: 14,
        color: "#888",
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#003366",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    categoryChip: {
        backgroundColor: "#e3f2fd",
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
        fontWeight: "bold",
        color: "#003366",
    },
    statusChip: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    completed: {
        backgroundColor: "#4CAF50",
        color: "#ffffff",
    },
    ongoing: {
        backgroundColor: "#FFC107",
        color: "#000",
    },
    detailContainer: {
        marginVertical: 15,
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    detailText: {
        fontSize: 16,
        color: "#444",
        marginLeft: 8,
    },
    description: {
        fontSize: 16,
        color: "#666",
        lineHeight: 22,
        marginBottom: 15,
    },
    progressContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    progressBar: {
        height: 10,
        borderRadius: 6,
        backgroundColor: "#ddd",
    },
    progressText: {
        fontSize: 14,
        color: "#444",
        textAlign: "right",
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    shareButton: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    backButton: {
        backgroundColor: "#003366",
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    relatedTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        color: "#003366",
    },
    relatedCard: {
        marginBottom: 15,
        borderRadius: 12,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    relatedImage: {
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
});
