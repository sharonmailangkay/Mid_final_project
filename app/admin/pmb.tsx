import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PageHeader } from '../../components/PageHeader';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

// Initial Mock Data
const INITIAL_APPLICANTS = [
    { id: 'REG-2601', name: 'John Doe', status: 'Pending', docVerified: false },
    { id: 'REG-2602', name: 'Jane Smith', status: 'Verified', docVerified: true },
    { id: 'REG-2603', name: 'Alice Johnson', status: 'Pending', docVerified: false },
    { id: 'REG-2604', name: 'Bob Wilson', status: 'Verified', docVerified: true },
];

export default function AdminPMBScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [applicants, setApplicants] = useState(INITIAL_APPLICANTS);

    // Filter Logic
    const filteredApplicants = applicants.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Action: Verify Applicant
    const handleVerify = (id: string) => {
        setApplicants(prev => prev.map(app =>
            app.id === id ? { ...app, status: 'Verified', docVerified: true } : app
        ));
    };

    const ApplicantCard = ({ applicant }: { applicant: typeof INITIAL_APPLICANTS[0] }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.avatarBox}>
                    <Ionicons name="person" size={24} color={colors.primarySoft} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{applicant.name}</Text>
                    <Text style={styles.idText}>Reg No: {applicant.id}</Text>
                </View>
                <View style={[styles.statusBadge, applicant.status === 'Verified' ? styles.statusVerified : styles.statusPending]}>
                    <Text style={[styles.statusText, applicant.status === 'Verified' ? styles.statusTextVerified : styles.statusTextPending]}>
                        {applicant.status}
                    </Text>
                </View>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity
                    style={styles.btnSecondary}
                    onPress={() => alert(`Reviewing documents for ${applicant.name}...`)}
                >
                    <Ionicons name="document-text" size={16} color={colors.text} />
                    <Text style={styles.btnText}>View Docs</Text>
                </TouchableOpacity>

                {applicant.status === 'Pending' ? (
                    <TouchableOpacity
                        style={[styles.btnPrimary, { backgroundColor: colors.accent }]}
                        onPress={() => handleVerify(applicant.id)}
                    >
                        <Ionicons name="checkmark-circle" size={16} color={colors.text} />
                        <Text style={styles.btnText}>Approve</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.approvedBadge}>
                        <Ionicons name="shield-checkmark" size={16} color={colors.accent} />
                        <Text style={styles.approvedText}>Verified</Text>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <Screen scrollable={true}>
            <PageHeader
                title="Manage PMB"
                rightIcon="analytics"
                onRightPress={() => alert('Opening Statistics...')}
            />

            {/* Summary Statistics */}
            <View style={styles.summaryContainer}>
                <View style={[styles.summaryBox, { borderColor: colors.primarySoft + '40' }]}>
                    <Text style={styles.summaryCount}>{applicants.length}</Text>
                    <Text style={styles.summaryLabel}>Total</Text>
                </View>
                <View style={[styles.summaryBox, { borderColor: '#F59E0B40' }]}>
                    <Text style={[styles.summaryCount, { color: '#F59E0B' }]}>
                        {applicants.filter(a => a.status === 'Pending').length}
                    </Text>
                    <Text style={styles.summaryLabel}>Pending</Text>
                </View>
                <View style={[styles.summaryBox, { borderColor: colors.accent + '40' }]}>
                    <Text style={[styles.summaryCount, { color: colors.accent }]}>
                        {applicants.filter(a => a.status === 'Verified').length}
                    </Text>
                    <Text style={styles.summaryLabel}>Approved</Text>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search name or reg no..."
                    placeholderTextColor={colors.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Filter Chips */}
            <View style={styles.filterContainer}>
                {['All', 'Pending', 'Verified'].map((status) => (
                    <TouchableOpacity
                        key={status}
                        style={[
                            styles.filterChip,
                            filterStatus === status && styles.filterChipActive
                        ]}
                        onPress={() => setFilterStatus(status)}
                    >
                        <Text style={[
                            styles.filterText,
                            filterStatus === status && styles.filterTextActive
                        ]}>{status}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.listContainer}>
                <Text style={styles.sectionTitle}>
                    {filterStatus} Applicants ({filteredApplicants.length})
                </Text>

                {filteredApplicants.length > 0 ? (
                    filteredApplicants.map(app => (
                        <ApplicantCard key={app.id} applicant={app} />
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="search-outline" size={48} color={colors.border} />
                        <Text style={styles.emptyText}>No applicants found</Text>
                    </View>
                )}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    listContainer: { paddingBottom: spacing.xxl },
    summaryContainer: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
    summaryBox: { flex: 1, backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.lg, alignItems: 'center', borderWidth: 1 },
    summaryCount: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 2 },
    summaryLabel: { fontSize: 10, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderRadius: radii.md,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.md
    },
    searchIcon: { marginRight: spacing.sm },
    searchInput: { flex: 1, paddingVertical: spacing.md, color: colors.text, fontSize: typography.body },
    filterContainer: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
    filterChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radii.pill, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
    filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    filterText: { color: colors.textSecondary, fontSize: typography.small, fontWeight: '600' },
    filterTextActive: { color: colors.text },
    sectionTitle: { fontSize: typography.body, fontWeight: '700', color: colors.text, marginBottom: spacing.md, opacity: 0.8 },
    card: { backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.xl, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
    avatarBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryMuted, justifyContent: 'center', alignItems: 'center' },
    infoContainer: { flex: 1, marginLeft: spacing.md },
    name: { fontSize: typography.body, fontWeight: '700', color: colors.text, marginBottom: 2 },
    idText: { fontSize: typography.small, color: colors.textSecondary },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.pill },
    statusVerified: { backgroundColor: colors.accentMuted },
    statusPending: { backgroundColor: 'rgba(245, 158, 11, 0.15)' },
    statusText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
    statusTextVerified: { color: colors.accent },
    statusTextPending: { color: '#F59E0B' },
    actionRow: { flexDirection: 'row', gap: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md },
    btnPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.md, borderRadius: radii.md, gap: 8 },
    btnSecondary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cardSoft, paddingVertical: spacing.md, borderRadius: radii.md, gap: 8, borderWidth: 1, borderColor: colors.border },
    btnText: { color: colors.text, fontSize: typography.small, fontWeight: '700' },
    approvedBadge: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
    approvedText: { color: colors.accent, fontWeight: '700', fontSize: typography.small },
    emptyContainer: { alignItems: 'center', paddingVertical: 40 },
    emptyText: { color: colors.textSecondary, marginTop: spacing.md, fontSize: typography.body }
});
