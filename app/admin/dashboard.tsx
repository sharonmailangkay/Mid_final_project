import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { api } from '../../convex/_generated/api';

export default function AdminDashboardScreen() {
    const router = useRouter();

    // --- CONVEX DATA (STATISTICS) ---
    const stats = useQuery(api.admin.getDashboardStats);

    const StatCard = ({ label, value, icon, color }: any) => (
        <View style={[styles.statBox, { borderLeftColor: color, borderLeftWidth: 4 }]}>
            <View style={styles.statContent}>
                <Text style={styles.statValue}>{value ?? '...'}</Text>
                <Text style={styles.statLabel}>{label}</Text>
            </View>
            <View style={[styles.statIconBox, { backgroundColor: color + '15' }]}>
                <Ionicons name={icon} size={20} color={color} />
            </View>
        </View>
    );

    const MenuCard = ({ title, desc, icon, color, route, count }: any) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.menuItem} onPress={() => router.push(route)}>
            <Card style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={[styles.cardIconBox, { backgroundColor: color + '20' }]}>
                        <Ionicons name={icon} size={24} color={color} />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={styles.cardTitle}>{title}</Text>
                            {count !== undefined && count > 0 && (
                                <View style={[styles.inlineBadge, { backgroundColor: color }]}>
                                    <Text style={styles.inlineBadgeText}>{count}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.cardDesc}>{desc}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={colors.icon} />
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <Screen scrollable={true}>
            <PageHeader
                title="Admin Dashboard"
                subtitle="Welcome back, Administrator"
                showBack={false}
                rightIcon="notifications-outline"
                onRightPress={() => alert('No new notifications')}
            />

            {/* QUICK STATS AT A GLANCE */}
            <View style={styles.statsContainer}>
                <StatCard
                    label="Students"
                    value={stats?.totalStudents}
                    icon="school"
                    color="#3B82F6"
                />
                <StatCard
                    label="Pending PMB"
                    value={stats?.pendingPMB}
                    icon="person-add"
                    color={colors.accent}
                />
            </View>

            {/* Management Features */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Management Menu</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>6 Modules</Text>
                </View>
            </View>

            <View style={styles.menuGrid}>
                <MenuCard
                    title="Manage PMB"
                    desc="New student registration & verification"
                    icon="people-circle"
                    color={colors.accent}
                    route="/admin/pmb"
                    count={stats?.pendingPMB}
                />

                <MenuCard
                    title="Student Data"
                    desc="Complete student records database"
                    icon="school"
                    color="#3B82F6"
                    route="/admin/students"
                />

                <MenuCard
                    title="Courses"
                    desc="Academic courses & curriculum"
                    icon="book"
                    color="#10B981"
                    route="/admin/courses"
                />

                <MenuCard
                    title="Grades"
                    desc="Transcript & academic results"
                    icon="stats-chart"
                    color="#8B5CF6"
                    route="/admin/grades"
                />

                <MenuCard
                    title="Consultations"
                    desc="Student support management"
                    icon="chatbubbles"
                    color="#EC4899"
                    route="/admin/consultations"
                    count={stats?.pendingConsultations}
                />

                <MenuCard
                    title="Settings"
                    desc="System configuration & audit logs"
                    icon="settings-outline"
                    color={colors.textSecondary}
                    route="/admin/dashboard"
                />
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => router.replace('/admin')}
            >
                <Ionicons name="log-out-outline" size={20} color={colors.danger} />
                <Text style={styles.logoutButtonText}>Secure Log Out</Text>
            </TouchableOpacity>
        </Screen>
    );
}

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginVertical: spacing.lg,
    },
    statBox: {
        flex: 1,
        backgroundColor: colors.card,
        padding: spacing.md,
        borderRadius: radii.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.border,
    },
    statContent: {
        flex: 1,
    },
    statValue: {
        fontSize: 22,
        fontWeight: '900',
        color: colors.text,
    },
    statLabel: {
        fontSize: 10,
        color: colors.textSecondary,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    statIconBox: {
        width: 36,
        height: 36,
        borderRadius: radii.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text,
    },
    badge: {
        backgroundColor: colors.primaryMuted,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: radii.pill,
        borderWidth: 1,
        borderColor: colors.primarySoft + '30',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.primarySoft,
    },
    menuGrid: {
        gap: spacing.sm,
    },
    menuItem: {
        marginBottom: spacing.xs,
    },
    card: {
        padding: spacing.md,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIconBox: {
        width: 44,
        height: 44,
        borderRadius: radii.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: typography.body,
        fontWeight: '700',
        color: colors.text,
    },
    cardDesc: {
        fontSize: 11,
        color: colors.textSecondary,
    },
    inlineBadge: {
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 4,
    },
    inlineBadgeText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '900',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.lg,
        marginTop: spacing.xxl,
        marginBottom: spacing.xl,
        gap: spacing.sm,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderRadius: radii.lg,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)',
    },
    logoutButtonText: {
        color: colors.danger,
        fontSize: typography.body,
        fontWeight: '700',
    },
});
