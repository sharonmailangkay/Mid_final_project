import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

const VALID_NIM = "221234567";
const VALID_PASSWORD = "password123";

export default function LoginScreen() {
    const router = useRouter();
    const [nim, setNim] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!nim || !password) {
            setError("Please enter both Student ID (NIM) and Password.");
            return;
        }

        if (nim === VALID_NIM && password === VALID_PASSWORD) {
            setError("");
            router.replace("/dashboard");
        } else {
            setError("Invalid credentials. Try NIM 221234567 and password password123.");
        }
    };

    return (
        <Screen>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.headerContainer}>
                    <View style={styles.logoCircle}>
                        <Ionicons name="school" size={32} color={colors.primarySoft} />
                    </View>
                    <Text style={styles.title}>Campus Academic Portal</Text>
                    <Text style={styles.subtitle}>
                        Log in to manage your courses, grades, and attendance.
                    </Text>
                </View>

                <Card>
                    <Text style={styles.cardTitle}>Student Login</Text>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Student ID (NIM)</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons
                                name="id-card-outline"
                                size={18}
                                color={colors.textSecondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                value={nim}
                                onChangeText={setNim}
                                placeholder="Enter your NIM"
                                placeholderTextColor={colors.textSecondary}
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
                                color={colors.textSecondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter your password"
                                placeholderTextColor={colors.textSecondary}
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {!!error && <Text style={styles.errorText}>{error}</Text>}

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                        <Ionicons name="arrow-forward" size={18} color={colors.text} />
                    </TouchableOpacity>

                    <Text style={styles.hintText}>
                        Demo credentials: NIM {VALID_NIM}, password {VALID_PASSWORD}
                    </Text>
                </Card>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        justifyContent: "center",
    },
    headerContainer: {
        marginBottom: spacing.xl,
    },
    logoCircle: {
        width: 60,
        height: 60,
        borderRadius: radii.pill,
        backgroundColor: colors.primaryMuted,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.md,
    },
    title: {
        color: colors.text,
        fontSize: typography.title,
        fontWeight: "700",
        marginBottom: spacing.sm,
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: typography.body,
    },
    cardTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: "600",
        marginBottom: spacing.lg,
    },
    fieldContainer: {
        marginBottom: spacing.md,
    },
    label: {
        color: colors.textSecondary,
        fontSize: typography.small,
        marginBottom: spacing.xs,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: radii.md,
        backgroundColor: colors.inputBackground,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
    },
    inputIcon: {
        marginLeft: spacing.md,
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        paddingVertical: spacing.sm + 2,
        paddingRight: spacing.md,
        color: colors.text,
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
        backgroundColor: colors.primary,
        borderRadius: radii.md,
        paddingVertical: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
    },
    buttonText: {
        color: colors.text,
        fontSize: typography.body,
        fontWeight: "600",
    },
    hintText: {
        color: colors.textSecondary,
        fontSize: typography.small,
        marginTop: spacing.md,
        textAlign: "center",
    },
});
