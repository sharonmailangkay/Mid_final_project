import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PageHeader } from '../../components/PageHeader';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { api } from '../../convex/_generated/api';

export default function AdminConsultationsScreen() {
    const router = useRouter();

    // --- CONVEX DATA ---
    const rawRequests = useQuery(api.admin.getConsultations);
    const assignConsultation = useMutation(api.admin.assignConsultation);
    const completeConsultation = useMutation(api.admin.completeConsultation);

    const requests = rawRequests || [];

    const handleAssign = async (id: any) => {
        try {
            await assignConsultation({ id, assignee: 'Dean of Faculty' });
            Alert.alert("Success", "Request assigned to Dean.");
        } catch (error) {
            Alert.alert("Error", "Failed to assign request.");
        }
    };

    const handleComplete = async (id: any) => {
        try {
            await completeConsultation({ id });
            Alert.alert("Success", "Consultation marked as done.");
        } catch (error) {
            Alert.alert("Error", "Failed to complete request.");
        }
    };

    const RequestCard = ({ request }: { request: any }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{request.studentName}</Text>
                    <Text style={styles.topic}>{request.topic} • {request.date}</Text>
                </View>
                <View style={[
                    styles.statusBadge,
                    request.status === 'Assigned' ? styles.statusAssigned :
                        request.status === 'Completed' ? styles.statusCompleted : styles.statusPending
                ]}>
                    <Text style={[
                        styles.statusText,
                        request.status === 'Assigned' ? styles.statusTextAssigned :
                            request.status === 'Completed' ? styles.statusTextCompleted : styles.statusTextPending
                    ]}>
                        {request.status}
                    </Text>
                </View>
            </View>

            <View style={styles.assignRow}>
                <Ionicons
                    name={(request.assignee ? "person-check" : "help-circle") as any}
                    size={16}
                    color={request.assignee ? colors.accent : colors.textSecondary}
                />
                <Text style={[styles.assigneeText, request.assignee && { color: colors.text }]}>
                    {request.assignee ? `Assigned to: ${request.assignee}` : 'Unassigned (Waiting for Admin)'}
                </Text>
            </View>

            <View style={styles.actionRow}>
                {request.status === 'Pending' ? (
                    <TouchableOpacity style={styles.btnSecondary} onPress={() => handleAssign(request._id)}>
                        <Ionicons name="person-add" size={16} color={colors.text} />
                        <Text style={styles.btnText}>Assign to Dean</Text>
                    </TouchableOpacity>
                ) : request.status === 'Assigned' ? (
                    <TouchableOpacity style={styles.btnPrimary} onPress={() => handleComplete(request._id)}>
                        <Ionicons name="checkmark-done" size={16} color={colors.text} />
                        <Text style={styles.btnText}>Mark as Done</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.finishedBox}>
                        <Ionicons name="checkbox" size={20} color={colors.accent} />
                        <Text style={styles.finishedText}>Consultation Finished</Text>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <Screen scrollable={true}>
            <PageHeader
                title="Consultations Request"
                subtitle="Manage student academic support"
            />

            <View style={styles.listContainer}>
                {rawRequests === undefined ? (
                    <ActivityIndicator size="large" color={colors.primarySoft} style={{ marginTop: 40 }} />
                ) : requests.length > 0 ? (
                    requests.map(req => (
                        <RequestCard key={req._id} request={req} />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="chatbubbles-outline" size={60} color={colors.cardSoft} />
                        <Text style={styles.emptyTitle}>No Requests Yet</Text>
                        <Text style={styles.emptyDesc}>Requests from students will appear here.</Text>
                    </View>
                )}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    listContainer: { paddingBottom: spacing.xxl },
    card: { backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
    name: { fontSize: typography.body, fontWeight: '700', color: colors.text, marginBottom: 2 },
    topic: { fontSize: typography.small, color: colors.textSecondary },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: radii.sm },
    statusAssigned: { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
    statusPending: { backgroundColor: 'rgba(245, 158, 11, 0.1)' },
    statusCompleted: { backgroundColor: 'rgba(99, 102, 241, 0.1)' },
    statusText: { fontSize: 10, fontWeight: '700' },
    statusTextAssigned: { color: colors.accent },
    statusTextPending: { color: '#F59E0B' },
    statusTextCompleted: { color: colors.primarySoft },
    assignRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.md, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
    assigneeText: { fontSize: typography.small, color: colors.textSecondary },
    actionRow: { flexDirection: 'row', gap: spacing.sm },
    btnPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent, paddingVertical: spacing.md, borderRadius: radii.md, gap: 8 },
    btnSecondary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cardSoft, paddingVertical: spacing.md, borderRadius: radii.md, gap: 8, borderWidth: 1, borderColor: colors.border },
    btnText: { color: colors.text, fontSize: typography.small, fontWeight: '700' },
    finishedBox: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: spacing.sm, width: '100%' },
    finishedText: { color: colors.accent, fontWeight: '600', fontSize: typography.small },
    emptyState: { alignItems: 'center', marginTop: 60, paddingHorizontal: 40 },
    emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: spacing.md },
    emptyDesc: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs },
});
