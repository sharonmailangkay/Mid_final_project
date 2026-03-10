import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PageHeader } from '../../components/PageHeader';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { api } from '../../convex/_generated/api';

export default function AdminCoursesScreen() {
    const router = useRouter();

    // --- CONVEX DATA ---
    const rawCourses = useQuery(api.admin.getCourses);
    const addCourseMutation = useMutation(api.admin.addCourse);
    const removeCourseMutation = useMutation(api.admin.removeCourse);

    const courses = rawCourses || [];

    // --- FORM STATES ---
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formCode, setFormCode] = useState('');
    const [formName, setFormName] = useState('');
    const [formSks, setFormSks] = useState('3');
    const [formLecturer, setFormLecturer] = useState('');

    const handleSaveCourse = async () => {
        if (!formCode || !formName || !formLecturer) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        try {
            await addCourseMutation({
                code: formCode,
                name: formName,
                sks: formSks,
                lecturer: formLecturer,
            });
            Alert.alert("Success", "New course added to curriculum.");
            setIsModalVisible(false);
            resetForm();
        } catch (error) {
            Alert.alert("Error", "Failed to add course.");
        }
    };

    const handleDelete = (id: any, name: string) => {
        Alert.alert(
            "Delete Course",
            `Are you sure you want to delete ${name}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await removeCourseMutation({ id });
                    }
                }
            ]
        );
    };

    const resetForm = () => {
        setFormCode('');
        setFormName('');
        setFormSks('3');
        setFormLecturer('');
    };

    const CourseItem = ({ course }: { course: any }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: '#3B82F620' }]}>
                    <Text style={[styles.badgeText, { color: '#3B82F6' }]}>{course.code}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: colors.cardSoft }]}>
                    <Text style={styles.badgeText}>{course.sks} SKS</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(course._id, course.name)}>
                    <Ionicons name="trash-outline" size={18} color={colors.danger} />
                </TouchableOpacity>
            </View>
            <Text style={styles.name}>{course.name}</Text>
            <View style={styles.lecturerRow}>
                <Ionicons name="person" size={14} color={colors.textSecondary} />
                <Text style={styles.lecturer}>{course.lecturer}</Text>
            </View>
            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.btnSecondary} onPress={() => alert('Feature coming soon...')}>
                    <Ionicons name="create" size={16} color={colors.text} />
                    <Text style={styles.btnText}>Edit Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnPrimary} onPress={() => alert('Lecturer management coming soon...')}>
                    <Ionicons name="people" size={16} color={colors.text} />
                    <Text style={styles.btnText}>Assign Lecturer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <Screen scrollable={true}>
            <PageHeader
                title="Course Management"
                subtitle="Manage campus curriculum"
                rightIcon="add-circle"
                onRightPress={() => setIsModalVisible(true)}
            />

            <View style={styles.listContainer}>
                {rawCourses === undefined ? (
                    <ActivityIndicator size="large" color={colors.primarySoft} style={{ marginTop: 40 }} />
                ) : courses.length > 0 ? (
                    courses.map(course => (
                        <CourseItem key={course._id} course={course} />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="book-outline" size={60} color={colors.cardSoft} />
                        <Text style={styles.emptyTitle}>Curriculum Empty</Text>
                        <Text style={styles.emptyDesc}>Start by adding a new course.</Text>
                    </View>
                )}
            </View>

            {/* Modal Tambah Mata Kuliah */}
            <Modal
                visible={isModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Course</Text>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.label}>Course Code</Text>
                            <TextInput
                                style={styles.input}
                                value={formCode}
                                onChangeText={setFormCode}
                                placeholder="EX: IF101"
                                placeholderTextColor={colors.textSecondary}
                            />

                            <Text style={styles.label}>Course Name</Text>
                            <TextInput
                                style={styles.input}
                                value={formName}
                                onChangeText={setFormName}
                                placeholder="EX: Programming Fundamentals"
                                placeholderTextColor={colors.textSecondary}
                            />

                            <Text style={styles.label}>SKS Units</Text>
                            <View style={styles.sksRow}>
                                {['1', '2', '3', '4'].map(val => (
                                    <TouchableOpacity
                                        key={val}
                                        style={[styles.sksBtn, formSks === val && styles.sksBtnActive]}
                                        onPress={() => setFormSks(val)}
                                    >
                                        <Text style={[styles.sksBtnText, formSks === val && styles.sksBtnTextActive]}>{val}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.label}>Lecturer Name</Text>
                            <TextInput
                                style={styles.input}
                                value={formLecturer}
                                onChangeText={setFormLecturer}
                                placeholder="EX: Dr. Turing"
                                placeholderTextColor={colors.textSecondary}
                            />

                            <View style={styles.modalActionRow}>
                                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setIsModalVisible(false)}>
                                    <Text style={styles.modalCancelText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalSaveBtn} onPress={handleSaveCourse}>
                                    <Text style={styles.modalSaveText}>Add Course</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </Screen>
    );
}

const styles = StyleSheet.create({
    listContainer: { paddingBottom: spacing.xxl },
    card: { backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
    cardHeader: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm, alignItems: 'center' },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: radii.sm },
    badgeText: { fontSize: 10, fontWeight: '700', color: colors.textSecondary },
    name: { fontSize: typography.body, fontWeight: '700', color: colors.text, marginBottom: 8 },
    lecturerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.md },
    lecturer: { fontSize: typography.small, color: colors.textSecondary },
    actionRow: { flexDirection: 'row', gap: spacing.sm },
    btnPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft, paddingVertical: spacing.sm, borderRadius: radii.sm, gap: 6 },
    btnSecondary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cardSoft, paddingVertical: spacing.sm, borderRadius: radii.sm, gap: 6, borderWidth: 1, borderColor: colors.border },
    btnText: { color: colors.text, fontSize: typography.small, fontWeight: '600' },

    emptyState: { alignItems: 'center', marginTop: 80, paddingHorizontal: 40 },
    emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: spacing.md },
    emptyDesc: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: spacing.xl },
    modalContent: { backgroundColor: colors.background, borderRadius: radii.xl, padding: spacing.xl, borderWidth: 1, borderColor: colors.border },
    modalTitle: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: spacing.xl },
    label: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, marginBottom: spacing.xs, marginTop: spacing.md, textTransform: 'uppercase' },
    input: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, padding: spacing.md, color: colors.text, fontSize: 14 },
    sksRow: { flexDirection: 'row', gap: spacing.sm },
    sksBtn: { flex: 1, height: 40, borderRadius: radii.md, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
    sksBtnActive: { backgroundColor: colors.primarySoft, borderColor: colors.primarySoft },
    sksBtnText: { color: colors.textSecondary, fontWeight: '700' },
    sksBtnTextActive: { color: '#FFFFFF' },
    modalActionRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xxl },
    modalCancelBtn: { flex: 1, paddingVertical: spacing.md, alignItems: 'center' },
    modalSaveBtn: { flex: 2, paddingVertical: spacing.md, backgroundColor: colors.primarySoft, borderRadius: radii.md, alignItems: 'center' },
    modalCancelText: { color: colors.textSecondary, fontWeight: '600' },
    modalSaveText: { color: '#FFFFFF', fontWeight: '800' }
});
