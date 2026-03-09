import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/Card';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

type Status = 'pending' | 'verified' | 'rejected';

export default function VerificationScreen() {
    const router = useRouter();
    const [status, setStatus] = useState<Status>('pending');

    // Simulate an automatic verification process by the admin system
    useEffect(() => {
        const timer = setTimeout(() => {
            // For demo purposes, we automatically simulate a succesful verification 
            // after 3 seconds of pending state
            setStatus('verified');

            // Auto-redirect to success screen after 2 more seconds showing verified
            setTimeout(() => {
                router.replace('/pmb/success');
            }, 2000);

        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const renderStatusContent = () => {
        switch (status) {
            case 'pending':
                return (
                    <>
                        <ActivityIndicator size="large" color={colors.primarySoft} style={styles.spinner} />
                        <Text style={styles.statusTitle}>Pending Verification</Text>
                        <Text style={styles.statusDesc}>
                            Your documents have been submitted and are currently being reviewed by our admission officers. Please do not close this page.
                        </Text>
                    </>
                );
            case 'verified':
                return (
                    <>
                        <View style={[styles.iconBox, { backgroundColor: colors.accent + '20' }]}>
                            <Ionicons name="checkmark-done" size={60} color={colors.accent} />
                        </View>
                        <Text style={[styles.statusTitle, { color: colors.accent }]}>Documents Verified!</Text>
                        <Text style={styles.statusDesc}>
                            All documents meet the requirements. Generating your student IDs...
                        </Text>
                    </>
                );
            case 'rejected':
                return (
                    <>
                        <View style={[styles.iconBox, { backgroundColor: colors.danger + '20' }]}>
                            <Ionicons name="close-circle" size={60} color={colors.danger} />
                        </View>
                        <Text style={[styles.statusTitle, { color: colors.danger }]}>Verification Failed</Text>
                        <Text style={styles.statusDesc}>
                            We found issues with your uploaded documents. Please ensure they are clear and match the requirements, then re-submit.
                        </Text>
                        <TouchableOpacity
                            style={styles.retryButton}
                            onPress={() => router.back()}
                        >
                            <Text style={styles.retryText}>Re-upload Documents</Text>
                        </TouchableOpacity>
                    </>
                );
        }
    };

    return (
        <Screen style={styles.container}>
            <Card style={styles.card}>
                {renderStatusContent()}
            </Card>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: spacing.xl,
    },
    card: {
        alignItems: 'center',
        paddingVertical: spacing.xxl,
        paddingHorizontal: spacing.lg,
    },
    spinner: {
        marginBottom: spacing.xl,
        transform: [{ scale: 1.5 }],
    },
    iconBox: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    statusTitle: {
        fontSize: typography.title,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    statusDesc: {
        fontSize: typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: spacing.md,
    },
    retryButton: {
        marginTop: spacing.xl,
        backgroundColor: colors.cardSoft,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.border,
    },
    retryText: {
        color: colors.text,
        fontWeight: '600',
    },
});
