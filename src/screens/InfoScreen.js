import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function InfoScreen() {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Icon name="account-tie" size={30} color="#ffffff" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>About Congressman Jimmy Fresnedi</Text>
            </View>

            <ScrollView style={styles.infoList} showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: "https://your-image-url.com/jimmy-fresnedi.jpg" }} // Replace with actual image URL
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>Congressman Jimmy Fresnedi</Text>
                    <Text style={styles.profileTitle}>Public Servant | Advocate for Progress</Text>
                </View>

                {/* Biography */}
                <Card style={styles.infoCard}>
                    <Card.Content>
                        <Text style={styles.infoTitle}>Biography</Text>
                        <Text style={styles.infoText}>
                            Congressman Jimmy Fresnedi has dedicated his career to public service, advocating for education, healthcare, and community development.
                            His leadership has brought numerous reforms and initiatives aimed at improving the lives of his constituents.
                        </Text>
                    </Card.Content>
                </Card>

                {/* Achievements */}
                <Card style={styles.infoCard}>
                    <Card.Content>
                        <Text style={styles.infoTitle}>Key Achievements</Text>
                        <Text style={styles.infoText}>✔ Spearheaded various educational scholarship programs.</Text>
                        <Text style={styles.infoText}>✔ Improved healthcare facilities in the district.</Text>
                        <Text style={styles.infoText}>✔ Advocated for infrastructure and community development projects.</Text>
                    </Card.Content>
                </Card>

                {/* Contact Information */}
                <Card style={styles.infoCard}>
                    <Card.Content>
                        <Text style={styles.infoTitle}>Contact Information</Text>
                        <Text style={styles.infoText}>📍 Office: [Address Here]</Text>
                        <Text style={styles.infoText}>📞 Phone: [Contact Number]</Text>
                        <Text style={styles.infoText}>✉ Email: [Email Address]</Text>
                        <Text style={styles.infoText}>🌐 Website: [Website URL]</Text>
                    </Card.Content>
                </Card>
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
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff",
    },
    infoList: {
        padding: 15,
    },
    profileSection: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#003366",
    },
    profileTitle: {
        fontSize: 16,
        color: "#555",
        fontStyle: "italic",
    },
    infoCard: {
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
    infoTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0275d8",
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
});
