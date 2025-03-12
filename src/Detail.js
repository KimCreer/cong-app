import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Text, useTheme, RadioButton, Card } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

export default function Detail({ route, navigation }) {
    const { uid } = route.params;
    const theme = useTheme();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [barangay, setBarangay] = useState("");

    const validateInputs = () => {
        if (!name.trim() || !dob.trim() || !gender.trim() || !address.trim() || !barangay.trim()) {
            Alert.alert("Error", "All fields except email are required!");
            return false;
        }

        if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
            Alert.alert("Error", "Please enter a valid email address.");
            return false;
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
            Alert.alert("Error", "Date of Birth must be in YYYY-MM-DD format.");
            return false;
        }

        if (address.trim().length < 3) {
            Alert.alert("Error", "Address must be at least 3 characters long.");
            return false;
        }

        if (barangay.trim().length < 3) {
            Alert.alert("Error", "Barangay must be at least 3 characters long.");
            return false;
        }

        if (!["Male", "Female", "Other"].includes(gender)) {
            Alert.alert("Error", "Please select a valid gender.");
            return false;
        }

        return true;
    };

    const saveDetails = async () => {
        if (!validateInputs()) return;

        try {
            const userData = {
                name: name.trim(),
                dob: dob.trim(),
                gender: gender.trim(),
                address: address.trim(),
                barangay: barangay.trim(),
            };

            if (email.trim()) {
                userData.email = email.trim();
            }

            await firestore().collection("users").doc(uid).set(userData);

            Alert.alert("Success", "Details saved successfully!", [
                { text: "OK", onPress: () => navigation.navigate("Dashboard") }
            ]);
        } catch (error) {
            console.error("Error saving Details: ", error);
            Alert.alert("Error", "Failed to save details. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="headlineMedium" style={styles.title}>
                        Enter your details
                    </Text>
                    <TextInput
                        label="Name"
                        mode="outlined"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Email (Optional)"
                        mode="outlined"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        style={styles.input}
                    />
                    <TextInput
                        label="Date of Birth (YYYY-MM-DD)"
                        mode="outlined"
                        value={dob}
                        onChangeText={setDob}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <Text variant="bodyLarge" style={styles.label}>Gender</Text>
                    <RadioButton.Group onValueChange={setGender} value={gender}>
                        <View style={styles.radioContainer}>
                            <View style={styles.radioItem}>
                                <RadioButton value="Male" />
                                <Text>Male</Text>
                            </View>
                            <View style={styles.radioItem}>
                                <RadioButton value="Female" />
                                <Text>Female</Text>
                            </View>
                            <View style={styles.radioItem}>
                                <RadioButton value="Other" />
                                <Text>Other</Text>
                            </View>
                        </View>
                    </RadioButton.Group>

                    <TextInput
                        label="Address"
                        mode="outlined"
                        value={address}
                        onChangeText={setAddress}
                        style={styles.input}
                    />
                    <TextInput
                        label="Barangay in Muntinlupa City"
                        mode="outlined"
                        value={barangay}
                        onChangeText={setBarangay}
                        style={styles.input}
                    />
                    <Button
                        mode="contained"
                        onPress={saveDetails}
                        style={styles.button}
                    >
                        Save Details
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#0A1931",
        justifyContent: "center",
    },
    card: {
        backgroundColor: "#FFD700",
        padding: 20,
        borderRadius: 10,
    },
    title: {
        textAlign: "center",
        color: "#0A1931",
        marginBottom: 20,
        fontWeight: "bold",
    },
    input: {
        marginBottom: 15,
        backgroundColor: "white",
    },
    label: {
        marginBottom: 5,
        color: "#0A1931",
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#0A1931",
    },
});
