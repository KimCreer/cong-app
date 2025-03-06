import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [confirm, setConfirm] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const signInWithPhoneNumber = async () => {
        if (!phoneNumber.trim()) {
            Alert.alert("Error", "Please enter a valid phone number.");
            return;
        }
        try {
            setLoading(true);
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            Alert.alert("Error", "Failed to send verification code. Please try again.");
            console.log("Error Sending Code:", error);
        } finally {
            setLoading(false);
        }
    };

    const confirmCode = async () => {
        if (!code.trim()) {
            Alert.alert("Error", "Please enter the OTP code.");
            return;
        }
        try {
            setLoading(true);
            const userCredential = await confirm.confirm(code);
            const user = userCredential.user;

            const userDocument = await firestore().collection("users").doc(user.uid).get();

            if (userDocument.exists) {
                navigation.navigate("Dashboard");
            } else {
                navigation.navigate("Detail", { uid: user.uid });
            }
        } catch (error) {
            Alert.alert("Error", "Invalid verification code.");
            console.log("Invalid code:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#BEBDB8", alignItems: "center" }}>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 40, marginTop: 100, textAlign: "center" }}>
                Phone Number Authentication
            </Text>

            {!confirm ? (
                <>
                    <Text style={{ marginBottom: 20, fontSize: 18 }}>Enter your Phone Number:</Text>
                    <TextInput
                        style={{
                            height: 50,
                            width: "90%",
                            borderColor: "black",
                            borderWidth: 1,
                            marginBottom: 30,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            backgroundColor: "white",
                        }}
                        placeholder="e.g., +1 650-555-3434"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity
                        onPress={signInWithPhoneNumber}
                        style={{
                            backgroundColor: "#841584",
                            padding: 12,
                            borderRadius: 5,
                            marginBottom: 20,
                            alignItems: "center",
                            width: "90%",
                            opacity: loading ? 0.7 : 1,
                        }}
                        disabled={loading}
                    >
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                            {loading ? "Sending..." : "Send Code"}
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={{ marginBottom: 20, fontSize: 18 }}>Enter the code sent to your phone:</Text>
                    <TextInput
                        style={{
                            height: 50,
                            width: "90%",
                            borderColor: "black",
                            borderWidth: 1,
                            marginBottom: 30,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            backgroundColor: "white",
                        }}
                        placeholder="Enter code"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="number-pad"
                    />
                    <TouchableOpacity
                        onPress={confirmCode}
                        style={{
                            backgroundColor: "#841584",
                            padding: 12,
                            borderRadius: 5,
                            marginBottom: 20,
                            alignItems: "center",
                            width: "90%",
                            opacity: loading ? 0.7 : 1,
                        }}
                        disabled={loading}
                    >
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                            {loading ? "Verifying..." : "Confirm Code"}
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}
