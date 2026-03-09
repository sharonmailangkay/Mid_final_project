import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { QuickActionCard } from "../components/QuickActionCard";
import { Screen } from "../components/Screen";
import { colors, radii, spacing, typography } from "../constants/theme";

export default function OnboardingScreen() {
    const router = useRouter();

    return (
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>New Student Portal</Text>
                    <Text style={styles.subtitle}>Complete your enrollment steps and get ready for the new semester.</Text>
                </View>

                <Card style={styles.statusCard}>
                    <Text style={styles.statusTitle}>Enrollment Status</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>Pending Re-registration</Text>
                    </View>
                </Card>

                <Text style={styles.sectionTitle}>Required Steps</Text>

                <QuickActionCard
                    title="Re-registration & Payment"
                    subtitle="Pay your first semester tuition fee"
                    icon="card-outline"
                    onPress={() => alert("Navigate to Payment")}
                />

                <QuickActionCard
                    title="Upload Documents"
                    subtitle="Submit your required documents"
                    icon="document-text-outline"
                    onPress={() => alert("Navigate to Upload Documents")}
                />

                <Text style={styles.sectionTitle}>Orientation & Campus Life</Text>

                <QuickActionCard
                    title="PKKMB Schedule"
                    subtitle="View orientation timeline and groups"
                    icon="calendar-outline"
                    onPress={() => alert("Navigate to Orientation")}
                />

                <QuickActionCard
                    title="Digital KTM"
                    subtitle="View your temporary student ID card"
                    icon="id-card-outline"
                    onPress={() => alert("Navigate to Digital KTM")}
                />

                <QuickActionCard
                    title="Campus Account Activation"
                    subtitle="Claim your student email and Wi-Fi access"
                    icon="mail-outline"
                    onPress={() => alert("Navigate to Account Activation")}
                />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: spacing.xl,
    },
    header: {
        marginBottom: spacing.lg,
    },
    title: {
        color: colors.text,
        fontSize: typography.title,
        fontWeight: "700",
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: typography.body,
        marginTop: spacing.sm,
    },
    statusCard: {
        marginBottom: spacing.xl,
        alignItems: "center",
    },
    statusTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: "600",
        marginBottom: spacing.sm,
    },
    statusBadge: {
        backgroundColor: colors.primaryMuted,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radii.pill,
    },
    statusText: {
        color: colors.primarySoft,
        fontWeight: "600",
    },
    sectionTitle: {
        color: colors.textSecondary,
        fontSize: typography.small,
        marginBottom: spacing.md,
        marginTop: spacing.md,
    },
});
