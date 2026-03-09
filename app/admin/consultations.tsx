import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function AdminConsultationsScreen() {
    const router = useRouter();

    const RequestCard = ({ name, topic, date, status, assignee }: any) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.topic}>{topic} • {date}</Text>
                </View>
                <View style={[styles.statusBadge, status === 'Assigned' ? styles.statusAssigned : styles.statusPending]}>
                    <Text style={[styles.statusText, status === 'Assigned' ? styles.statusTextAssigned : styles.statusTextPending]}>
                        {status}
                    </Text>
                </View>
            </View>

            <View style={styles.assignRow}>
                <Ionicons name="briefcase" size={16} color={colors.textSecondary} />
                <Text style={styles.assigneeText}>
                    {assignee ? `Assigned to: ${assignee}` : 'Unassigned'}
                </Text>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.btnSecondary} onPress={() => alert('Assign to Dean/Lecturer')}>
                    <Ionicons name="person-add" size={16} color={colors.text} />
                    <Text style={styles.btnText}>Assign</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnPrimary} onPress={() => alert('Update consultation status')}>
                    <Ionicons name="sync" size={16} color={colors.text} />
                    <Text style={styles.btnText}>Update Status</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <Screen>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Consultations Request</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <RequestCard name="Jane Smith" topic="Thesis Approval" date="12 Oct 2026" status="Pending" assignee={null} />
                <RequestCard name="Michael Scott" topic="Course Selection" date="11 Oct 2026" status="Assigned" assignee="Dr. Alan Turing" />
                <RequestCard name="Dwight Schrute" topic="Internship" date="10 Oct 2026" status="Assigned" assignee="Dean of Faculty" />

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg, paddingTop: spacing.sm },
    backButton: { padding: spacing.xs },
    headerTitle: { fontSize: typography.subtitle, fontWeight: '700', color: colors.text },
    scrollContent: { paddingBottom: spacing.xxl },
    card: { backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
    name: { fontSize: typography.body, fontWeight: '700', color: colors.text, marginBottom: 2 },
    topic: { fontSize: typography.small, color: colors.textSecondary },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: radii.sm },
    statusAssigned: { backgroundColor: '#10B98120' },
    statusPending: { backgroundColor: '#F59E0B20' },
    statusText: { fontSize: 10, fontWeight: '700' },
    statusTextAssigned: { color: '#10B981' },
    statusTextPending: { color: '#F59E0B' },
    assignRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.md, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
    assigneeText: { fontSize: typography.small, color: colors.primarySoft },
    actionRow: { flexDirection: 'row', gap: spacing.sm },
    btnPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft, paddingVertical: spacing.sm, borderRadius: radii.sm, gap: 6 },
    btnSecondary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cardSoft, paddingVertical: spacing.sm, borderRadius: radii.sm, gap: 6, borderWidth: 1, borderColor: colors.border },
    btnText: { color: colors.text, fontSize: typography.small, fontWeight: '600' },
});
