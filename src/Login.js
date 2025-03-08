import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, Dimensions, Image } from "react-native";
import { TextInput, Button, ActivityIndicator, Card } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [confirm, setConfirm] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const signInWithPhoneNumber = async () => {
        if (!phoneNumber.trim() || phoneNumber.length < 10) {
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
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image source={require("../assets/cong.png")} style={styles.logo} />
                    </View>

                    {/* Title & Subtitle */}
                    <Text style={styles.title}>Cong. Jimmy App</Text>
                    <Text style={styles.subtitle}>Ex. +19062966623</Text>

                    <TextInput
                        label={!confirm ? "Phone Number" : "Enter OTP Code"}
                        mode="outlined"
                        value={!confirm ? phoneNumber : code}
                        onChangeText={!confirm ? setPhoneNumber : setCode}
                        keyboardType={!confirm ? "phone-pad" : "number-pad"}
                        autoCompleteType={!confirm ? "tel" : "sms-otp"} // iOS fix
                        textContentType={!confirm ? "telephoneNumber" : "oneTimeCode"} // iOS OTP Fix
                        left={
                            <TextInput.Icon
                                icon={() => (
                                    <MaterialCommunityIcons
                                        name={!confirm ? "phone" : "lock"}
                                        size={24}
                                    />
                                )}
                            />
                        }
                        blurOnSubmit={false} // iOS fix for OTP input
                        style={styles.input}
                    />

                    {/* Button with Activity Indicator */}
                    <Button
                        mode="contained"
                        onPress={!confirm ? signInWithPhoneNumber : confirmCode}
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? <ActivityIndicator color="white" size="small" /> : !confirm ? "Send Code" : "Confirm Code"}
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003366",
        paddingHorizontal: 20,
        paddingVertical: height * 0.1,
    },
    card: {
        width: width * 0.9,
        padding: 25,
        borderRadius: 12,
        backgroundColor: "#FFD700",
        alignItems: "center",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 10,
        marginLeft: 10,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#003366",
        width: "100%",
        marginRight: 50,
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        color: "#555",
        marginBottom: 10,
        width: "100%",
    },
    input: {
        width: "100%",
        marginBottom: 15,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#003366",
        marginTop: 10,
        paddingVertical: 8,
        width: "100%",
    },
});
