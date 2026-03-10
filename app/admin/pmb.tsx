import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function AdminPMBScreen() {
    const router = useRouter();

    const ApplicantCard = ({ name, id, status }: any) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Ionicons name="person-circle" size={40} color={colors.primarySoft} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.idText}>Reg No: {id}</Text>
                </View>
                <View style={[styles.statusBadge, status === 'Verified' ? styles.statusVerified : styles.statusPending]}>
                    <Text style={[styles.statusText, status === 'Verified' ? styles.statusTextVerified : styles.statusTextPending]}>
                        {status}
                    </Text>
                </View>
            </View>
            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.btnSecondary} onPress={() => alert('Checking documents...')}>
                    <Ionicons name="document-text" size={16} color={colors.text} />
                    <Text style={styles.btnText}>View Docs</Text>
                </TouchableOpacity>
                {status === 'Pending' ? (
                    <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: '#10B981' }]} onPress={() => alert('Documents verified. Applicant approved & NIM generated.')}>
                        <Ionicons name="checkmark-circle" size={16} color={colors.text} />
                        <Text style={styles.btnText}>Verify & Approve</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: colors.primary }]} onPress={() => alert('Generating NIM & ID Card...')}>
                        <Ionicons name="id-card" size={16} color={colors.text} />
                        <Text style={styles.btnText}>Generate NIM</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <Screen scrollable={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Manage PMB</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryCount}>42</Text>
                    <Text style={styles.summaryLabel}>Total Applicants</Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={[styles.summaryCount, { color: '#F59E0B' }]}>15</Text>
                    <Text style={styles.summaryLabel}>Pending Verify</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Recent Applicants</Text>
            <View style={styles.listContainer}>
                <ApplicantCard name="John Doe" id="REG-2601" status="Pending" />
                <ApplicantCard name="Jane Smith" id="REG-2602" status="Verified" />
                <ApplicantCard name="Alice Johnson" id="REG-2603" status="Pending" />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({ // (will inherit same standard, I will generate below)
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg, paddingTop: spacing.sm },
    backButton: { padding: spacing.xs },
    headerTitle: { fontSize: typography.subtitle, fontWeight: '700', color: colors.text },
    scrollContent: { paddingBottom: spacing.xxl },
    listContainer: { paddingBottom: spacing.xxl },
    summaryContainer: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
    summaryBox: { flex: 1, backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    summaryCount: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 4 },
    summaryLabel: { fontSize: typography.small, color: colors.textSecondary },
    sectionTitle: { fontSize: typography.subtitle, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
    card: { backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
    infoContainer: { flex: 1, marginLeft: spacing.sm },
    name: { fontSize: typography.body, fontWeight: '700', color: colors.text },
    idText: { fontSize: typography.small, color: colors.textSecondary },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: radii.sm },
    statusVerified: { backgroundColor: '#10B98120' },
    statusPending: { backgroundColor: '#F59E0B20' },
    statusText: { fontSize: 10, fontWeight: '700' },
    statusTextVerified: { color: '#10B981' },
    statusTextPending: { color: '#F59E0B' },
    actionRow: { flexDirection: 'row', gap: spacing.sm },
    btnPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.sm, borderRadius: radii.sm, gap: 6 },
    btnSecondary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cardSoft, paddingVertical: spacing.sm, borderRadius: radii.sm, gap: 6, borderWidth: 1, borderColor: colors.border },
    btnText: { color: colors.text, fontSize: typography.small, fontWeight: '600' },
});
