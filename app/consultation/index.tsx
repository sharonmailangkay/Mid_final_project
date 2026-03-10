import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { useConsultations } from '../../context/ConsultationContext';

export default function ConsultationIndexScreen() {
    const router = useRouter();
    const { consultations } = useConsultations();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return colors.primarySoft;
            case 'Responded': return colors.accentMuted;
            case 'Completed': return colors.accent;
            default: return colors.textSecondary;
        }
    };

    return (
        <Screen style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Academic Consultation</Text>
                <Text style={styles.subtitle}>Discuss your academic progress with staff</Text>
            </View>

            <TouchableOpacity
                style={styles.newConsultationCard}
                activeOpacity={0.8}
                onPress={() => router.push('/consultation/new')}
            >
                <LinearGradientPlaceholder />
                <View style={styles.newConsultationContent}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="chatbubbles" size={24} color={colors.primary} />
                    </View>
                    <View>
                        <Text style={styles.newTitle}>Start New Consultation</Text>
                        <Text style={styles.newSubtitle}>Ask a dean, kaprodi, or lecturer</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Consultation History section removed as per request */}
        </Screen>
    );
}

// Simple placeholder for gradient without adding the import if not needed
const LinearGradientPlaceholder = () => (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.primaryMuted, opacity: 0.3 }]} />
);

const styles = StyleSheet.create({
    container: {
        paddingBottom: 0,
    },
    header: {
        marginBottom: spacing.xl,
    },
    title: {
        fontSize: typography.title,
        fontWeight: '700',
        color: colors.text,
    },
    subtitle: {
        fontSize: typography.body,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    newConsultationCard: {
        borderRadius: radii.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.primary + '40',
        marginBottom: spacing.xl,
        backgroundColor: colors.card,
    },
    newConsultationContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.xl,
        gap: spacing.lg,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.primarySoft + '30',
        justifyContent: 'center',
        alignItems: 'center',
    },
    newTitle: {
        fontSize: typography.subtitle,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 4,
    },
    newSubtitle: {
        fontSize: typography.small,
        color: colors.textSecondary,
    },
    sectionTitle: {
        fontSize: typography.subtitle,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.md,
    },
    listContent: {
        paddingBottom: spacing.xxl,
    },
    historyCard: {
        marginBottom: spacing.md,
        padding: spacing.lg,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    statusBadge: {
        paddingHorizontal: spacing.md,
        paddingVertical: 4,
        borderRadius: radii.pill,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    dateText: {
        fontSize: typography.small,
        color: colors.textSecondary,
    },
    topicText: {
        fontSize: typography.body,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.sm,
    },
    staffInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
        gap: spacing.xs,
    },
    staffName: {
        fontSize: typography.small,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    staffRole: {
        fontSize: 11,
        color: colors.textSecondary,
        opacity: 0.7,
    },
    messagePreview: {
        fontSize: typography.body,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: spacing.md,
        color: colors.textSecondary,
        fontSize: typography.body,
    },
});
