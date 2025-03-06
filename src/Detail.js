import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

export default function Detail({ route, navigation }) {
    const { uid } = route.params;
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");

    const saveDetails = async () => {
        if (!name || !dob || !gender) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        try {
            await firestore().collection("users").doc(uid).set({
                name,
                dob,
                gender,
            });

            Alert.alert("Success", "Details saved successfully!", [
                { text: "OK", onPress: () => navigation.navigate("Dashboard") }
            ]);
        } catch (error) {
            console.error("Error saving Details: ", error);
            Alert.alert("Error", "Failed to save details. Please try again.");
        }
    };

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#BEBDB8" }}>
            <Text
                style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    marginBottom: 40,
                    marginTop: 150,
                }}
            >
                Enter your details:
            </Text>
            <TextInput
                style={{
                    height: 50,
                    width: "100%",
                    borderColor: "black",
                    borderWidth: 1,
                    marginBottom: 30,
                    paddingHorizontal: 10,
                }}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={{
                    height: 50,
                    width: "100%",
                    borderColor: "black",
                    borderWidth: 1,
                    marginBottom: 30,
                    paddingHorizontal: 10,
                }}
                placeholder="Date of Birth (YYYY-MM-DD)"
                value={dob}
                onChangeText={setDob}
            />
            <TextInput
                style={{
                    height: 50,
                    width: "100%",
                    borderColor: "black",
                    borderWidth: 1,
                    marginBottom: 30,
                    paddingHorizontal: 10,
                }}
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
            />
            <TouchableOpacity
                onPress={saveDetails}
                style={{
                    backgroundColor: "#841584",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 20,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
                    Save Details
                </Text>
            </TouchableOpacity>
        </View>
    );
}
