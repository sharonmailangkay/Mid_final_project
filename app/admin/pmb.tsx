import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { PageHeader } from '../../components/PageHeader';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function AdminPMBScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // --- CONVEX DATA ---
    const rawApplicants = useQuery(api.admin.getApplicants);
    const verifyApplicant = useMutation(api.admin.verifyApplicant);
    const addStudent = useMutation(api.admin.addStudent);

    const applicants = rawApplicants || [];

    // Filter Logic
    const filteredApplicants = applicants.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (app._id && app._id.toString().toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Action: Verify Applicant & Convert to Student
    const handleVerify = async (applicant: any) => {
        // Generate a simple NIM for the new student
        const newNim = `260${Math.floor(1000 + Math.random() * 9000)}`;
        
        Alert.alert(
            "Confirm Approval",
            `Approve ${applicant.name} and assign NIM: ${newNim}?`,
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Approve", 
                    onPress: async () => {
                        try {
                            // 1. Update applicant status in database
                            await verifyApplicant({ id: applicant._id, nim: newNim });
                            
                            // 2. Add as a permanent student record
                            await addStudent({
                                name: applicant.name,
                                nim: newNim,
                                major: "Computer Science", // Default major
                                year: new Date().getFullYear().toString()
                            });

                            Alert.alert("Success", `${applicant.name} is now a registered student!`);
                        } catch (e) {
                            Alert.alert("Error", "Failed to verify applicant.");
                        }
                    }
                }
            ]
        );
    };

    const ApplicantCard = ({ applicant }: { applicant: any }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.avatarBox}>
                    <Ionicons name="person" size={24} color={colors.primarySoft} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{applicant.name}</Text>
                    <Text style={styles.idText}>Email: {applicant.email}</Text>
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
                    onPress={() => alert(`Contact: ${applicant.phone}`)}
                >
                    <Ionicons name="call" size={16} color={colors.text} />
                    <Text style={styles.btnText}>Contact</Text>
                </TouchableOpacity>

                {applicant.status === 'Pending' ? (
                    <TouchableOpacity
                        style={[styles.btnPrimary, { backgroundColor: colors.accent }]}
                        onPress={() => handleVerify(applicant)}
                    >
                        <Ionicons name="checkmark-circle" size={16} color={colors.text} />
                        <Text style={styles.btnText}>Approve</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.approvedBadge}>
                        <Ionicons name="shield-checkmark" size={16} color={colors.accent} />
                        <Text style={styles.approvedText}>NIM: {applicant.nim}</Text>
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
                        {applicants.filter((a: any) => a.status === 'Pending').length}
                    </Text>
                    <Text style={styles.summaryLabel}>Pending</Text>
                </View>
                <View style={[styles.summaryBox, { borderColor: colors.accent + '40' }]}>
                    <Text style={[styles.summaryCount, { color: colors.accent }]}>
                        {applicants.filter((a: any) => a.status === 'Verified').length}
                    </Text>
                    <Text style={styles.summaryLabel}>Verified</Text>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search applicant name..."
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
                {rawApplicants === undefined ? (
                    <ActivityIndicator size="large" color={colors.primarySoft} style={{ marginTop: 40 }} />
                ) : filteredApplicants.length > 0 ? (
                    filteredApplicants.map(app => (
                        <ApplicantCard key={app._id} applicant={app} />
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
