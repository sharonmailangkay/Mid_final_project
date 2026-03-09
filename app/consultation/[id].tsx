import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { Screen } from '../../components/Screen';
import { Consultation } from '../../constants/data';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { useConsultations } from '../../context/ConsultationContext';

export default function ConsultationDetailScreen() {
    const { id } = useLocalSearchParams();
    const { consultations } = useConsultations();
    const [consultation, setConsultation] = useState<Consultation | null>(null);

    useEffect(() => {
        const found = consultations.find(c => c.id === id);
        if (found) {
            setConsultation(found);
        }
    }, [id, consultations]);

    if (!consultation) {
        return (
            <Screen style={styles.centerContainer}>
                <Text style={styles.notFoundText}>Consultation not found</Text>
            </Screen>
        );
    }

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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <Text style={styles.dateText}>{consultation.date}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(consultation.status) + '20' }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(consultation.status) }]}>{consultation.status}</Text>
                    </View>
                </View>

                <Text style={styles.topicTitle}>{consultation.topic}</Text>

                <View style={styles.staffInfo}>
                    <Ionicons name="person-circle" size={32} color={colors.primarySoft} />
                    <View>
                        <Text style={styles.staffName}>{consultation.staffName}</Text>
                        <Text style={styles.staffRole}>{consultation.staffRole}</Text>
                    </View>
                </View>

                {/* User's Message */}
                <Card style={styles.chatCard}>
                    <View style={styles.chatHeader}>
                        <Ionicons name="person" size={16} color={colors.textSecondary} />
                        <Text style={styles.chatSenderTitle}>Your Message</Text>
                    </View>
                    <Text style={styles.chatMessage}>{consultation.message}</Text>
                </Card>

                {/* Staff Response */}
                {consultation.response ? (
                    <Card style={[styles.chatCard, styles.responseCard]}>
                        <View style={styles.chatHeader}>
                            <Ionicons name="school" size={16} color={colors.primarySoft} />
                            <Text style={[styles.chatSenderTitle, { color: colors.primarySoft }]}>Staff Response</Text>
                        </View>
                        <Text style={styles.chatMessage}>{consultation.response}</Text>
                    </Card>
                ) : (
                    <View style={styles.emptyResponseContainer}>
                        <Ionicons name="time-outline" size={32} color={colors.border} />
                        <Text style={styles.emptyResponseText}>Waiting for response from {consultation.staffName}</Text>
                    </View>
                )}

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        color: colors.textSecondary,
        fontSize: typography.body,
    },
    scrollContent: {
        paddingBottom: spacing.xxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    dateText: {
        color: colors.textSecondary,
        fontSize: typography.body,
    },
    statusBadge: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: radii.pill,
    },
    statusText: {
        fontSize: typography.small,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    topicTitle: {
        color: colors.text,
        fontSize: typography.title,
        fontWeight: '700',
        marginBottom: spacing.lg,
    },
    staffInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        marginBottom: spacing.xl,
        paddingBottom: spacing.lg,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
    },
    staffName: {
        color: colors.text,
        fontSize: typography.body,
        fontWeight: '600',
    },
    staffRole: {
        color: colors.textSecondary,
        fontSize: typography.small,
    },
    chatCard: {
        marginBottom: spacing.lg,
        padding: spacing.lg,
    },
    responseCard: {
        backgroundColor: colors.primaryMuted + '10',
        borderColor: colors.primarySoft + '40',
    },
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    chatSenderTitle: {
        color: colors.textSecondary,
        fontSize: typography.small,
        fontWeight: '600',
    },
    chatMessage: {
        color: colors.text,
        fontSize: typography.body,
        lineHeight: 22,
    },
    emptyResponseContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xxl,
        marginTop: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
        borderRadius: radii.lg,
    },
    emptyResponseText: {
        color: colors.textSecondary,
        marginTop: spacing.sm,
        textAlign: 'center',
        paddingHorizontal: spacing.xl,
    },
});
