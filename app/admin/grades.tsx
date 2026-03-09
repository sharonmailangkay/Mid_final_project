import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function AdminGradesScreen() {
    const router = useRouter();

    const StudentGradeItem = ({ name, nim, course, grade }: any) => (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.nim}>{nim}</Text>
                <View style={styles.courseRow}>
                    <Text style={styles.courseName}>{course}</Text>
                    <View style={styles.gradeBadge}>
                        <Text style={styles.gradeText}>{grade}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.updateBtn} onPress={() => alert('Calculate & Update Grade')}>
                <Text style={styles.updateBtnText}>Update</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Screen>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Grade Management</Text>
                <TouchableOpacity onPress={() => alert('Calculate Semester GPA')} style={styles.addButton}>
                    <Ionicons name="calculator" size={20} color={colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <StudentGradeItem name="Jane Smith" nim="105021001" course="Pemrograman Dasar" grade="A" />
                <StudentGradeItem name="Michael Scott" nim="105021002" course="Struktur Data" grade="B+" />
                <StudentGradeItem name="Dwight Schrute" nim="105021003" course="Mobile App" grade="-" />

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg, paddingTop: spacing.sm },
    backButton: { padding: spacing.xs },
    addButton: { padding: spacing.sm, backgroundColor: colors.card, borderRadius: radii.full },
    headerTitle: { fontSize: typography.subtitle, fontWeight: '700', color: colors.text },
    scrollContent: { paddingBottom: spacing.xxl },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
    infoContainer: { flex: 1 },
    name: { fontSize: typography.body, fontWeight: '700', color: colors.text },
    nim: { fontSize: typography.small, color: colors.textSecondary, marginBottom: spacing.xs },
    courseRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 4 },
    courseName: { fontSize: 13, color: colors.primarySoft, fontWeight: '600' },
    gradeBadge: { backgroundColor: '#10B98120', paddingHorizontal: 6, paddingVertical: 2, borderRadius: radii.sm },
    gradeText: { color: '#10B981', fontSize: 12, fontWeight: '800' },
    updateBtn: { backgroundColor: colors.cardSoft, paddingHorizontal: spacing.sm, paddingVertical: spacing.sm, borderRadius: radii.sm, borderWidth: 1, borderColor: colors.border },
    updateBtnText: { color: colors.text, fontSize: typography.small, fontWeight: '600' }
});
