import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function AdminDashboardScreen() {
    const router = useRouter();

    const MenuCard = ({ title, desc, icon, color, route }: any) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.menuItem} onPress={() => router.push(route)}>
            <Card style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={[styles.cardIconBox, { backgroundColor: color + '20' }]}>
                        <Ionicons name={icon} size={24} color={color} />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardTitle}>{title}</Text>
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
                    desc="Academic courses & lecturer assignment"
                    icon="book"
                    color="#10B981"
                    route="/admin/courses"
                />

                <MenuCard
                    title="Schedule"
                    desc="Manage time & classroom allocation"
                    icon="calendar"
                    color="#F59E0B"
                    route="/admin/schedules"
                />

                <MenuCard
                    title="Grades"
                    desc="Transcript & GPA calculation system"
                    icon="stats-chart"
                    color="#8B5CF6"
                    route="/admin/grades"
                />

                <MenuCard
                    title="Consultations"
                    desc="Student academic request management"
                    icon="chatbubbles"
                    color="#EC4899"
                    route="/admin/consultations"
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
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: typography.subtitle,
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
        marginBottom: 2,
    },
    cardDesc: {
        fontSize: 11,
        color: colors.textSecondary,
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
