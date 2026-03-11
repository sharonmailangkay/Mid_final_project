import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/Card';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function PMBSuccessScreen() {
    const router = useRouter();
    const { nim, name } = useLocalSearchParams();

    // The real NIM from database
    const studentNim = nim as string || "---";
    const regNumber = `REG-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <View style={styles.celebrationBox}>
                        <Image
                            source={require('../../assets/images/icon.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <View style={styles.badge}>
                            <Ionicons name="star" size={16} color={colors.background} />
                        </View>
                    </View>
                    <Text style={styles.title}>Registration Successful!</Text>
                    <Text style={styles.subtitle}>
                        Congratulations, your admission process is complete. Welcome to Universitas Klabat.
                    </Text>
                </View>

                <Card style={styles.infoCard}>
                    <Text style={styles.cardHeader}>Student Credentials</Text>

                    <View style={styles.dataRow}>
                        <View>
                            <Text style={styles.label}>Registration Number</Text>
                            <Text style={styles.value}>{regNumber}</Text>
                        </View>
                        <Ionicons name="copy-outline" size={20} color={colors.icon} />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.dataRow}>
                        <View>
                            <Text style={styles.label}>Generated Student ID (NIM)</Text>
                            <Text style={styles.value}>{nim || "---"}</Text>
                        </View>
                        <Ionicons name="copy-outline" size={20} color={colors.icon} />
                    </View>

                    <View style={styles.infoBox}>
                        <Ionicons name="information-circle" size={18} color={colors.accent} />
                        <Text style={styles.infoText}>
                            Please save your Student ID securely. You will use it to log in to the Sivitas Akademika portal.
                        </Text>
                    </View>
                </Card>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.replace('/')}
                >
                    <Text style={styles.primaryButtonText}>Return to Home</Text>
                    <Ionicons name="home-outline" size={20} color={colors.background} />
                </TouchableOpacity>

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: spacing.xxl,
        paddingTop: spacing.xxl,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xxl,
    },
    celebrationBox: {
        marginBottom: spacing.lg,
        position: 'relative',
    },
    logo: {
        width: 120,
        height: 120,
    },
    badge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.accent,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: typography.body,
        fontWeight: '500',
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: spacing.md,
    },
    infoCard: {
        marginBottom: spacing.xl,
        padding: spacing.xl,
    },
    cardHeader: {
        fontSize: typography.subtitle,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.lg,
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: typography.small,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    value: {
        fontSize: typography.title,
        fontWeight: '800',
        color: colors.primarySoft,
        letterSpacing: 1,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.lg,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: colors.accentMuted,
        padding: spacing.md,
        borderRadius: radii.md,
        marginTop: spacing.xl,
        gap: spacing.sm,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: colors.text,
        lineHeight: 18,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.lg,
        borderRadius: radii.lg,
        gap: spacing.sm,
    },
    primaryButtonText: {
        color: colors.text,
        fontSize: typography.body,
        fontWeight: '700',
    },
});
