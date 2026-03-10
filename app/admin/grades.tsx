import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { PageHeader } from '../../components/PageHeader';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const COURSES = ['Pemrograman Dasar', 'Struktur Data', 'Mobile App', 'Basis Data', 'Jaringan Komputer'];
const GRADE_OPTIONS = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'E'];

export default function AdminGradesScreen() {
    const router = useRouter();
    
    // --- CONVEX DATA ---
    const rawStudents = useQuery(api.admin.getStudents);
    const rawGrades = useQuery(api.admin.getGrades);
    const upsertGrade = useMutation(api.admin.upsertGrade);

    const students = rawStudents || [];
    const grades = rawGrades || [];

    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    // Form States
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
    const [selectedGrade, setSelectedGrade] = useState('A');

    // Logic: Map students to include their grades for display
    const studentsWithGrades = students.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.nim.includes(searchQuery)
    ).map(student => {
        const studentGrades = grades.filter(g => g.nim === student.nim);
        return { ...student, studentGrades };
    });

    const openGradeModal = (student: any) => {
        setSelectedStudent(student);
        setIsModalVisible(true);
    };

    const handleSaveGrade = async () => {
        if (!selectedStudent) return;

        try {
            await upsertGrade({
                studentName: selectedStudent.name,
                nim: selectedStudent.nim,
                course: selectedCourse,
                grade: selectedGrade
            });
            Alert.alert("Success", `Grade updated for ${selectedStudent.name}`);
            setIsModalVisible(false);
        } catch (error) {
            Alert.alert("Error", "Failed to update grade.");
        }
    };

    const StudentGradeItem = ({ student }: { student: any }) => (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{student.name}</Text>
                <Text style={styles.nim}>NIM: {student.nim}</Text>
                
                <View style={styles.gradesList}>
                    {student.studentGrades.length > 0 ? (
                        student.studentGrades.map((g: any, index: number) => (
                            <View key={index} style={styles.gradeRow}>
                                <Text style={styles.courseName}>{g.course}</Text>
                                <View style={styles.gradeBadge}>
                                    <Text style={styles.gradeText}>{g.grade}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noGradeText}>No grades recorded</Text>
                    )}
                </View>
            </View>
            
            <TouchableOpacity 
                style={styles.updateBtn} 
                onPress={() => openGradeModal(student)}
            >
                <Ionicons name="add-circle-outline" size={20} color={colors.primarySoft} />
                <Text style={styles.updateBtnText}>Assign</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Screen scrollable={true}>
            <PageHeader
                title="Grade Management"
                subtitle="Assign student academic grades"
                rightIcon="calculator"
                onRightPress={() => alert('GPA Auto-Calculator Coming Soon')}
            />

            {/* Search Bar */}
            <View style={styles.searchBox}>
                <Ionicons name="search" size={20} color={colors.textSecondary} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by student name or NIM..."
                    placeholderTextColor={colors.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <View style={styles.listContainer}>
                {rawStudents === undefined ? (
                    <ActivityIndicator size="large" color={colors.primarySoft} style={{ marginTop: 40 }} />
                ) : studentsWithGrades.length > 0 ? (
                    studentsWithGrades.map(item => (
                        <StudentGradeItem key={item._id} student={item} />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text-outline" size={60} color={colors.cardSoft} />
                        <Text style={styles.emptyTitle}>No Students Found</Text>
                    </View>
                )}
            </View>

            {/* Modal Input Nilai */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <View>
                                <Text style={styles.modalTitle}>Assign Grade</Text>
                                <Text style={styles.modalSubtitle}>{selectedStudent?.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Ionicons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.inputLabel}>Select Course</Text>
                            <View style={styles.optionsGrid}>
                                {COURSES.map(course => (
                                    <TouchableOpacity
                                        key={course}
                                        style={[
                                            styles.optionBtn,
                                            selectedCourse === course && styles.optionBtnActive
                                        ]}
                                        onPress={() => setSelectedCourse(course)}
                                    >
                                        <Text style={[
                                            styles.optionText,
                                            selectedCourse === course && styles.optionTextActive
                                        ]}>{course}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={[styles.inputLabel, { marginTop: spacing.lg }]}>Selected Grade</Text>
                            <View style={styles.gradeGrid}>
                                {GRADE_OPTIONS.map(g => (
                                    <TouchableOpacity
                                        key={g}
                                        style={[
                                            styles.gradeOption,
                                            selectedGrade === g && styles.gradeOptionActive
                                        ]}
                                        onPress={() => setSelectedGrade(g)}
                                    >
                                        <Text style={[
                                            styles.gradeOptionText,
                                            selectedGrade === g && styles.gradeOptionTextActive
                                        ]}>{g}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity 
                                style={styles.saveBtn}
                                onPress={handleSaveGrade}
                            >
                                <Text style={styles.saveBtnText}>Update Database</Text>
                                <Ionicons name="cloud-upload-outline" size={20} color="#FFFFFF" />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </Screen>
    );
}

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        paddingHorizontal: spacing.md,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.lg,
    },
    searchInput: {
        flex: 1,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
        color: colors.text,
        fontSize: typography.body,
    },
    listContainer: { paddingBottom: spacing.xxl },
    card: { 
        flexDirection: 'row', 
        backgroundColor: colors.card, 
        padding: spacing.md, 
        borderRadius: radii.lg, 
        marginBottom: spacing.md, 
        borderWidth: 1, 
        borderColor: colors.border 
    },
    infoContainer: { flex: 1 },
    name: { fontSize: 16, fontWeight: '700', color: colors.text },
    nim: { fontSize: 12, color: colors.textSecondary, marginBottom: spacing.sm },
    
    gradesList: {
        marginTop: spacing.xs,
        gap: 6,
    },
    gradeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.cardSoft,
        padding: 8,
        borderRadius: radii.sm,
        marginRight: spacing.md,
    },
    courseName: { fontSize: 12, color: colors.text, fontWeight: '500' },
    gradeBadge: { 
        backgroundColor: colors.primarySoft, 
        paddingHorizontal: 8, 
        paddingVertical: 2, 
        borderRadius: radii.sm 
    },
    gradeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
    noGradeText: { fontSize: 11, fontStyle: 'italic', color: colors.textSecondary },

    updateBtn: { 
        backgroundColor: colors.cardSoft, 
        paddingHorizontal: spacing.md, 
        height: 45,
        borderRadius: radii.md, 
        borderWidth: 1, 
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    updateBtnText: { color: colors.primarySoft, fontSize: 12, fontWeight: '700' },

    emptyState: { alignItems: 'center', marginTop: 40 },
    emptyTitle: { color: colors.textSecondary, marginTop: spacing.md, fontWeight: '600' },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.background,
        borderTopLeftRadius: radii.xl,
        borderTopRightRadius: radii.xl,
        padding: spacing.xl,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.xl,
    },
    modalTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
    modalSubtitle: { fontSize: 14, color: colors.primarySoft, fontWeight: '600' },
    inputLabel: {
        fontSize: 12,
        color: colors.textSecondary,
        fontWeight: '700',
        marginBottom: spacing.md,
        textTransform: 'uppercase',
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: radii.md,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
    },
    optionBtnActive: {
        backgroundColor: colors.primaryMuted,
        borderColor: colors.primarySoft,
    },
    optionText: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
    optionTextActive: { color: colors.primarySoft },

    gradeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    gradeOption: {
        width: 45,
        height: 45,
        borderRadius: radii.pill,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradeOptionActive: {
        backgroundColor: colors.accent,
        borderColor: colors.accent,
    },
    gradeOptionText: { color: colors.text, fontWeight: '700' },
    gradeOptionTextActive: { color: '#FFFFFF' },

    saveBtn: {
        backgroundColor: colors.primarySoft,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.lg,
        borderRadius: radii.lg,
        gap: spacing.sm,
        marginTop: spacing.xxl,
        marginBottom: spacing.xl,
    },
    saveBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' }
});
