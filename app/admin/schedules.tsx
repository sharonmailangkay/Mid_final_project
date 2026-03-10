import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PageHeader } from '../../components/PageHeader';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function AdminSchedulesScreen() {
    const router = useRouter();

    const ScheduleItem = ({ course, day, time, room, lecturer }: any) => (
        <View style={styles.card}>
            <View style={styles.courseHeader}>
                <Text style={styles.courseName}>{course}</Text>
            </View>
            <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                    <Ionicons name="calendar-outline" size={16} color={colors.accent} />
                    <Text style={styles.detailText}>{day}, {time}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Ionicons name="location-outline" size={16} color={colors.primarySoft} />
                    <Text style={styles.detailText}>{room}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Ionicons name="person-outline" size={16} color="#10B981" />
                    <Text style={styles.detailText}>{lecturer}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={() => alert('Editing Schedule')}>
                <Text style={styles.editBtnText}>Edit Schedule</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Screen scrollable={true}>
            <PageHeader
                title="Academic Schedules"
                rightIcon="add"
                onRightPress={() => alert('Create New Schedule')}
            />

            <View style={styles.listContainer}>
                <ScheduleItem course="Pemrograman Dasar" day="Monday" time="08:00 - 10:30" room="Lab GK1-301" lecturer="Dr. Alan Turing" />
                <ScheduleItem course="Struktur Data" day="Tuesday" time="13:00 - 15:30" room="Lab GK1-302" lecturer="Grace Hopper, M.Kom" />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    listContainer: { paddingBottom: spacing.xxl },
    card: { backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
    courseHeader: { marginBottom: spacing.md },
    courseName: { fontSize: typography.body, fontWeight: '700', color: colors.text },
    detailsGrid: { gap: spacing.sm, marginBottom: spacing.md },
    detailItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    detailText: { fontSize: typography.small, color: colors.textSecondary },
    editBtn: { backgroundColor: colors.cardSoft, paddingVertical: spacing.sm, borderRadius: radii.sm, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    editBtnText: { color: colors.text, fontSize: typography.small, fontWeight: '600' },
});
