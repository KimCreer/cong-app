import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, Dimensions, Image } from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

    useEffect(() => {
        checkIfFirstLaunch();
    }, []);

    const checkIfFirstLaunch = async () => {
        const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");
        if (!hasSeenIntro) {
            navigation.replace("Intro");
        }
    };

    const signInWithPhoneNumber = async () => {
        if (!phoneNumber.trim() || phoneNumber.length < 10) {
            Alert.alert("Error", "Please enter a valid phone number.");
            return;
        }

        try {
            setLoading(true);

            // Check in "admins" collection
            const adminQuery = await firestore().collection("admins")
                .where("phone", "==", phoneNumber).get();

            if (!adminQuery.empty) {
                Alert.alert("Welcome!", "Logging in as Admin...");
                navigation.navigate("AdminDashboard");
                return;
            }

            // Check in "users" collection
            const userQuery = await firestore().collection("users")
                .where("phoneNumber", "==", phoneNumber).get();

            if (!userQuery.empty) {
                Alert.alert("Welcome!", "Logging in as User...");
                navigation.navigate("Dashboard");
                return;
            }

            // If not found, send OTP
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);

        } catch (error) {
            Alert.alert("Error", "Failed to check user data. Please try again.");
            console.log("Error:", error);
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

            // Check user role
            const userDocument = await firestore().collection("users").doc(user.uid).get();
            if (userDocument.exists) {
                const userData = userDocument.data();
                navigation.navigate(userData.role === "admin" ? "AdminDashboard" : "Dashboard");
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

    const skipLogin = () => {
        navigation.navigate("Dashboard");
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/cong.png")} style={styles.logo} />
            <Text style={styles.title}>Welcome to MUNTINLUPA DISTRICT OFFICE</Text>
            <Text style={styles.description}>
                Securely sign in with your phone number. A one-time password (OTP) will be sent via SMS.
            </Text>

            <TextInput
                label={!confirm ? "Phone Number" : "Enter OTP Code"}
                mode="outlined"
                value={!confirm ? phoneNumber : code}
                onChangeText={!confirm ? setPhoneNumber : setCode}
                keyboardType={!confirm ? "phone-pad" : "number-pad"}
                autoCompleteType={!confirm ? "tel" : "sms-otp"}
                textContentType={!confirm ? "telephoneNumber" : "oneTimeCode"}
                left={
                    <TextInput.Icon
                        icon={() => <MaterialCommunityIcons name={!confirm ? "phone" : "lock"} size={24} color="#003580" />}
                    />
                }
                style={styles.input}
                outlineColor="#003580"
                activeOutlineColor="#002B5C"
            />

            <Button
                mode="contained"
                onPress={!confirm ? signInWithPhoneNumber : confirmCode}
                style={[styles.button, loading && styles.buttonDisabled]}
                labelStyle={styles.buttonText}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="white" size="small" /> : !confirm ? "Send Code" : "Verify OTP"}
            </Button>

            {/* Skip Button */}
            <Button
                mode="text"
                onPress={skipLogin}
                style={styles.skipButton}
                labelStyle={styles.skipButtonText}
            >
                Skip for Now
            </Button>

            <Text style={styles.footerText}>
                Need help? <Text style={styles.link}>Contact Support</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F7FA",
        paddingHorizontal: 25,
    },
    logo: {
        width: 110,
        height: 110,
        resizeMode: "contain",
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#003580",
        textAlign: "center",
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        color: "#606060",
        textAlign: "center",
        marginBottom: 25,
        paddingHorizontal: 20,
    },
    input: {
        width: "100%",
        marginBottom: 18,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#FFD700",
        paddingVertical: 12,
        width: "100%",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#FFD700",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonDisabled: {
        backgroundColor: "#D4AF37",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#212529",
    },
    skipButton: {
        marginTop: 10,
    },
    skipButtonText: {
        fontSize: 16,
        color: "#003580",
        fontWeight: "bold",
    },
    footerText: {
        marginTop: 20,
        fontSize: 14,
        color: "#606060",
    },
    link: {
        color: "#003580",
        fontWeight: "bold",
    },
});
