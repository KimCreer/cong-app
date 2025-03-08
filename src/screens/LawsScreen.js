import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Animated, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { principalAuthoredBills, coAuthoredBills, committeeMembership } from "../../LawData";
import { Linking } from "react-native";


export default function LawsScreen() {
    const [selectedSection, setSelectedSection] = useState("Principal Authored Bills");
    const [underlineX, setUnderlineX] = useState(new Animated.Value(0));

    const sections = {
        "Principal Authored Bills": principalAuthoredBills,
        "Co-Authored Bills": coAuthoredBills,
        "Committee Membership": committeeMembership,
    };

    const handleTabPress = (section, index) => {
        setSelectedSection(section);
        Animated.spring(underlineX, {
            toValue: index * 180, // Adjusting for tab width
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
            <Icon name="gavel" size={32} color="#ffffff" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>Laws & Legislation</Text>
        </View>
    
        {/* Navigation Bar */}
        <View style={styles.navbar}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navbarContent}>
                {Object.keys(sections).map((section, index) => (
                    <TouchableOpacity 
                        key={section} 
                        style={[styles.navItem, selectedSection === section && styles.activeNavItem]} 
                        onPress={() => handleTabPress(section, index)}
                    >
                        <Text style={[styles.navText, selectedSection === section && styles.activeNavText]}>
                            {section}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Animated.View style={[styles.underline, { left: underlineX }]} />
        </View>
    
        {/* Congressman Profile Link */}
        {/* View More Details Link */}
        <TouchableOpacity onPress={() => Linking.openURL("https://www.congress.gov.ph/house-members/view/?member=K034&name=Fresnedi%2C+Jaime+R.&page=0")}>
            <Text style={styles.viewMoreLink}>View More Details</Text>
        </TouchableOpacity>
            
        {/* Content Section */}
        <View style={styles.contentContainer}>
            <FlatList
                data={sections[selectedSection]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            {/* Render differently based on section */}
                            {selectedSection === "Committee Membership" ? (
                                <>
                                    <Text style={styles.committeeTitle}>{item.committee}</Text>
                                    <Text style={styles.lawDetail}><Text style={styles.boldText}>Position:</Text> {item.position || "N/A"}</Text>
                                    <Text style={styles.lawDetail}><Text style={styles.boldText}>Journal Number:</Text> {item.journalNumber || "N/A"}</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.lawTitle}>{item.title}</Text>
                                    <View style={styles.lawDetailsContainer}>
                                        <Text style={styles.lawDetail}><Text style={styles.boldText}>Significance:</Text> {item.significance || "N/A"}</Text>
                                        <Text style={styles.lawDetail}><Text style={styles.boldText}>Date Filed:</Text> {item.dateFiled || "N/A"}</Text>
                                        <Text style={styles.lawDetail}>
                                            <Text style={styles.boldText}>Principal Author/s:</Text> {Array.isArray(item.principalAuthors) && item.principalAuthors.length > 0 ? item.principalAuthors.join(", ") : "N/A"}
                                        </Text>
                                        <Text style={styles.lawDetail}><Text style={styles.boldText}>Date Read:</Text> {item.dateRead || "N/A"}</Text>
                                        <Text style={styles.lawDetail}><Text style={styles.boldText}>Primary Referral:</Text> {item.primaryReferral || "N/A"}</Text>
                                        <Text style={styles.lawDetail}><Text style={styles.boldText}>Date Approved on Second Reading:</Text> {item.dateApprovedOnSecondReading || "N/A"}</Text>
                                        <Text style={styles.lawDetail}><Text style={styles.boldText}>Date Transmitted:</Text> {item.dateTransmitted || "N/A"}</Text>
                                        <Text style={styles.lawDetail}><Text style={styles.boldText}>Bill Status:</Text> {item.billStatus || "N/A"}</Text>
                                    </View>
                                </>
                            )}
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f6f9",
    },
    header: {
        backgroundColor: "#003366",
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    headerIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
    },
    navbar: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        elevation: 3,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        position: "relative",
        paddingVertical: 10,
    },
    navItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    navText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#003366",
    },
    activeNavText: {
        color: "#000",
    },
    underline: {
        position: "absolute",
        bottom: 0,
        width: 140,
        height: 3,
        backgroundColor: "#003366",
        borderRadius: 2,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    card: {
        borderRadius: 15,
        elevation: 4,
        backgroundColor: "#ffffff",
        padding: 15,
        marginBottom: 20,
    },
    lawTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#003366",
        marginBottom: 10,
    },
    committeeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#228B22",
        marginBottom: 10,
    },
    lawDetailsContainer: {
        marginTop: 10,
    },
    lawDetail: {
        fontSize: 16,
        color: "#444",
        marginBottom: 5,
    },
    boldText: {
        fontWeight: "bold",
        color: "#222",
    },
    committeeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#006400", // Dark green for differentiation
        marginBottom: 10,
    },
    viewMoreLink: {
        fontSize: 16,
        color: "#007bff", // Blue color for visibility
        textDecorationLine: "underline",
        textAlign: "center",
        marginVertical: 10, // Adds spacing around the link
        fontWeight: "bold",
    }
    
    
});
