import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function AdminCoursesScreen() {
    const router = useRouter();

    const CourseItem = ({ code, name, sks, lecturer }: any) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: '#3B82F620' }]}>
                    <Text style={[styles.badgeText, { color: '#3B82F6' }]}>{code}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: colors.cardSoft }]}>
                    <Text style={styles.badgeText}>{sks} SKS</Text>
                </View>
            </View>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.lecturerRow}>
                <Ionicons name="person" size={14} color={colors.textSecondary} />
                <Text style={styles.lecturer}>{lecturer}</Text>
            </View>
            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.btnSecondary} onPress={() => alert('Edit Course Details')}>
                    <Ionicons name="create" size={16} color={colors.text} />
                    <Text style={styles.btnText}>Edit Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnPrimary} onPress={() => alert('Assign Lecturer Dialog')}>
                    <Ionicons name="people" size={16} color={colors.text} />
                    <Text style={styles.btnText}>Assign Lecturer</Text>
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
                <Text style={styles.headerTitle}>Course Management</Text>
                <TouchableOpacity onPress={() => alert('Add New Course')} style={styles.addButton}>
                    <Ionicons name="add" size={24} color={colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <CourseItem code="IF101" name="Pemrograman Dasar" sks="3" lecturer="Dr. Alan Turing" />
                <CourseItem code="IF202" name="Struktur Data" sks="3" lecturer="Grace Hopper, M.Kom" />
                <CourseItem code="IF303" name="Mobile App Development" sks="4" lecturer="Unassigned" />

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg, paddingTop: spacing.sm },
    backButton: { padding: spacing.xs },
    addButton: { padding: spacing.xs, backgroundColor: colors.card, borderRadius: radii.full },
    headerTitle: { fontSize: typography.subtitle, fontWeight: '700', color: colors.text },
    scrollContent: { paddingBottom: spacing.xxl },
    card: { backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
    cardHeader: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: radii.sm },
    badgeText: { fontSize: 10, fontWeight: '700', color: colors.textSecondary },
    name: { fontSize: typography.body, fontWeight: '700', color: colors.text, marginBottom: 8 },
    lecturerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.md },
    lecturer: { fontSize: typography.small, color: colors.textSecondary },
    actionRow: { flexDirection: 'row', gap: spacing.sm },
    btnPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, paddingVertical: spacing.sm, borderRadius: radii.sm, gap: 6 },
    btnSecondary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cardSoft, paddingVertical: spacing.sm, borderRadius: radii.sm, gap: 6, borderWidth: 1, borderColor: colors.border },
    btnText: { color: colors.text, fontSize: typography.small, fontWeight: '600' },
});
