import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/Card';
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
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="shield-checkmark" size={40} color={colors.primarySoft} />
                    </View>
                    <Text style={styles.title}>Admin Dashboard</Text>
                    <Text style={styles.subtitle}>Welcome, Administrator</Text>
                </View>

                {/* Management Features */}
                <Text style={styles.sectionTitle}>Management Menu</Text>

                <MenuCard
                    title="Manage PMB"
                    desc="View applicants, verify documents, generate NIM."
                    icon="people-circle"
                    color={colors.accent}
                    route="/admin/pmb"
                />

                <MenuCard
                    title="Student Management"
                    desc="View, add, update, or delete student data."
                    icon="school"
                    color="#3B82F6"
                    route="/admin/students"
                />

                <MenuCard
                    title="Course Management"
                    desc="Add courses, edit details, assign lecturers."
                    icon="book"
                    color="#10B981"
                    route="/admin/courses"
                />

                <MenuCard
                    title="Academic Schedule"
                    desc="Create schedules, assign classrooms and time."
                    icon="calendar"
                    color="#F59E0B"
                    route="/admin/schedules"
                />

                <MenuCard
                    title="Grade Management"
                    desc="Update course grades, calculate GPA."
                    icon="stats-chart"
                    color="#8B5CF6"
                    route="/admin/grades"
                />

                <MenuCard
                    title="Consultation Management"
                    desc="Assign & update student consultation requests."
                    icon="chatbubbles"
                    color="#EC4899"
                    route="/admin/consultations"
                />

                {/* Back Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => router.replace('/admin')}
                >
                    <Ionicons name="log-out-outline" size={20} color={colors.danger} />
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: spacing.xl,
        paddingTop: spacing.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.card,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
        borderWidth: 2,
        borderColor: '#10B981',
    },
    title: {
        fontSize: typography.title,
        fontWeight: '800',
        color: colors.text,
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: typography.body,
        fontWeight: '600',
        color: colors.textSecondary,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: typography.subtitle,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.md,
    },
    menuItem: {
        marginBottom: spacing.sm,
    },
    card: {
        padding: spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIconBox: {
        width: 48,
        height: 48,
        borderRadius: radii.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    cardTextContainer: {
        flex: 1,
        paddingRight: spacing.sm,
    },
    cardTitle: {
        fontSize: typography.body,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 12,
        color: colors.textSecondary,
        lineHeight: 18,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.lg,
        marginTop: spacing.xl,
        gap: spacing.sm,
        backgroundColor: colors.danger + '15',
        borderRadius: radii.lg,
    },
    logoutButtonText: {
        color: colors.danger,
        fontSize: typography.body,
        fontWeight: '700',
    },
});
