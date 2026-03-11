import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { colors, radii, spacing, typography } from "../constants/theme";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useUser } from "../context/UserContext";

const VALID_PASSWORD = "password123";

export default function LoginScreen() {
    const router = useRouter();
    const { setNim: setLoginNim } = useUser();
    const [nim, setNim] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const students = useQuery(api.admin.getStudents);

    const handleLogin = () => {
        if (!nim || !password) {
            setError("Please enter both Student ID (NIM) and Password.");
            return;
        }

        // Hardcoded support for the original demo account
        if (nim === "221234567" && password === VALID_PASSWORD) {
            setError("");
            setLoginNim(nim);
            router.replace("/dashboard");
            return;
        }

        // Check against dynamic students from database
        const student = students?.find(s => s.nim === nim);

        if (student && password === VALID_PASSWORD) {
            setError("");
            setLoginNim(nim);
            router.replace("/dashboard");
        } else {
            setError("Invalid credentials. Please use your assigned NIM and 'password123'.");
        }
    };

    return (
        <Screen containerStyle={styles.screen}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.headerContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("../assets/images/unklab.png")}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.title}>Campus Academic Portal</Text>
                    <Text style={styles.subtitle}>
                        Log in to manage your courses, grades, and attendance.
                    </Text>
                </View>

                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Student Login</Text>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Student ID (NIM)</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons
                                name="id-card-outline"
                                size={18}
                                color="#64748B"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                value={nim}
                                onChangeText={setNim}
                                placeholder="Enter your NIM"
                                placeholderTextColor="#94A3B8"
                                keyboardType="number-pad"
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={18}
                                color="#64748B"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter your password"
                                placeholderTextColor="#94A3B8"
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {!!error && <Text style={styles.errorText}>{error}</Text>}

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                        <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text style={styles.hintText}>
                        Demo password: {VALID_PASSWORD}
                    </Text>
                </Card>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#F8FAFC", // Soft slate-white background
    },
    flex: {
        flex: 1,
        justifyContent: "center",
    },
    headerContainer: {
        marginBottom: spacing.xl,
        alignItems: "center",
    },
    logoContainer: {
        width: 100,
        height: 100,
        marginBottom: spacing.md,
    },
    logoImage: {
        width: "100%",
        height: "100%",
    },
    title: {
        color: "#0F172A", // Deep slate title
        fontSize: typography.title,
        fontWeight: "700",
        marginBottom: spacing.sm,
    },
    subtitle: {
        color: "#64748B", // Muted slate subtitle
        fontSize: typography.body,
        textAlign: "center",
        paddingHorizontal: spacing.xl,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 5,
    },
    cardTitle: {
        color: "#0F172A",
        fontSize: typography.subtitle,
        fontWeight: "600",
        marginBottom: spacing.lg,
    },
    fieldContainer: {
        marginBottom: spacing.md,
    },
    label: {
        color: "#475569",
        fontSize: typography.small,
        fontWeight: "500",
        marginBottom: spacing.xs,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: radii.md,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    inputIcon: {
        marginLeft: spacing.md,
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        paddingVertical: spacing.sm + 2,
        paddingRight: spacing.md,
        color: "#0F172A",
        fontSize: typography.body,
    },
    errorText: {
        color: colors.danger,
        fontSize: typography.small,
        marginTop: spacing.xs,
        marginBottom: spacing.sm,
    },
    button: {
        marginTop: spacing.md,
        backgroundColor: "#2563EB", // Vibrant professional blue
        borderRadius: radii.md,
        paddingVertical: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: typography.body,
        fontWeight: "600",
    },
    hintText: {
        color: "#94A3B8",
        fontSize: typography.small,
        marginTop: spacing.md,
        textAlign: "center",
    },
});
